// src/components/gameCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaGamepad } from 'react-icons/fa';

const GameCard = ({ id, name, background_image, rating, parent_platforms }) => {
  const formattedRating = typeof rating === 'number' ? rating.toFixed(1) : rating;

  return (
    <Link to={`/game/${id}`} className="no-underline block group will-change-transform">
      {/* Asymmetric Cyberpunk Curved Card (Inverse corners from Movie Card) */}
      <div 
        className="relative bg-zinc-950 overflow-hidden shadow-2xl transition-all duration-500 ease-out flex-shrink-0 cursor-pointer rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl shadow-black/80 hover:-translate-y-2.5 hover:shadow-[0_15px_35px_rgba(236,72,153,0.25)] holo-card-sweep holo-border-glow"
        style={{ width: '220px', height: '310px' }}
      >
        {/* Full Card Background Image */}
        <img 
          src={background_image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600"} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100" 
          loading="lazy"
        />

        {/* Diagonal Gaming Neon Panel Glow Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-pink-600/0 via-pink-600/0 to-pink-600/10 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Top Dark Gradient Overlay for Rating Pill */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-10"></div>

        {/* Curved Floating Rating Badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center space-x-1 bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 rounded-tr-md rounded-bl-md rounded-tl-sm rounded-br-sm border border-pink-500/30 shadow-lg shadow-pink-900/20">
          <FaStar className="text-pink-500 text-[10px] animate-pulse" />
          <span className="text-[10px] font-black text-white tracking-wider">
            {formattedRating || "4.8"}
          </span>
        </div>

        {/* Sliding Info Panel on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/90 to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 z-20">
          
          {/* Animated floating game icon */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-600/40 scale-50 group-hover:scale-100 transition-all duration-500 ease-out">
            <FaGamepad className="text-sm" />
          </div>

          <h3 className="text-white text-sm font-black tracking-wide leading-tight truncate uppercase bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            {name}
          </h3>
          
          <p className="text-[9px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            Discover platform availability, raw metacritic stats, release timelines and playtimes.
          </p>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
            <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest">
              RAWG BETA
            </span>
            <span className="text-[8px] text-pink-400 bg-pink-950/40 border border-pink-500/30 px-2 py-0.5 rounded-sm uppercase font-black">
              PLAY NOW
            </span>
          </div>

        </div>

        {/* Static Title Overlay (Visible when NOT hovering) */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col justify-end z-10 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-white text-xs font-bold truncate tracking-wide">
            {name}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[8px] font-black uppercase text-zinc-400 tracking-wider truncate max-w-[120px]">
              {parent_platforms?.map(p => p.platform.name).join(', ') || 'PC, Console'}
            </span>
            <span className="text-[8px] font-black uppercase text-pink-400 bg-pink-950/20 px-2 py-0.5 rounded border border-pink-500/20 flex-shrink-0">
              GAME
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default GameCard;
