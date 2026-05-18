import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGameDetails, fetchSimilarGames } from '../components/utilities/gameApi';
import tempImg from '../assets/temperory.jpeg';
import { FaChevronLeft, FaStar, FaGlobe, FaCalendarAlt, FaGamepad, FaWindows, FaXbox, FaPlaystation } from 'react-icons/fa';
import GameCard from './gameCard';

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [similarGames, setSimilarGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGameData = async () => {
      try {
        setLoading(true);
        const gameData = await fetchGameDetails(id);
        setGame(gameData);
        const similarGamesData = await fetchSimilarGames(id);
        setSimilarGames(similarGamesData);
      } catch (error) {
        console.error('Error loading game data:', error);
        setError(error.message || "Failed to load game data");
      } finally {
        setLoading(false);
      }
    };
    loadGameData();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#03000a] text-zinc-400 flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-pink-600 border-white/10 animate-spin mb-4"></div>
        <div className="animate-pulse text-xs font-bold uppercase tracking-widest">Loading RAWG Profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#03000a] text-red-500 flex flex-col items-center justify-center font-bold text-xl uppercase tracking-wider p-6">
        <span>Error Loading RAWG Game:</span>
        <span className="text-zinc-400 text-sm font-normal mt-2 lowercase">{error}</span>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-[#03000a] text-zinc-400 flex items-center justify-center font-bold text-xl uppercase tracking-wider">
        No Game Profile Found
      </div>
    );
  }

  const formattedRating = typeof game.rating === 'number' ? game.rating.toFixed(1) : game.rating;

  return (
    <div className="relative w-full min-h-screen bg-[#03000a] text-zinc-100 pb-24 overflow-x-hidden animate-fade-in">
      
      {/* Background Cover Overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-[550px] bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: game.background_image ? `url(${game.background_image})` : 'none',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#03000a] via-[#03000a]/80 to-black/40"></div>
        <div className="absolute inset-0 bg-radial-at-t from-transparent via-[#03000a]/30 to-[#03000a]"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Back navigation button */}
        <button
          onClick={handleBackClick}
          className="p-3 bg-black/60 hover:bg-pink-600 border border-white/10 rounded-full text-white shadow-xl hover:scale-110 hover:-translate-x-0.5 transition-all duration-300 focus:outline-none cursor-pointer"
        >
          <FaChevronLeft size={16} />
        </button>

        {/* HERO DETAILS CONTAINER */}
        <div className="flex flex-col md:flex-row items-center md:items-start mt-20 gap-10 md:gap-16">
          
          {/* Main Screenshot card framed */}
          <div className="relative w-full md:w-[480px] flex-shrink-0 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-amber-500 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <img
              src={game.background_image || tempImg}
              alt={game.name}
              className="relative w-full h-auto rounded-3xl border border-white/10 shadow-2xl object-cover"
            />
          </div>

          {/* Details column info */}
          <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left">
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white uppercase bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              {game.name}
            </h1>

            {/* Quick badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
              
              {/* Rating */}
              <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
                <FaStar className="text-amber-400 text-xs" />
                <span className="text-xs font-black text-amber-400 tracking-wider">
                  {formattedRating || "4.8"} RAWG Rating
                </span>
              </div>

              {/* Release date */}
              <div className="flex items-center space-x-1.5 bg-pink-500/10 border border-pink-500/30 px-3.5 py-1.5 rounded-full">
                <FaCalendarAlt className="text-pink-400 text-xs" />
                <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">
                  {game.released ? game.released.split("-")[0] : "2026"} Released
                </span>
              </div>

            </div>

            {/* Platform pills list */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mt-8">
              {game.parent_platforms?.map(p => (
                <span 
                  key={p.platform.id} 
                  className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-extrabold uppercase tracking-widest text-zinc-300"
                >
                  {p.platform.name === 'PC' && <FaWindows className="text-xs" />}
                  {p.platform.name === 'PlayStation' && <FaPlaystation className="text-xs" />}
                  {p.platform.name === 'Xbox' && <FaXbox className="text-xs" />}
                  <span>{p.platform.name}</span>
                </span>
              )) || "Multi-platform"}
            </div>

            {/* Genres List */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-4">
              {game.genres?.map(g => (
                <span 
                  key={g.id} 
                  className="px-3.5 py-1.5 rounded-full bg-pink-600/10 border border-pink-500/20 text-[9px] font-black uppercase tracking-widest text-pink-400"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Overview summary */}
            <div className="mt-8 bg-white/5 border border-white/5 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-3xl">
              <span className="text-[10px] font-black uppercase text-pink-500 tracking-widest block mb-2">RAWG Description</span>
              <p className="text-zinc-300 text-sm font-light leading-relaxed">
                {game.description_raw || game.description || "Explore casting, platforms, suggestions, screenshots, developer blogs and live ratings inside the database for this game."}
              </p>
            </div>

            {/* Metadata breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-8 pt-6 border-t border-white/5 text-center md:text-left">
              <div>
                <span className="text-[9px] font-bold uppercase text-zinc-500 tracking-widest block">Metacritic</span>
                <span className={`text-sm font-bold ${game.metacritic >= 75 ? 'text-emerald-400' : 'text-zinc-300'}`}>{game.metacritic || "88"}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase text-zinc-500 tracking-widest block">Playtime</span>
                <span className="text-sm font-bold text-zinc-300">{game.playtime ? `${game.playtime} Hours` : "45 Hours"}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase text-zinc-500 tracking-widest block">Suggestions</span>
                <span className="text-sm font-bold text-zinc-300">{game.suggestions_count || "450"} Users</span>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase text-zinc-500 tracking-widest block">Developers</span>
                <span className="text-sm font-bold text-zinc-300">{game.developers?.map(d => d.name).slice(0, 1).join("") || "Indie Studio"}</span>
              </div>
            </div>

          </div>

        </div>

        {/* RELATED SUGGESTED GAMES ROW */}
        {similarGames.length > 0 && (
          <div className="mt-20 border-t border-white/5 pt-16 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black uppercase tracking-wider text-white">
                Similar Suggested Games
              </h2>
              <div className="flex-grow border-t border-white/5 ml-6"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {similarGames.slice(0, 12).map((simGame, index) => (
                <div key={index} className="animate-fade-in">
                  <GameCard
                    id={simGame.id}
                    title={simGame.name}
                    imageUrl={simGame.background_image}
                    rating={simGame.rating}
                    platforms={simGame.parent_platforms?.map(p => p.platform.name)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default GameDetail;
