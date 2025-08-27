import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Trash2 } from "lucide-react";
import useLocalStorage from "../hooks/useLocalStorage";
import useHapticFeedback from "../hooks/useHapticFeedback";

// This component displays all saved journal entries.
const Journal = ({ darkMode }) => {
  const triggerHapticFeedback = useHapticFeedback();
  const [journalEntries, setJournalEntries] = useLocalStorage(
    "journal_entries",
    []
  );

  // Function to remove a journal entry
  const handleRemoveEntry = (timestamp) => {
    triggerHapticFeedback();
    setJournalEntries((prev) =>
      prev.filter((entry) => entry.timestamp !== timestamp)
    );
  };

  // Helper function to format the date
  const formatDate = (isoString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(isoString).toLocaleDateString("en-US", options);
  };

  // Sort entries so the newest appear first
  const sortedEntries = [...journalEntries].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <motion.section
      id="journal"
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
          <BookOpen className="inline mr-3 text-yellow-500" />
          Your Journal
        </h2>

        <div className="space-y-6">
          {sortedEntries.length > 0 ? (
            sortedEntries.map((entry, index) => (
              <motion.div
                key={entry.timestamp}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-3xl p-6 backdrop-blur-xl relative ${
                  darkMode
                    ? "bg-slate-800/40 border-slate-700/50"
                    : "bg-white/40 border-white/50"
                } border shadow-lg`}
              >
                <motion.button
                  onClick={() => handleRemoveEntry(entry.timestamp)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors"
                  aria-label="Remove entry"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 size={20} className="text-red-500" />
                </motion.button>

                <div className="flex items-start space-x-4 pr-12">
                  <div className="text-4xl">{entry.emoji}</div>
                  <div>
                    <p className="text-sm text-gray-400">
                      {formatDate(entry.timestamp)}
                    </p>
                    <p
                      className={`mt-2 text-lg ${
                        darkMode ? "text-slate-200" : "text-slate-700"
                      }`}
                    >
                      {entry.journal || "No journal entry written."}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Message to show if no journal entries are saved
            <div
              className={`rounded-3xl p-8 text-center ${
                darkMode
                  ? "bg-slate-800/40 border-slate-700/50"
                  : "bg-white/40 border-white/50"
              } border`}
            >
              <p
                className={`${darkMode ? "text-slate-300" : "text-slate-600"}`}
              >
                You haven't saved any journal entries yet. Go to the Mood
                Tracker to add your first entry.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default Journal;
