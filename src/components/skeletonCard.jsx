import React from 'react';

const SkeletonCard = () => {
  return (
    <div 
      className="relative bg-zinc-950/50 backdrop-blur-md overflow-hidden border border-white/5 flex flex-col justify-between p-4 flex-shrink-0 rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-tl-xl rounded-br-xl shadow-2xl shadow-black/80 animate-pulse"
      style={{ width: '210px', height: '305px' }}
    >
      {/* Ambient glowing light element in the center of the skeleton card */}
      <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* Shimmer sweep effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>

      {/* Top Header Placeholder */}
      <div className="flex items-center justify-between w-full z-10">
        <div className="w-16 h-3 bg-zinc-800/80 rounded-md border border-white/5"></div>
        {/* Curved Floating Rating Badge Placeholder */}
        <div className="w-10 h-5 bg-zinc-800/80 rounded-tr-md rounded-bl-md rounded-tl-sm rounded-br-sm border border-white/5"></div>
      </div>

      {/* Main Large Image/Icon Silhouette Centerholder */}
      <div className="my-auto flex flex-col items-center justify-center z-10 space-y-3">
        <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center shadow-inner">
          <div className="w-5 h-5 rounded-full bg-zinc-800 animate-ping opacity-30"></div>
        </div>
        <div className="w-32 h-3.5 bg-zinc-800/80 rounded-md border border-white/5"></div>
      </div>

      {/* Bottom Text/Badge Placeholders */}
      <div className="space-y-2.5 z-10 pt-3 border-t border-white/5">
        <div className="w-full h-2 bg-zinc-900 rounded-md"></div>
        <div className="flex items-center justify-between">
          <div className="w-12 h-2.5 bg-zinc-800 rounded"></div>
          <div className="w-16 h-4 bg-zinc-900 rounded-sm border border-white/5"></div>
        </div>
      </div>

    </div>
  );
};

export default SkeletonCard;
