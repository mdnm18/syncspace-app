import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { sampleQuotes } from "../constants/data";
import useHapticFeedback from "../hooks/useHapticFeedback"; // 1. Import the hook

const QuoteSection = ({ darkMode, setExpandedCard }) => {
  const triggerHapticFeedback = useHapticFeedback(); // 2. Initialize the hook
  const [currentQuote, setCurrentQuote] = useState(null);
  const quoteIntervalRef = useRef(null);

  // Function to fetch a new quote from the new API
  const fetchQuote = async () => {
    try {
      // *** NEW, MORE RELIABLE API ENDPOINT ***
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      // *** ADJUSTED TO MATCH NEW API's data structure (data.quote) ***
      setCurrentQuote({ text: data.quote, author: data.author });
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      // Fallback to sample data remains the same
      const randomQuote =
        sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
      setCurrentQuote(randomQuote);
    }
  };

  useEffect(() => {
    fetchQuote();
    quoteIntervalRef.current = setInterval(fetchQuote, 120000); // Refresh every 2 minutes
    return () => clearInterval(quoteIntervalRef.current);
  }, []);

  // 3. Create a handler function for the click event
  const handleCardClick = () => {
    triggerHapticFeedback();
    setExpandedCard({ type: "quote", data: currentQuote });
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
          <Quote className="inline mr-3" />
          Quote of the Minute
        </h2>
        <div className="relative h-80 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentQuote && (
              <motion.div
                key={currentQuote.text}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={handleCardClick} // 4. Use the new handler
                className={`absolute w-full h-full rounded-3xl p-8 backdrop-blur-xl cursor-pointer ${
                  darkMode
                    ? "bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-700/50"
                    : "bg-gradient-to-br from-purple-100/60 to-blue-100/60 border-purple-200/50"
                } border shadow-2xl`}
              >
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
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default QuoteSection;
