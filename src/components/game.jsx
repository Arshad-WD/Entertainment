import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Genre from './genre';
import GameCard from './gameCard';
import { fetchTopGames } from '../components/utilities/gameApi';
import '../components/responsive.css';
import tempImg from '../assets/temperory.jpeg';

const Game = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topGames, setTopGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const games = await fetchTopGames('');
        setTopGames(games);
      } catch (error) {
        setError('Error fetching games. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFetchGenres = (fetchedGenres) => {
    setGenres(fetchedGenres);
    setIsLoading(false);
  };

  const handleGenreClick = async (genre) => {
    setSelectedGenre(genre);
    setCurrentIndex(0);
    console.log(`${genre} genre clicked`);
    try {
      const games = await fetchTopGames(genre);
      setTopGames(games);
    } catch (error) {
      setError('Error fetching games by genre. Please try again later.');
    }
  };

  const getVisibleGames = () => topGames.slice(currentIndex, currentIndex + 6);

  const canShowNext = () => topGames.length > currentIndex + 6;
  const canShowPrevious = () => currentIndex > 0;

  const handleNavigation = (direction) => {
    setCurrentIndex(prev => {
      const newIndex = direction === 'next' ? prev + 6 : prev - 6;
      return Math.max(0, Math.min(newIndex, topGames.length - 6));
    });
  };

  return (
    <div className="w-full h-auto flex flex-col items-center bg-gray-900 overflow-x-hidden">
      <div className="mt-6 w-full flex items-center justify-center space-x-4">
        <SearchBar />
        <Genre onFetchGenres={handleFetchGenres} setIsLoading={setIsLoading} />
      </div>

      <div className="mt-4 w-full flex flex-col items-center">
        {isLoading && <p className='text-white'>Loading genres...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {genres.length > 0 && (
          <div className="flex flex-wrap justify-center mb-4">
            {genres.map((genre, index) => (
              <button
                key={index}
                className={`p-3 px-6 m-2 rounded-3xl font-semibold transition-colors duration-300
                ${selectedGenre === genre ? 'bg-yellow-500 text-black' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Top Games Section */}
      <div className="relative w-full flex flex-col items-center mt-10">
        <div className="relative w-full flex items-center">
          {canShowPrevious() && (
            <button
              onClick={() => handleNavigation('prev')}
              className="absolute left-6 p-3 bg-yellow-500 rounded-full hover:bg-yellow-600 text-white transition-transform duration-300 transform hover:scale-110"
              style={{ zIndex: 10 }}
            >
              &lt;
            </button>
          )}
          <div className="flex flex-nowrap overflow-hidden mx-12">
            {getVisibleGames().map((game, index) => (
              <GameCard
                key={index}
                id={game.id}
                title={game.name}
                imageUrl={game.cover?.url || tempImg}
                rating={game.rating}
                className="mx-2 transition-transform duration-300 transform hover:scale-105"
              />
            ))}
          </div>
          {canShowNext() && (
            <button
              onClick={() => handleNavigation('next')}
              className="absolute right-6 p-3 bg-yellow-500 rounded-full hover:bg-yellow-600 text-white transition-transform duration-300 transform hover:scale-110"
              style={{ zIndex: 10 }}
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
