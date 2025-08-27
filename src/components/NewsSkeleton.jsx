import React from "react";

// This component displays a placeholder UI while the news data is loading.
const NewsSkeleton = ({ darkMode }) => {
  return (
    <div
      className={`rounded-3xl overflow-hidden backdrop-blur-xl ${
        darkMode
          ? "bg-slate-800/40 border-slate-700/50"
          : "bg-white/40 border-white/50"
      } border shadow-2xl h-96 animate-pulse`}
    >
      {/* Placeholder for the image */}
      <div className="h-48 bg-slate-300/20"></div>
      <div className="p-6">
        {/* Placeholder for the title */}
        <div className="h-5 w-3/4 bg-slate-300/20 rounded-md mb-4"></div>
        {/* Placeholder for the description */}
        <div className="h-4 w-full bg-slate-300/20 rounded-md mb-2"></div>
        <div className="h-4 w-full bg-slate-300/20 rounded-md mb-2"></div>
        <div className="h-4 w-1/2 bg-slate-300/20 rounded-md"></div>
      </div>
    </div>
  );
};

export default NewsSkeleton;
