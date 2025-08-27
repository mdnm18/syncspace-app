import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Brain, Play, Pause } from "lucide-react";
import useHapticFeedback from "../hooks/useHapticFeedback"; // 1. Import the hook

// The MindfulMinute component receives the darkMode state as a prop
const MindfulMinute = ({ darkMode }) => {
  const triggerHapticFeedback = useHapticFeedback(); // 2. Initialize the hook
  // State to manage the breathing exercise
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathTimer, setBreathTimer] = useState(60);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Refs to hold the interval and audio element
  const breathIntervalRef = useRef(null);
  const audioRef = useRef(null);

  // Function to start the 60-second breathing exercise
  const startBreathingExercise = () => {
    triggerHapticFeedback(); // Haptic feedback on starting the exercise
    setIsBreathing(true);
    setBreathTimer(60);

    // Set up an interval to count down every second
    breathIntervalRef.current = setInterval(() => {
      triggerHapticFeedback(); // *** NEW: Haptic feedback for every second of the countdown ***
      setBreathTimer((prev) => {
        if (prev <= 1) {
          // When the timer reaches 1, stop the exercise
          clearInterval(breathIntervalRef.current);
          setIsBreathing(false);
          return 60; // Reset for next time
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Function to toggle the ambient audio on and off
  const toggleAudio = () => {
    triggerHapticFeedback(); // Haptic feedback on toggling audio
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((e) => console.error("Audio play failed:", e));
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  // Cleanup effect to clear the interval if the component unmounts
  useEffect(() => {
    return () => {
      if (breathIntervalRef.current) {
        clearInterval(breathIntervalRef.current);
      }
    };
  }, []);

  return (
    <motion.section
      id="mindful"
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
          <Brain className="inline mr-2 text-pink-500" />
          Mindful Minute
        </h2>

        <div
          className={`rounded-3xl p-8 backdrop-blur-xl ${
            darkMode
              ? "bg-slate-800/40 border-slate-700/50"
              : "bg-white/40 border-white/50"
          } border shadow-2xl`}
        >
          <div className="text-center">
            {/* The animated breathing circle */}
            <motion.div
              className="mx-auto mb-8 w-48 h-48 rounded-full border-4 flex items-center justify-center relative"
              animate={
                isBreathing
                  ? {
                      scale: [1, 1.2, 1],
                      borderColor: ["#3b82f6", "#8b5cf6", "#3b82f6"],
                    }
                  : { scale: 1, borderColor: "#3b82f6" }
              }
              transition={
                isBreathing
                  ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  : {}
              }
            >
              <div
                className={`text-6xl font-mono ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {isBreathing ? breathTimer : "🧘‍♀️"}
              </div>
              {isBreathing && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-500/20"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>

            {/* Control Buttons */}
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startBreathingExercise}
                disabled={isBreathing}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  isBreathing
                    ? "bg-gray-400 cursor-not-allowed text-gray-800"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
                }`}
              >
                {isBreathing
                  ? `${breathTimer}s remaining`
                  : "Start 1-Minute Breathing"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleAudio}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  darkMode
                    ? "bg-slate-700 text-white hover:bg-slate-600"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                {isAudioPlaying ? (
                  <Pause size={16} className="inline mr-2" />
                ) : (
                  <Play size={16} className="inline mr-2" />
                )}
                Ambient Sound
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden audio element pointing to the local file */}
      <audio
        ref={audioRef}
        loop
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
        onEnded={() => setIsAudioPlaying(false)}
        src="/stream-1(chosic.com).mp3"
      />
    </motion.section>
  );
};

export default MindfulMinute;
