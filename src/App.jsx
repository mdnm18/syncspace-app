import React, { useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, Quote, X } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";

// Import Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileMenu from "./components/MobileMenu";
import Loader from "./components/Loader";
import DynamicBackground from "./components/DynamicBackground";

// Import Hooks & Data
import useDarkMode from "./hooks/useDarkMode";
import useIsMobile from "./hooks/useIsMobile";
import useScrollSpy from "./hooks/useScrollSpy";
import { navItems } from "./constants/data";

// Lazily load all main section components for better performance
const MindfulMinute = React.lazy(() => import("./components/MindfulMinute"));
const QuoteSection = React.lazy(() => import("./components/QuoteSection"));
const MoodTracker = React.lazy(() => import("./components/MoodTracker"));
const NewsSection = React.lazy(() => import("./components/NewsSection"));
const Favorites = React.lazy(() => import("./components/Favorites"));
const Journal = React.lazy(() => import("./components/Journal"));

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [expandedCard, setExpandedCard] = useState(null);
  const [activePage, setActivePage] = useState(navItems[0].name);
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  // Logic for directional mobile page animations
  const [direction, setDirection] = useState(0);
  const activePageIndex = navItems.findIndex(
    (item) => item.name === activePage
  );
  const prevPageIndex = useRef(activePageIndex);
  const scrollTimeoutRef = useRef(null);

  const pageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const sectionIds = navItems.map((item) => item.name.toLowerCase());

  // Only start scroll spy after components are loaded and not on mobile
  const activeSection = useScrollSpy(
    componentsLoaded && !isMobile ? sectionIds : [],
    {
      rootMargin: "-10% 0px -70% 0px",
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    }
  );

  // Set components as loaded after initial loading and a small delay for DOM to settle
  useEffect(() => {
    if (!isLoading && !isMobile) {
      const timer = setTimeout(() => {
        setComponentsLoaded(true);
      }, 500); // Small delay to ensure DOM elements are fully rendered
      return () => clearTimeout(timer);
    }
  }, [isLoading, isMobile]);

  // Handle scroll spy updates with reduced delay
  useEffect(() => {
    if (
      activeSection &&
      !isMobile &&
      !isProgrammaticScroll &&
      componentsLoaded
    ) {
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Small delay to prevent rapid updates, but much shorter than before
      scrollTimeoutRef.current = setTimeout(() => {
        setActivePage(activeSection);
      }, 50);
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeSection, isMobile, isProgrammaticScroll, componentsLoaded]);

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle programmatic scrolling to sections
  useEffect(() => {
    if (!isMobile && !isLoading && isProgrammaticScroll && componentsLoaded) {
      const sectionId = activePage.toLowerCase();
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth", block: "center" });

        // Reset programmatic scroll flag after animation completes
        const resetTimer = setTimeout(() => {
          setIsProgrammaticScroll(false);
        }, 800);

        return () => clearTimeout(resetTimer);
      }
    }
  }, [activePage, isMobile, isLoading, isProgrammaticScroll, componentsLoaded]);

  const handleNavClick = (pageName) => {
    const newIndex = navItems.findIndex((item) => item.name === pageName);
    setDirection(newIndex > prevPageIndex.current ? 1 : -1);
    prevPageIndex.current = newIndex;

    // Clear any pending scroll spy updates
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Immediately update active page
    setActivePage(pageName);

    if (!isMobile) {
      setIsProgrammaticScroll(true);
      // Ensure components are marked as loaded when user interacts
      if (!componentsLoaded) {
        setComponentsLoaded(true);
      }
    }
  };

  const renderExpandedContent = () => {
    if (!expandedCard) return null;

    switch (expandedCard.type) {
      case "quote": {
        const { text, author } = expandedCard.data;
        return (
          <div className="text-center">
            <Quote
              size={48}
              className={`mx-auto mb-6 ${
                darkMode ? "text-purple-400" : "text-purple-600"
              }`}
            />
            <p className="text-3xl font-light italic mb-8">"{text}"</p>
            <p
              className={`text-xl font-semibold ${
                darkMode ? "text-purple-400" : "text-purple-600"
              }`}
            >
              — {author}
            </p>
          </div>
        );
      }
      case "news": {
        const { urlToImage, title, description, source, url } =
          expandedCard.data;
        return (
          <div>
            <img
              src={urlToImage}
              alt={title}
              className="w-full h-48 object-cover rounded-2xl mb-6"
            />
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-lg mb-6">{description}</p>
            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  darkMode
                    ? "bg-slate-700 text-slate-300"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {source.name}
              </span>
              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold"
              >
                Read More
              </motion.a>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case "Mindful":
        return <MindfulMinute darkMode={darkMode} />;
      case "Quotes":
        return (
          <QuoteSection darkMode={darkMode} setExpandedCard={setExpandedCard} />
        );
      case "Mood":
        return <MoodTracker darkMode={darkMode} />;
      case "News":
        return (
          <NewsSection darkMode={darkMode} setExpandedCard={setExpandedCard} />
        );
      case "Favorites":
        return <Favorites darkMode={darkMode} />;
      case "Journal":
        return <Journal darkMode={darkMode} />;
      default:
        return <MindfulMinute darkMode={darkMode} />;
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="relative overflow-x-hidden">
        <DynamicBackground darkMode={darkMode} />
        <Analytics />
        <AnimatePresence>
          {isLoading ? (
            <Loader darkMode={darkMode} />
          ) : (
            <motion.div
              key="main-app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Header
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                activePage={activePage}
                setActivePage={handleNavClick}
              />
              {isMobile && (
                <MobileMenu
                  activePage={activePage}
                  setActivePage={handleNavClick}
                  darkMode={darkMode}
                />
              )}

              {/* FIXED: Mobile and Desktop rendering */}
              <main
                className={`pt-24 px-4 relative z-10 ${
                  isMobile ? "pb-24" : ""
                }`}
              >
                <Suspense
                  fallback={
                    <div className="h-screen flex items-center justify-center">
                      Loading...
                    </div>
                  }
                >
                  {isMobile ? (
                    // Mobile: Show only active page with animations
                    <div className="relative w-full min-h-screen overflow-hidden">
                      <AnimatePresence
                        initial={false}
                        custom={direction}
                        mode="wait"
                      >
                        <motion.div
                          key={activePage}
                          custom={direction}
                          variants={pageVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                          }}
                          className="absolute inset-0 w-full"
                        >
                          <div className="w-full">{renderPage()}</div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  ) : (
                    // Desktop: All sections stacked vertically
                    <>
                      <section id="mindful" className="min-h-screen">
                        <MindfulMinute darkMode={darkMode} />
                      </section>
                      <section id="quotes" className="min-h-screen">
                        <QuoteSection
                          darkMode={darkMode}
                          setExpandedCard={setExpandedCard}
                        />
                      </section>
                      <section id="mood" className="min-h-screen">
                        <MoodTracker darkMode={darkMode} />
                      </section>
                      <section id="news" className="min-h-screen">
                        <NewsSection
                          darkMode={darkMode}
                          setExpandedCard={setExpandedCard}
                        />
                      </section>
                      <section id="favorites" className="min-h-screen">
                        <Favorites darkMode={darkMode} />
                      </section>
                      <section id="journal" className="min-h-screen">
                        <Journal darkMode={darkMode} />
                      </section>
                    </>
                  )}
                </Suspense>
              </main>

              <Footer darkMode={darkMode} />

              {!isMobile && (
                <motion.button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className={`fixed bottom-8 right-8 p-3 rounded-full ${
                    darkMode
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  } shadow-2xl z-40`}
                  aria-label="Scroll to top"
                >
                  <ChevronUp size={24} />
                </motion.button>
              )}

              <AnimatePresence>
                {expandedCard && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setExpandedCard(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className={`max-w-2xl w-full rounded-3xl p-8 relative ${
                        darkMode
                          ? "bg-slate-800 text-white"
                          : "bg-white text-slate-800"
                      } shadow-2xl`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {renderExpandedContent()}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setExpandedCard(null)}
                        className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${
                          darkMode
                            ? "bg-slate-700 hover:bg-slate-600"
                            : "bg-slate-100 hover:bg-slate-200"
                        }`}
                        aria-label="Close expanded view"
                      >
                        <X size={16} />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
