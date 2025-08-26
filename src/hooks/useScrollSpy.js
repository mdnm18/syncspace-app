import { useState, useEffect, useRef } from "react";

// Custom hook to track which section is in view using the Intersection Observer API
const useScrollSpy = (ids, options) => {
  const [activeId, setActiveId] = useState();
  const observer = useRef(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id));

    // Disconnect any previous observer
    observer.current?.disconnect();

    // Create a new observer
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          // Capitalize the first letter to match our state format (e.g., "mindful" -> "Mindful")
          const pageName =
            entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1);
          setActiveId(pageName);
        }
      });
    }, options);

    // Observe each section element
    elements.forEach((el) => {
      if (el) observer.current?.observe(el);
    });

    // Cleanup: disconnect the observer when the component unmounts
    return () => observer.current?.disconnect();
  }, [ids, options]); // Rerun the effect if ids or options change

  return activeId;
};

export default useScrollSpy;
