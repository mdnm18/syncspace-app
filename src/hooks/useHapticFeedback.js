import { useCallback } from "react";

// This custom hook provides a function to trigger a short vibration.
const useHapticFeedback = () => {
  const triggerHapticFeedback = useCallback(() => {
    // Check if the Vibration API is supported by the browser and the device
    if (window.navigator && window.navigator.vibrate) {
      // Vibrate for 50 milliseconds for a short, crisp "tap" effect
      window.navigator.vibrate(50);
    }
  }, []);

  return triggerHapticFeedback;
};

export default useHapticFeedback;
