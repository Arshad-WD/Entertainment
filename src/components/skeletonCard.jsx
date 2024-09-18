import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="w-48 h-72 mx-2 bg-gray-700 rounded-lg animate-pulse flex flex-col items-center justify-center">
      <div className="w-32 h-48 bg-gray-600 rounded-lg"></div>
      <div className="w-24 h-4 bg-gray-600 mt-2 rounded"></div>
      <div className="w-16 h-4 bg-gray-600 mt-2 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
