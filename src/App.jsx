import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, Quote, X } from "lucide-react";

// Import Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import MindfulMinute from "./components/MindfulMinute";
import QuoteSection from "./components/QuoteSection";
import MoodTracker from "./components/MoodTracker";
import NewsSection from "./components/NewsSection";
import MobileMenu from "./components/MobileMenu";
import Loader from "./components/Loader";
import DynamicBackground from "./components/DynamicBackground";

// Import Hooks & Data
import useDarkMode from "./hooks/useDarkMode";
import useIsMobile from "./hooks/useIsMobile"; // Import the new hook
import useScrollSpy from "./hooks/useScrollSpy"; // Import the new hook
import { navItems } from "./constants/data";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [expandedCard, setExpandedCard] = useState(null);
  const [activePage, setActivePage] = useState(navItems[0].name);
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const sectionIds = navItems.map((item) => item.name.toLowerCase());
  const activeSection = useScrollSpy(sectionIds, {
    rootMargin: "-50% 0px -50% 0px",
  });

  useEffect(() => {
    if (activeSection && !isMobile && !isScrolling) {
      setActivePage(activeSection);
    }
  }, [activeSection, isMobile, isScrolling]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMobile && !isLoading && isScrolling) {
      const sectionId = activePage.toLowerCase();
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth", block: "center" });
        const scrollEndTimer = setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
        return () => clearTimeout(scrollEndTimer);
      }
    }
  }, [activePage, isMobile, isLoading, isScrolling]);

  const handleNavClick = (pageName) => {
    if (!isMobile) {
      setIsScrolling(true);
    }
    setActivePage(pageName);
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
      <div className="relative">
        <DynamicBackground darkMode={darkMode} />

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

              <main className="pt-24 px-4 relative z-10">
                {isMobile ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePage}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderPage()}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <>
                    <MindfulMinute darkMode={darkMode} />
                    <QuoteSection
                      darkMode={darkMode}
                      setExpandedCard={setExpandedCard}
                    />
                    <MoodTracker darkMode={darkMode} />
                    <NewsSection
                      darkMode={darkMode}
                      setExpandedCard={setExpandedCard}
                    />
                  </>
                )}
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
