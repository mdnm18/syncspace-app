import React from "react";
import { motion } from "framer-motion";
import { navItems } from "../constants/data"; // Import navItems with icons
import useHapticFeedback from "../hooks/useHapticFeedback"; // 1. Import the hook

// The MobileMenu is only visible on small screens.
// It receives the active page and a function to set the active page as props.
const MobileMenu = ({ activePage, setActivePage, darkMode }) => {
  const triggerHapticFeedback = useHapticFeedback(); // 2. Initialize the hook

  // 3. Create a handler function for the click event
  const handleNavClick = (pageName) => {
    triggerHapticFeedback();
    setActivePage(pageName);
  };

  return (
    <motion.div
      // This menu is hidden on medium screens and larger (sm:)
      className="sm:hidden fixed bottom-0 left-12 right-12 p-4 z-50 pointer-events-none"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div
        className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-full backdrop-blur-2xl border w-auto mx-auto pointer-events-auto ${
          darkMode
            ? "bg-slate-800/40 border-slate-700/50"
            : "bg-white/50 border-black/50"
        } shadow-2xl`}
      >
        {navItems.map((item) => (
          <div key={item.name} className="relative">
            <motion.button
              onClick={() => handleNavClick(item.name)} // 4. Use the new handler
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-full transition-colors ${
                activePage === item.name
                  ? "" // Active state is handled by the animated div below
                  : "text-slate-500 hover:text-blue-500"
              }`}
              aria-label={item.name}
            >
              <item.icon
                size={28}
                className={`transition-colors ${
                  activePage === item.name
                    ? "text-white"
                    : darkMode
                    ? "text-slate-400"
                    : "text-slate-600"
                }`}
              />
            </motion.button>
            {/* This div is the animated background for the active icon */}
            {activePage === item.name && (
              <motion.div
                layoutId="active-pill" // This ID links the animation across different buttons
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileMenu;
