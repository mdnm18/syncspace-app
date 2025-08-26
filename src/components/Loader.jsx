import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import logo from "../assets/logo.png";

const Loader = ({ darkMode }) => {
  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-50 flex items-center justify-center"
      // *** UPDATED DISSOLVE EXIT ANIMATION ***
      exit={{
        opacity: 0,
        filter: "blur(20px)", // Adds a blur effect as it fades
        scale: 0.9, // Shrinks slightly
        transition: { duration: 1, ease: "easeOut" },
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <img
          src={logo}
          alt="SyncSpace Logo"
          className="h-24 w-24 mx-auto mb-6"
        />
        <h1
          className={`text-5xl md:text-6xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-slate-800"
          }`}
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <TypeAnimation
              sequence={["SyncSpace", 1000]}
              wrapper="span"
              speed={50}
              cursor={true}
              repeat={0}
            />
          </span>
        </h1>
        <p
          className={`text-lg md:text-xl ${
            darkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Where mindfulness meets technology. Find your balance in the digital
          world.
        </p>
      </motion.section>
    </motion.div>
  );
};

export default Loader;
