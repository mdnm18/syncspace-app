import React from "react";

// This component displays a placeholder UI while the quote data is loading.
const QuoteSkeleton = ({ darkMode }) => {
  return (
    <div
      className={`absolute w-full h-full rounded-3xl p-8 backdrop-blur-xl ${
        darkMode
          ? "bg-slate-800/40 border-slate-700/50"
          : "bg-white/40 border-white/50"
      } border shadow-2xl`}
    >
      <div className="h-full flex flex-col justify-center text-center animate-pulse">
        {/* Placeholder for the quote text */}
        <div className="h-6 w-3/4 bg-slate-300/20 rounded-md mx-auto mb-4"></div>
        <div className="h-6 w-1/2 bg-slate-300/20 rounded-md mx-auto mb-8"></div>

        {/* Placeholder for the author */}
        <div className="h-4 w-1/4 bg-slate-300/20 rounded-md mx-auto"></div>
      </div>
    </div>
  );
};

export default QuoteSkeleton;
