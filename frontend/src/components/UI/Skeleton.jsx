import React from "react";

export const SkeletonCard = () => (
  <div className="bg-gray-900 rounded-3xl border border-gray-800 p-8 h-64 animate-pulse">
    <div className="flex justify-between mb-6">
      <div className="w-12 h-12 bg-gray-800 rounded-xl"></div>
      <div className="w-20 h-6 bg-gray-800 rounded-full"></div>
    </div>
    <div className="w-3/4 h-8 bg-gray-800 rounded mb-4"></div>
    <div className="w-full h-4 bg-gray-800 rounded mb-2"></div>
    <div className="w-1/2 h-4 bg-gray-800 rounded mb-8"></div>
    <div className="w-full h-3 bg-gray-800 rounded-full"></div>
  </div>
);
