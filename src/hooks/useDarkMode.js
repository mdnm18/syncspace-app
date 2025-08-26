import { useState, useEffect } from "react";

// This custom hook manages the dark mode state and persists it to localStorage.
const useDarkMode = () => {
  // Initialize state by checking localStorage, or falling back to system preference.
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("syncspace_theme");
    if (storedTheme !== null) {
      return JSON.parse(storedTheme);
    }
    // If no theme is stored, check the user's OS preference
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  // useEffect runs whenever the `darkMode` state changes.
  useEffect(() => {
    const body = window.document.body;

    // Add or remove the 'dark' class from the body
    if (darkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }

    // Save the user's preference to localStorage
    try {
      localStorage.setItem("syncspace_theme", JSON.stringify(darkMode));
    } catch (error) {
      console.error("Could not save theme to localStorage:", error);
    }
  }, [darkMode]); // The effect depends on the `darkMode` state

  // Return the state and the function to update it, just like useState
  return [darkMode, setDarkMode];
};

export default useDarkMode;
