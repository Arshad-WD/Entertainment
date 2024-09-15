import React from 'react';

const GameCard = ({ id, title, imageUrl, rating, className }) => {
  return (
    <div className={`relative w-48 h-72 bg-gray-800 rounded-lg overflow-hidden ${className}`}>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-2/3 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white truncate">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">Rating: {rating || 'N/A'}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-900 opacity-75 text-center">
        <a href={`/games/${id}`} className="text-yellow-400 hover:text-yellow-300">View Details</a>
      </div>
    </div>
  );
};

export default GameCard;
