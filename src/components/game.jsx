import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import GameCard from './gameCard'; // Updated GameCard component
import SkeletonCard from './skeletonCard'; // Updated SkeletonCard component
import { fetchGames, fetchSimilarGames  } from './utilities/gameApi'; // Ensure fetchSimilarGames is imported

const GameDisplay = () => {
  const [games, setGames] = useState([]);
  const [similarGames, setSimilarGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const loadGames = async () => {
      setIsLoading(true);
      try {
        const gamesData = await fetchGames(currentPage);
        setGames((prev) => [...prev, ...gamesData]);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, [currentPage]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && games.length > 0) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.1 }
      );
    }
  }, [games, isLoading]);

  const handleGameClick = async (id) => {
    setSelectedGameId(id);
    const similarGamesData = await fetchSimilarGames(id);
    setSimilarGames(similarGamesData);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto bg-gray-950 p-8 flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold text-white mb-6">Top Games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {isLoading ? (
          Array.from({ length: 15 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          games.length > 0 ? (
            games.map((game, index) => (
              <div key={`${game.id}-${index}`} onClick={() => handleGameClick(game.id)}>
                <GameCard
                  id={game.id}
                  title={game.name}
                  imageUrl={game.background_image}
                  rating={game.rating}
                />
              </div>
            ))
          ) : (
            <div className="text-white">No games available.</div>
          )
        )}
      </div>

      {/* Similar Games Section */}
      {selectedGameId && similarGames.length > 0 && (
        <div className="mt-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Similar Games</h2>
          <div className="flex flex-wrap justify-center">
            {similarGames.map((similarGame, index) => (
              <GameCard
                key={`${similarGame.id}-${index}`}
                id={similarGame.id}
                title={similarGame.name}
                imageUrl={similarGame.background_image}
                rating={similarGame.rating}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDisplay;
