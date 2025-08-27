import { useState, useEffect, useCallback } from "react";

// This custom hook fetches data from a URL and caches it in localStorage.
const useCachedFetch = (url, cacheKey, cacheDurationMinutes = 30) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    // 1. Check for cached data in localStorage
    try {
      const cachedItem = localStorage.getItem(cacheKey);
      if (cachedItem) {
        const { timestamp, data: cachedData } = JSON.parse(cachedItem);
        const isCacheValid =
          new Date().getTime() - timestamp < cacheDurationMinutes * 60 * 1000;

        if (isCacheValid) {
          setData(cachedData);
          setLoading(false);
          return; // Use cached data and stop
        }
      }
    } catch (e) {
      console.error("Failed to read from cache", e);
    }

    // 2. If cache is invalid or doesn't exist, fetch new data
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const newData = await response.json();
      setData(newData);

      // 3. Save the new data and a timestamp to the cache
      const itemToCache = {
        timestamp: new Date().getTime(),
        data: newData,
      };
      localStorage.setItem(cacheKey, JSON.stringify(itemToCache));
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, cacheKey, cacheDurationMinutes]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
};

export default useCachedFetch;
