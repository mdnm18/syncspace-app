import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  Trash2,
  Quote,
  Newspaper,
  Heart,
  BookOpen,
} from "lucide-react";
import useLocalStorage from "../hooks/useLocalStorage";
import useHapticFeedback from "../hooks/useHapticFeedback";

// This component displays all saved favorite items with separate tabs for quotes and news.
const Favorites = ({ darkMode }) => {
  const triggerHapticFeedback = useHapticFeedback();
  const [favoriteQuotes, setFavoriteQuotes] = useLocalStorage(
    "favorite_quotes",
    []
  );
  const [favoriteNews, setFavoriteNews] = useLocalStorage("favorite_news", []);
  const [activeTab, setActiveTab] = useState("all"); // "all", "quotes", "news"
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Tab configuration
  const tabs = [
    {
      id: "all",
      label: "All Favorites",
      icon: Bookmark,
      count: favoriteQuotes.length + favoriteNews.length,
    },
    {
      id: "quotes",
      label: "Saved Quotes",
      icon: Quote,
      count: favoriteQuotes.length,
    },
    {
      id: "news",
      label: "Saved News",
      icon: Newspaper,
      count: favoriteNews.length,
    },
  ];

  // This effect combines and sorts all favorite items by the date they were saved.
  useEffect(() => {
    const combined = [...favoriteQuotes, ...favoriteNews];
    combined.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt)); // Sort newest first
    setAllItems(combined);
  }, [favoriteQuotes, favoriteNews]);

  // Filter items based on active tab
  useEffect(() => {
    switch (activeTab) {
      case "quotes":
        const sortedQuotes = [...favoriteQuotes].sort(
          (a, b) => new Date(b.savedAt) - new Date(a.savedAt)
        );
        setFilteredItems(sortedQuotes);
        break;
      case "news":
        const sortedNews = [...favoriteNews].sort(
          (a, b) => new Date(b.savedAt) - new Date(a.savedAt)
        );
        setFilteredItems(sortedNews);
        break;
      default:
        setFilteredItems(allItems);
    }
  }, [activeTab, allItems, favoriteQuotes, favoriteNews]);

  // Function to handle tab change
  const handleTabChange = (tabId) => {
    triggerHapticFeedback();
    setActiveTab(tabId);
  };

  // Function to remove an item from favorites
  const handleRemoveFavorite = (item) => {
    triggerHapticFeedback();
    if (item.type === "quote") {
      setFavoriteQuotes((prev) => prev.filter((q) => q.text !== item.text));
    } else if (item.type === "news") {
      setFavoriteNews((prev) => prev.filter((n) => n.title !== item.title));
    }
  };

  // Animation variants for tab content
  const tabContentVariants = {
    enter: {
      opacity: 0,
      y: 20,
    },
    center: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  const renderEmptyState = () => {
    const emptyMessages = {
      all: "You haven't saved any favorites yet. Click the bookmark icon on a quote or news article to save it here.",
      quotes:
        "You haven't saved any quotes yet. Click the bookmark icon on any quote to save it here.",
      news: "You haven't saved any news articles yet. Click the bookmark icon on any news article to save it here.",
    };

    const emptyIcons = {
      all: Bookmark,
      quotes: Quote,
      news: Newspaper,
    };

    const EmptyIcon = emptyIcons[activeTab];

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-3xl p-12 text-center ${
          darkMode
            ? "bg-slate-800/40 border-slate-700/50"
            : "bg-white/40 border-white/50"
        } border`}
      >
        <EmptyIcon
          size={48}
          className={`mx-auto mb-4 ${
            darkMode ? "text-slate-500" : "text-slate-400"
          }`}
        />
        <p
          className={`text-lg ${
            darkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {emptyMessages[activeTab]}
        </p>
      </motion.div>
    );
  };

  return (
    <motion.section
      id="favorites"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      className="py-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-4xl font-bold text-center mb-8 ${
            darkMode ? "text-white" : "text-slate-800"
          }`}
        >
          <Bookmark className="inline mr-3 text-purple-500" />
          Your Favorites
        </h2>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 px-4">
          <div
            className={`flex rounded-2xl p-1 w-full max-w-2xl overflow-x-auto ${
              darkMode
                ? "bg-slate-800/50 border border-slate-700/50"
                : "bg-white/50 border border-white/50"
            } backdrop-blur-xl`}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-3 rounded-xl transition-all duration-300 relative flex-1 min-w-0 ${
                    activeTab === tab.id
                      ? darkMode
                        ? "text-white shadow-lg"
                        : "text-slate-800 shadow-lg"
                      : darkMode
                      ? "text-slate-400 hover:text-slate-200"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 rounded-xl ${
                        darkMode
                          ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30"
                          : "bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                      }`}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon
                    size={16}
                    className="relative z-10 flex-shrink-0 sm:w-5 sm:h-5"
                  />
                  <span className="relative z-10 font-medium text-xs sm:text-sm truncate">
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">
                      {tab.id === "all"
                        ? "All"
                        : tab.id === "quotes"
                        ? "Quotes"
                        : "News"}
                    </span>
                  </span>
                  {tab.count > 0 && (
                    <span
                      className={`relative z-10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold flex-shrink-0 ${
                        activeTab === tab.id
                          ? darkMode
                            ? "bg-purple-500 text-white"
                            : "bg-purple-600 text-white"
                          : darkMode
                          ? "bg-slate-700 text-slate-300"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {filteredItems.length > 0
              ? filteredItems.map((item, index) => (
                  <motion.div
                    key={`${item.type}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-3xl p-6 backdrop-blur-xl relative ${
                      darkMode
                        ? "bg-slate-800/40 border-slate-700/50"
                        : "bg-white/40 border-white/50"
                    } border shadow-lg hover:shadow-xl transition-shadow duration-300`}
                  >
                    <motion.button
                      onClick={() => handleRemoveFavorite(item)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors z-10"
                      aria-label="Remove favorite"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={20} className="text-red-500" />
                    </motion.button>

                    {item.type === "quote" ? (
                      // Render Quote Card
                      <div className="pr-12">
                        <div className="flex items-center mb-4">
                          <Quote
                            size={24}
                            className={`mr-2 ${
                              darkMode ? "text-purple-400" : "text-purple-600"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              darkMode ? "text-purple-300" : "text-purple-700"
                            }`}
                          >
                            Saved Quote
                          </span>
                        </div>
                        <p
                          className={`text-xl italic mb-4 leading-relaxed ${
                            darkMode ? "text-white" : "text-slate-800"
                          }`}
                        >
                          "{item.text}"
                        </p>
                        <p
                          className={`text-md font-semibold ${
                            darkMode ? "text-purple-300" : "text-purple-700"
                          }`}
                        >
                          â€" {item.author}
                        </p>
                        <p
                          className={`text-sm mt-2 ${
                            darkMode ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          Saved on {new Date(item.savedAt).toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      // Render News Card
                      <div className="pr-12">
                        <div className="flex items-center mb-4">
                          <Newspaper
                            size={24}
                            className={`mr-2 ${
                              darkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              darkMode ? "text-blue-300" : "text-blue-700"
                            }`}
                          >
                            Saved News
                          </span>
                        </div>
                        <div className="flex items-start space-x-4">
                          {item.urlToImage && (
                            <img
                              src={item.urlToImage}
                              alt={item.title}
                              className="w-24 h-24 object-cover rounded-2xl flex-shrink-0"
                            />
                          )}
                          <div className="flex-1">
                            <span
                              className={`text-sm font-bold ${
                                darkMode ? "text-blue-400" : "text-blue-600"
                              }`}
                            >
                              {item.source?.name || "Unknown Source"}
                            </span>
                            <h3
                              className={`text-lg font-bold mt-1 mb-2 leading-tight ${
                                darkMode ? "text-white" : "text-slate-800"
                              }`}
                            >
                              {item.title}
                            </h3>
                            {item.description && (
                              <p
                                className={`text-sm line-clamp-2 mb-2 ${
                                  darkMode ? "text-slate-300" : "text-slate-600"
                                }`}
                              >
                                {item.description}
                              </p>
                            )}
                            <p
                              className={`text-sm ${
                                darkMode ? "text-slate-400" : "text-slate-500"
                              }`}
                            >
                              Saved on{" "}
                              {new Date(item.savedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              : renderEmptyState()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Favorites;
