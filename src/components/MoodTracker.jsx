import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { moods } from "../constants/data";
import useHapticFeedback from "../hooks/useHapticFeedback";
import useLocalStorage from "../hooks/useLocalStorage";

const MoodTracker = ({ darkMode }) => {
  const triggerHapticFeedback = useHapticFeedback();
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodStats, setMoodStats] = useState({});
  const [journalText, setJournalText] = useState("");
  const [showJournal, setShowJournal] = useState(false);

  const [journalEntries, setJournalEntries] = useLocalStorage(
    "journal_entries",
    []
  );

  const loadMoodStats = () => {
    try {
      const storedMoods = JSON.parse(
        localStorage.getItem("syncspace_moods") || "{}"
      );
      const stats = {};
      moods.forEach((mood) => {
        stats[mood.label] = 0;
      });
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toDateString();
      });
      last7Days.forEach((day) => {
        if (storedMoods[day]) {
          storedMoods[day].forEach((moodEntry) => {
            if (stats[moodEntry.label] !== undefined) {
              stats[moodEntry.label]++;
            }
          });
        }
      });
      setMoodStats(stats);
    } catch (error) {
      console.error("Failed to parse moods from localStorage", error);
      setMoodStats({});
    }
  };

  useEffect(() => {
    loadMoodStats();
  }, []);

  const handleMoodSelect = (mood) => {
    triggerHapticFeedback();
    setSelectedMood(mood);
    setShowJournal(true);
  };

  const handleSaveEntry = () => {
    triggerHapticFeedback();
    if (!selectedMood) return;

    const today = new Date().toDateString();
    const newEntry = {
      ...selectedMood,
      journal: journalText,
      timestamp: new Date().toISOString(),
    };

    try {
      const allMoods = JSON.parse(
        localStorage.getItem("syncspace_moods") || "{}"
      );
      if (!allMoods[today]) {
        allMoods[today] = [];
      }
      allMoods[today].push(selectedMood);
      localStorage.setItem("syncspace_moods", JSON.stringify(allMoods));
    } catch (error) {
      console.error("Failed to save mood", error);
    }

    setJournalEntries((prevEntries) => [...prevEntries, newEntry]);

    loadMoodStats();
    setJournalText("");
    setShowJournal(false);
    setSelectedMood(null);
  };

  const maxCount = Math.max(...Object.values(moodStats), 1);

  return (
    <motion.section
      id="mood"
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
          <Heart className="inline mr-2 text-red-500" />
          Mood Tracker
        </h2>
        <div
          className={`rounded-3xl p-8 backdrop-blur-xl ${
            darkMode
              ? "bg-slate-800/40 border-slate-700/50"
              : "bg-white/40 border-white/50"
          } border shadow-2xl`}
        >
          <div className="text-center mb-8">
            <p
              className={`text-lg mb-6 ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              How are you feeling right now?
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              {moods.map((mood) => (
                <motion.button
                  key={mood.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodSelect(mood)}
                  className={`p-4 rounded-2xl backdrop-blur-sm transition-all relative w-24 h-24 flex flex-col items-center justify-center ${
                    selectedMood?.label === mood.label
                      ? `bg-gradient-to-r ${mood.color} text-white shadow-lg`
                      : darkMode
                      ? "bg-slate-700/50 hover:bg-slate-600/60"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {showJournal && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-8">
                  <label
                    htmlFor="journal"
                    className={`block text-lg font-semibold mb-2 text-center ${
                      darkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Add a journal entry (optional)
                  </label>
                  <textarea
                    id="journal"
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value)}
                    placeholder={`A few words about feeling ${selectedMood?.label.toLowerCase()}...`}
                    className={`w-full p-4 rounded-2xl border transition-colors ${
                      darkMode
                        ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        : "bg-white/50 border-slate-300 text-slate-800"
                    }`}
                    rows="3"
                  ></textarea>
                  <motion.button
                    onClick={handleSaveEntry}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-full shadow-lg"
                  >
                    Save Entry
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8">
            <h3
              className={`text-xl font-semibold mb-4 text-center ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              This Week's Mood Summary
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {moods.map((mood, index) => {
                const count = moodStats[mood.label] || 0;
                const percentage = (count / maxCount) * 100;
                return (
                  <div key={mood.label} className="text-center">
                    <div className="text-2xl mb-2">{mood.emoji}</div>
                    <div
                      className={`h-20 rounded-lg relative overflow-hidden ${
                        darkMode ? "bg-slate-700/50" : "bg-slate-200/50"
                      }`}
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${percentage}%` }}
                        transition={{
                          duration: 1,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                        className={`absolute bottom-0 w-full bg-gradient-to-t ${mood.color} rounded-lg`}
                      />
                    </div>
                    <div
                      className={`text-sm mt-2 ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {count} {count === 1 ? "time" : "times"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MoodTracker;
