import React from 'react';

const CharCard = ({ name, imageUrl, role }) => {
  return (
    <div 
      className="bg-zinc-900/60 backdrop-blur-md p-3 m-2 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-300 shadow-md group flex-shrink-0" 
      style={{ width: '150px', height: '230px' }}
    >
      <div className="relative w-full overflow-hidden rounded-xl" style={{ height: '65%' }}>
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="mt-3 flex flex-col justify-between" style={{ height: '30%' }}>
        <h3 className="text-white text-xs font-black truncate">
          {name}
        </h3>
        <p className="text-[10px] text-zinc-400 truncate leading-snug">
          as {role || "Cast"}
        </p>
      </div>
    </div>
  );
};

export default CharCard;
