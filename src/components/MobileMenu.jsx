import React from "react";
import { motion } from "framer-motion";
import { navItems } from "../constants/data";
import useHapticFeedback from "../hooks/useHapticFeedback";

const MobileMenu = ({ activePage, setActivePage, darkMode }) => {
  const triggerHapticFeedback = useHapticFeedback();

  const handleNavClick = (pageName) => {
    triggerHapticFeedback();
    setActivePage(pageName);
  };

  return (
    <motion.div
      className="sm:hidden fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* *** FIX: Adjusted padding and spacing for 6 icons *** */}
      <div
        className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-full backdrop-blur-2xl border w-auto mx-auto pointer-events-auto ${
          darkMode
            ? "bg-slate-800/40 border-slate-700/50"
            : "bg-white/50 border-black/50"
        } shadow-2xl`}
      >
        {navItems.map((item) => (
          <div key={item.name} className="relative">
            <motion.button
              onClick={() => handleNavClick(item.name)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-full transition-colors ${
                activePage === item.name
                  ? ""
                  : "text-slate-500 hover:text-blue-500"
              }`}
              aria-label={item.name}
            >
              <item.icon
                size={24} // Slightly smaller icon size
                className={`transition-colors text-yellow-500 ${
                  activePage === item.name
                    ? "text-white"
                    : darkMode
                    ? "text-slate-400"
                    : "text-slate-600"
                }`}
              />
            </motion.button>
            {activePage === item.name && (
              <motion.div
                layoutId="active-pill"
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
