import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Newspaper, Bookmark, Check } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { sampleNews } from "../constants/data";
import useHapticFeedback from "../hooks/useHapticFeedback";
import useCachedFetch from "../hooks/useCachedFetch";
import useLocalStorage from "../hooks/useLocalStorage"; // 1. Import the hook
import NewsSkeleton from "./NewsSkeleton";

const NewsSection = ({ darkMode, setExpandedCard }) => {
  const triggerHapticFeedback = useHapticFeedback();
  const [techNews, setTechNews] = useState([]);

  // 2. Initialize useLocalStorage for favorite news articles
  const [favoriteNews, setFavoriteNews] = useLocalStorage("favorite_news", []);

  const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
  const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=us&max=10&apikey=${API_KEY}`;

  const {
    data: newsData,
    error,
    loading,
  } = useCachedFetch(url, "cached_news", 30);

  useEffect(() => {
    if (newsData && newsData.articles) {
      const formattedArticles = newsData.articles.map((article) => ({
        ...article,
        urlToImage: article.image,
        type: "news", // Add a type for easier identification
      }));
      setTechNews(formattedArticles.filter((article) => article.urlToImage));
    } else if (error) {
      console.error("Failed to fetch news:", error);
      setTechNews(sampleNews);
    }
  }, [newsData, error]);

  const handleCardClick = (article) => {
    triggerHapticFeedback();
    setExpandedCard({ type: "news", data: article });
  };

  // 3. Update the handler to save the news article
  const handleSaveFavorite = (e, articleToSave) => {
    e.stopPropagation();
    triggerHapticFeedback();

    if (!articleToSave) return;

    const isAlreadyFavorited = favoriteNews.some(
      (n) => n.title === articleToSave.title
    );

    if (isAlreadyFavorited) {
      // Optional: Implement logic to un-favorite an item
      setFavoriteNews((prevFavorites) =>
        prevFavorites.filter((n) => n.title !== articleToSave.title)
      );
    } else {
      const newFavorite = {
        ...articleToSave,
        savedAt: new Date().toISOString(),
      };
      setFavoriteNews((prevFavorites) => [...prevFavorites, newFavorite]);
    }
  };

  return (
    <motion.section
      id="news"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      className="py-20"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className={`text-4xl font-bold text-center mb-12 ${
            darkMode ? "text-white" : "text-slate-800"
          }`}
        >
          <Newspaper className="inline mr-2 text-purple-500" />
          Tech News
        </h2>

        <div className="relative h-96 flex justify-center">
          {loading && <NewsSkeleton darkMode={darkMode} />}

          {error && (
            <div className="text-center text-red-500">
              Could not load live data. Showing sample news.
            </div>
          )}

          {!loading && techNews.length > 0 && (
            <Swiper
              effect="cards"
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="w-full sm:max-w-sm"
            >
              {techNews.map((article, index) => {
                // 4. Check if the current article is in the favorites list
                const isFavorited = favoriteNews.some(
                  (n) => n.title === article.title
                );
                return (
                  <SwiperSlide key={index}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleCardClick(article)}
                      className={`rounded-3xl overflow-hidden backdrop-blur-xl cursor-pointer ${
                        darkMode
                          ? "bg-slate-800/90 border-slate-700/50"
                          : "bg-white/90 border-white/50"
                      } border shadow-2xl h-full`}
                    >
                      <motion.button
                        onClick={(e) => handleSaveFavorite(e, article)}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${
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

                      <div
                        className="h-1/2 bg-cover bg-center relative"
                        style={{
                          backgroundImage: `url(${article.urlToImage})`,
                        }}
                      >
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 text-slate-800 px-3 py-1 rounded-full text-sm font-medium">
                            {article.source.name}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`p-6 h-1/2 ${
                          darkMode ? "bg-slate-800" : "bg-white"
                        }`}
                      >
                        <h3
                          className={`font-bold text-lg mb-3 line-clamp-2 ${
                            darkMode ? "text-white" : "text-slate-800"
                          }`}
                        >
                          {article.title}
                        </h3>
                        <p
                          className={`text-sm line-clamp-3 ${
                            darkMode ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {article.description}
                        </p>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default NewsSection;
