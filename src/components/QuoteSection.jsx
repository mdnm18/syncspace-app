import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Bookmark, Check } from "lucide-react";
import { sampleQuotes } from "../constants/data";
import useHapticFeedback from "../hooks/useHapticFeedback";
import useCachedFetch from "../hooks/useCachedFetch";
import useLocalStorage from "../hooks/useLocalStorage"; // 1. Import the new hook
import QuoteSkeleton from "./QuoteSkeleton";

const QuoteSection = ({ darkMode, setExpandedCard }) => {
  const triggerHapticFeedback = useHapticFeedback();
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  // 2. Initialize useLocalStorage to manage an array of favorite quotes
  const [favoriteQuotes, setFavoriteQuotes] = useLocalStorage(
    "favorite_quotes",
    []
  );

  const {
    data: quoteData,
    error,
    loading,
    refetch,
  } = useCachedFetch("https://dummyjson.com/quotes/random", "cached_quote", 2);

  useEffect(() => {
    if (quoteData) {
      const newQuote = {
        text: quoteData.quote,
        author: quoteData.author,
        type: "quote",
      };
      setCurrentQuote(newQuote);
      // Check if the newly fetched quote is already in favorites
      setIsFavorited(favoriteQuotes.some((q) => q.text === newQuote.text));
    } else if (error) {
      const randomQuote =
        sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
      setCurrentQuote({ ...randomQuote, type: "quote" });
    }
  }, [quoteData, error, favoriteQuotes]);

  useEffect(() => {
    const intervalId = setInterval(() => refetch(), 120000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  const handleCardClick = () => {
    triggerHapticFeedback();
    setExpandedCard({ type: "quote", data: currentQuote });
  };

  // 3. Update the handler to save the quote
  const handleSaveFavorite = (e) => {
    e.stopPropagation();
    triggerHapticFeedback();

    if (!currentQuote) return;

    // Check if the quote is already favorited to prevent duplicates
    const isAlreadyFavorited = favoriteQuotes.some(
      (q) => q.text === currentQuote.text
    );

    if (!isAlreadyFavorited) {
      const newFavorite = {
        ...currentQuote,
        savedAt: new Date().toISOString(),
      };
      setFavoriteQuotes((prevFavorites) => [...prevFavorites, newFavorite]);
      setIsFavorited(true);
    }
  };

  return (
    <motion.section
      id="quotes"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      className="py-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-4xl font-bold text-center mb-12 ${
            darkMode ? "text-white" : "text-slate-800"
          }`}
        >
          <Quote className="inline mr-2 text-green-500" />
          Quote of the Minute
        </h2>
        <div className="relative h-80 flex items-center justify-center">
          {loading && <QuoteSkeleton darkMode={darkMode} />}

          {error && (
            <div className="text-center text-red-500">
              Could not load live data. Showing a sample quote.
            </div>
          )}

          {!loading && currentQuote && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote.text}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={handleCardClick}
                className={`absolute w-full h-full rounded-3xl p-8 backdrop-blur-xl cursor-pointer ${
                  darkMode
                    ? "bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-700/50"
                    : "bg-gradient-to-br from-purple-100/60 to-blue-100/60 border-purple-200/50"
                } border shadow-2xl`}
              >
                {/* 4. Update the favorite button with visual feedback */}
                <motion.button
                  onClick={handleSaveFavorite}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                    isFavorited
                      ? "bg-green-500"
                      : "bg-black/20 hover:bg-black/40"
                  }`}
                  aria-label="Save favorite"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isFavorited ? (
                    <Check size={20} className="text-white" />
                  ) : (
                    <Bookmark size={20} className="text-white" />
                  )}
                </motion.button>

                <div className="h-full flex flex-col justify-center text-center">
                  <p
                    className={`text-2xl font-light italic mb-6 ${
                      darkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    "{currentQuote.text}"
                  </p>
                  <p
                    className={`text-lg font-semibold ${
                      darkMode ? "text-purple-400" : "text-purple-600"
                    }`}
                  >
                    — {currentQuote.author}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default QuoteSection;
