import React from "react";

export const SkeletonCard = () => (
  /* Responsive Container:
     - h-56 on mobile, h-64 on tablet+
     - p-5 on mobile, p-8 on tablet+
     - rounded-2xl on mobile looks better for smaller components
  */
  <div className="bg-gray-900 rounded-2xl sm:rounded-3xl border border-gray-800 p-5 sm:p-8 h-56 sm:h-64 animate-pulse">
    {/* Header Section */}
    <div className="flex justify-between mb-4 sm:mb-6">
      {/* Icon: w-10 on mobile, w-12 on tablet */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-lg sm:rounded-xl"></div>
      {/* Tag: slightly smaller on mobile */}
      <div className="w-16 h-5 sm:w-20 sm:h-6 bg-gray-800 rounded-full"></div>
    </div>

    {/* Title Bar: h-6 on mobile, h-8 on tablet */}
    <div className="w-3/4 h-6 sm:h-8 bg-gray-800 rounded mb-3 sm:mb-4"></div>

    {/* Description Bars: Slimmer on mobile for better text simulation */}
    <div className="w-full h-3 sm:h-4 bg-gray-800 rounded mb-2"></div>
    <div className="w-2/3 sm:w-1/2 h-3 sm:h-4 bg-gray-800 rounded mb-6 sm:mb-8"></div>

    {/* Footer/Progress Bar: h-2 on mobile, h-3 on tablet */}
    <div className="w-full h-2 sm:h-3 bg-gray-800 rounded-full"></div>
  </div>
);
