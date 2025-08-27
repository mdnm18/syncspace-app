import { useState, useEffect, useRef, useCallback } from "react";

// Custom hook to track which section is in view using the Intersection Observer API
const useScrollSpy = (ids, options) => {
  const [activeId, setActiveId] = useState();
  const observer = useRef(null);

  const handleIntersection = useCallback((entries) => {
    // Get all intersecting entries
    const intersectingEntries = entries.filter((entry) => entry.isIntersecting);

    if (intersectingEntries.length > 0) {
      // Sort by intersection ratio and position to get the most relevant section
      const sortedEntries = intersectingEntries.sort((a, b) => {
        // First priority: intersection ratio
        if (b.intersectionRatio !== a.intersectionRatio) {
          return b.intersectionRatio - a.intersectionRatio;
        }
        // Second priority: proximity to center
        const aDistance = Math.abs(
          a.boundingClientRect.top +
            a.boundingClientRect.height / 2 -
            window.innerHeight / 2
        );
        const bDistance = Math.abs(
          b.boundingClientRect.top +
            b.boundingClientRect.height / 2 -
            window.innerHeight / 2
        );
        return aDistance - bDistance;
      });

      const mostRelevant = sortedEntries[0];
      // Capitalize the first letter to match our state format (e.g., "mindful" -> "Mindful")
      const pageName =
        mostRelevant.target.id.charAt(0).toUpperCase() +
        mostRelevant.target.id.slice(1);
      setActiveId(pageName);
    }
  }, []);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id));

    // Disconnect any previous observer
    observer.current?.disconnect();

    // Create a new observer with optimized settings
    observer.current = new IntersectionObserver(handleIntersection, {
      // More sensitive thresholds for quicker response
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      ...options,
    });

    // Observe each section element
    elements.forEach((el) => {
      if (el) observer.current?.observe(el);
    });

    // Cleanup: disconnect the observer when the component unmounts
    return () => observer.current?.disconnect();
  }, [ids, options, handleIntersection]); // Rerun the effect if dependencies change

  return activeId;
};

export default useScrollSpy;
