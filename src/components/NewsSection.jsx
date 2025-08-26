import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { sampleNews } from "../constants/data"; // Import fallback news

const NewsSection = ({ darkMode, setExpandedCard }) => {
  const [techNews, setTechNews] = useState([]);
  const newsIntervalRef = useRef(null);

  // Get API key from environment variables
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const fetchNews = async () => {
    // Check if API key is available
    if (!API_KEY) {
      console.warn("News API key not found. Using sample data.");
      setTechNews(sampleNews);
      return;
    }

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      setTechNews(data.articles.filter((article) => article.urlToImage));
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setTechNews(sampleNews);
    }
  };

  useEffect(() => {
    fetchNews();
    newsIntervalRef.current = setInterval(fetchNews, 120000); // Refresh every 2 minutes
    return () => clearInterval(newsIntervalRef.current);
  }, []);

  return (
    <motion.section
      id="news"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      className="py-20"
    >
      {/* FIXED: Match QuoteSection structure exactly */}
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-4xl font-bold text-center mb-12 px-4 ${
            darkMode ? "text-white" : "text-slate-800"
          }`}
        >
          <Newspaper className="inline mr-3" />
          Tech News
        </h2>

        {/* FIXED: Use same layout structure as QuoteSection - Increased height for full image visibility */}
        <div className="relative h-[550px] flex items-center justify-center px-4">
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            // FIXED: Remove all width constraints - let it be truly full width
            className="w-full h-full"
          >
            {techNews.map((article, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() =>
                    setExpandedCard({ type: "news", data: article })
                  }
                  // FIXED: Use absolute positioning like QuoteSection
                  className={`absolute w-full h-full rounded-3xl overflow-hidden backdrop-blur-xl cursor-pointer ${
                    darkMode
                      ? "bg-slate-900/80 border-slate-700/50"
                      : "bg-white/80 border-white/50"
                  } border shadow-2xl`}
                >
                  <div
                    className="h-3/5 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${article.urlToImage})` }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-slate-800 px-3 py-1 rounded-full text-sm font-medium">
                        {article.source.name}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`p-6 h-1.5/5 ${
                      darkMode ? "bg-slate-900/80" : "bg-white"
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
            ))}
          </Swiper>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsSection;
