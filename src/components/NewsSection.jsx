import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { sampleNews } from "../constants/data"; // Import fallback news
import useHapticFeedback from "../hooks/useHapticFeedback"; // 1. Import the hook

const NewsSection = ({ darkMode, setExpandedCard }) => {
  const triggerHapticFeedback = useHapticFeedback(); // 2. Initialize the hook
  const [techNews, setTechNews] = useState([]);
  const newsIntervalRef = useRef(null);

  // Securely access the GNews API key from the .env file
  const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

  const handleCardClick = (article) => {
    triggerHapticFeedback(); // 3. Trigger feedback on click
    setExpandedCard({ type: "news", data: article });
  };

  const fetchNews = async () => {
    if (!API_KEY) {
      console.error("GNews API key not found. Using sample data.");
      setTechNews(sampleNews);
      return;
    }

    const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=us&max=10&apikey=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch news from GNews");
      const data = await response.json();

      const formattedArticles = data.articles.map((article) => ({
        ...article,
        urlToImage: article.image,
      }));

      setTechNews(formattedArticles.filter((article) => article.urlToImage));
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setTechNews(sampleNews);
    }
  };

  useEffect(() => {
    fetchNews();
    newsIntervalRef.current = setInterval(fetchNews, 1800000); // Refresh every 30 minutes
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
      <div className="max-w-4xl mx-auto h-full">
        <h2
          className={`text-4xl font-bold text-center mb-12 ${
            darkMode ? "text-white" : "text-slate-800"
          }`}
        >
          <Newspaper className="inline mr-3" />
          Tech News
        </h2>

        <div className="flex justify-center">
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="w-full h-full"
          >
            {techNews.map((article, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleCardClick(article)} // 4. Use the new handler
                  className={`rounded-3xl overflow-hidden backdrop-blur-2xl cursor-pointer ${
                    darkMode
                      ? "bg-slate-800/90 border-slate-700/50"
                      : "bg-white/90 border-white/50"
                  } border shadow-xl h-96 rounded-3xl`}
                >
                  <div
                    className="h-2/3 bg-cover bg-center relative"
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
                    className={`p-6 h-2/3 ${
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
            ))}
          </Swiper>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsSection;
