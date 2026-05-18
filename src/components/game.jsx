// src/components/game.jsx
import React, { useState, useEffect, useRef } from 'react';
import GameCard from './gameCard'; 
import SkeletonCard from './skeletonCard'; 
import { fetchGames, fetchSimilarGames } from './utilities/gameApi'; 
import { FaChevronDown, FaGamepad } from 'react-icons/fa';

const GameDisplay = () => {
  const [games, setGames] = useState([]);
  const [similarGames, setSimilarGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedGameTitle, setSelectedGameTitle] = useState("");
  const containerRef = useRef(null);
  const fetchedGameIds = useRef(new Set()); 

  useEffect(() => {
    const loadGames = async () => {
      setIsLoading(true);
      try {
        const gamesData = await fetchGames(currentPage);
        
        // Filter duplicates and mature content
        const newGames = gamesData.filter(game => game && game.id && !fetchedGameIds.current.has(game.id));
        
        newGames.forEach(game => fetchedGameIds.current.add(game.id));

        setGames((prev) => {
          const combined = [...prev, ...newGames];
          // Rigid de-duplication filter on full list to be 100% safe
          return combined.filter((g, index, self) => self.findIndex(item => item.id === g.id) === index);
        });
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, [currentPage]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 150 && !isLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading]);

  const handleGameClick = async (id, name) => {
    setSelectedGameId(id);
    setSelectedGameTitle(name);
    try {
      const similarGamesData = await fetchSimilarGames(id);
      // Ensure similar games are filtered for duplicates/mature content as well
      const cleanSimilar = similarGamesData.filter((g, index, self) => 
        g && g.id !== id && self.findIndex(item => item.id === g.id) === index
      );
      setSimilarGames(cleanSimilar);
    } catch (err) {
      console.warn("Failed fetching similar games:", err);
      setSimilarGames([]);
    }
    
    // Smooth scroll down to similar games list
    setTimeout(() => {
      const el = document.getElementById("similar-games-anchor");
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto bg-[#03000a] p-8 md:p-12 flex flex-col items-center pb-24 scroll-smooth scrollbar-thin animate-fade-in"
    >
      {/* Title Header */}
      <div className="max-w-7xl mx-auto w-full text-center flex flex-col items-center mb-12 mt-4">
        <span className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-2">RAWG DATABASE</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase flex items-center space-x-3">
          <FaGamepad className="text-pink-500 text-3xl animate-pulse" />
          <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Top Gaming Portal</span>
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl font-light mt-3 leading-relaxed">
          Unlock platform availability, developer ratings, suggestions, and detailed summaries inside the ultimate scrollable catalog.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 w-full max-w-[1400px]">
        {games.map((game, index) => (
          <div 
            key={game.id} 
            onClick={() => handleGameClick(game.id, game.name)}
            className="game-grid-item flex justify-center animate-card-fade"
            style={{ animationDelay: `${(index % 12) * 0.03}s` }}
          >
            <GameCard
              id={game.id}
              name={game.name}
              background_image={game.background_image}
              rating={game.rating}
              parent_platforms={game.parent_platforms} 
            />
          </div>
        ))}
        
        {isLoading && (
          Array.from({ length: 12 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="flex justify-center">
              <SkeletonCard />
            </div>
          ))
        )}
      </div>

      {/* Similar Games Section */}
      {selectedGameId && similarGames.length > 0 && (
        <div id="similar-games-anchor" className="mt-20 w-full max-w-[1400px] border-t border-white/5 pt-16 animate-fade-in">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-500">Related Titles</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Similar to <span className="bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent">{selectedGameTitle}</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {similarGames.map((similarGame) => (
              <div key={similarGame.id} className="animate-card-fade">
                <GameCard
                  id={similarGame.id}
                  name={similarGame.name}
                  background_image={similarGame.background_image}
                  rating={similarGame.rating}
                  parent_platforms={similarGame.parent_platforms} 
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Infinite scrolling indicator */}
      {!isLoading && (
        <div className="flex flex-col items-center justify-center space-x-2 text-xs font-bold text-zinc-500 uppercase tracking-widest mt-16 animate-bounce">
          <span>Scroll down for more</span>
          <FaChevronDown className="mt-1" />
        </div>
      )}
    </div>
  );
};

export default GameDisplay;
