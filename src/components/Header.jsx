import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import logo from "../assets/logo.png";
import Clock from "./Clock";
import { navItems } from "../constants/data";
import useHapticFeedback from "../hooks/useHapticFeedback"; // 1. Import the hook

const Header = ({ darkMode, setDarkMode, activePage, setActivePage }) => {
  const triggerHapticFeedback = useHapticFeedback(); // 2. Initialize the hook

  const handleThemeClick = () => {
    triggerHapticFeedback();
    setDarkMode(!darkMode);
  };

  const handleNavClick = (pageName) => {
    triggerHapticFeedback();
    setActivePage(pageName);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <div
        className={`px-4 sm:px-6 py-3 rounded-full backdrop-blur-2xl border ${
          darkMode
            ? "bg-slate-800/40 border-slate-700/50"
            : "bg-white/50 border-black/50"
        } shadow-2xl`}
      >
        {/* Mobile View */}
        <div className="sm:hidden flex items-center justify-between">
          <Clock darkMode={darkMode} />
          <motion.div
            className="cursor-pointer"
            onClick={() => {
              triggerHapticFeedback();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src={logo} alt="SyncSpace Logo" className="h-12 w-12" />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1 }}
            onClick={handleThemeClick} // 3. Use the handler
            className={`p-2 rounded-full ${
              darkMode ? "bg-slate-700/50" : "bg-white/50"
            } transition-all`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </motion.button>
        </div>

        {/* Desktop/Tablet View */}
        <div className="hidden sm:flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick(navItems[0].name)} // 3. Use the handler
          >
            <img src={logo} alt="SyncSpace Logo" className="h-12 w-12" />
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <TypeAnimation
                sequence={["SyncSpace", 2000]}
                wrapper="span"
                speed={50}
                cursor={true}
                repeat={0}
              />
            </span>
          </motion.div>

          <div
            className={`flex items-center space-x-2 p-1 rounded-full ${
              darkMode ? "bg-slate-900/50" : "bg-slate-200/50"
            }`}
          >
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <motion.button
                  onClick={() => handleNavClick(item.name)} // 3. Use the handler
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-lg font-bold transition-colors relative z-10 ${
                    activePage === item.name ? "" : "hover:text-blue-500"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={`${
                      activePage === item.name ? "text-white" : ""
                    }`}
                  />
                  <span
                    className={`${
                      activePage === item.name ? "text-white" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </motion.button>
                {activePage === item.name && (
                  <motion.div
                    layoutId="desktop-active-pill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1 }}
            onClick={handleThemeClick} // 3. Use the handler
            className={`p-2 rounded-full ${
              darkMode ? "bg-slate-700/50" : "bg-white/50"
            } transition-all`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={30} /> : <Moon size={30} />}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;
