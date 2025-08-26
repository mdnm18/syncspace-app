import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import logo from "../assets/logo.png"; // Importing the logo
import useHapticFeedback from "../hooks/useHapticFeedback"; // 1. Import the hook

// The Footer component receives the darkMode state as a prop
const Footer = ({ darkMode }) => {
  const triggerHapticFeedback = useHapticFeedback(); // 2. Initialize the hook
  // Array of social media links for easy mapping
  const socialLinks = [
    {
      icon: Mail,
      href: "mailto:md.n.m.pius18@gmail.com", // Your personal email
      label: "Email",
    },
    {
      icon: Github,
      href: "https://github.com/mdnm18", // Your personalized GitHub link
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/md-nayaj-mondal", // Your personalized LinkedIn link
      label: "LinkedIn",
    },
  ];

  return (
    <footer
      className={`py-12 mt-20 relative z-10 ${
        darkMode ? "bg-slate-900/80" : "bg-white/80"
      } backdrop-blur-xl`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <img src={logo} alt="SyncSpace Logo" className="h-12 w-12" />
            <h3
              className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
            >
              SyncSpace
            </h3>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.5, y: -4 }}
                aria-label={`Visit my ${link.label}`}
                onClick={triggerHapticFeedback} // 3. Add the onClick handler
                className={`p-3 rounded-full ${
                  darkMode
                    ? "bg-slate-800 hover:bg-purple-700"
                    : "bg-white hover:bg-green-100"
                } shadow-lg transition-all`}
              >
                <link.icon
                  size={24}
                  className={darkMode ? "text-blue-400" : "text-blue-600"}
                />
              </motion.a>
            ))}
          </div>

          {/* Copyright and Credit Text */}
          <div
            className={`text-sm ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            <p className="mb-2">
              © 2025 SyncSpace. Made with ❤️ for mindful technology.
            </p>
            <p>Find balance between your inner peace and the digital world.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
