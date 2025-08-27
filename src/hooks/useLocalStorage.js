import { useState, useEffect } from "react";

// Helper function to get stored value from localStorage, handling potential errors
const getStoredValue = (key, initialValue) => {
  try {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      return JSON.parse(savedValue);
    }
    // If initialValue is a function, call it to get the default value
    return initialValue instanceof Function ? initialValue() : initialValue;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return initialValue;
  }
};

/**
 * A custom hook to manage state that persists in the browser's localStorage.
 * @param {string} key The key to use for storing the value in localStorage.
 * @param {*} initialValue The initial value to use if nothing is stored.
 * @returns A stateful value, and a function to update it.
 */
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getStoredValue(key, initialValue);
  });

  // This effect runs whenever the `value` changes and saves it to localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
