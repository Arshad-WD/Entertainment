import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGameDetails, fetchSimilarGames } from '../components/utilities/gameApi';
import tempImg from '../assets/temperory.jpeg';
import { FaArrowLeft } from 'react-icons/fa6';
import GameCard from './gameCard'; // Ensure the import path is correct

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
        setGame(gameData); // Assuming the API returns a single game object
        const similarGamesData = await fetchSimilarGames(id);
        setSimilarGames(similarGamesData);
      } catch (error) {
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-white">Loading game details...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-white text-center mt-10">{error}</div>;
  }

  if (!game) {
    return <div className="text-white text-center mt-10">No game data available.</div>;
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-gray-900 p-6">
      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-transform transform hover:scale-110 focus:outline-none"
        style={{ zIndex: 10 }}
      >
        <FaArrowLeft className="text-white" size={24} />
      </button>

      <div className="flex flex-col md:flex-row w-full mt-10 bg-gray-800 rounded-lg shadow-lg p-4">
        <img
          src={game.cover?.url || tempImg}
          alt={game.name}
          className="w-full md:w-4/12 h-auto rounded-lg shadow-lg object-cover"
        />
        <div className="ml-0 md:ml-6 mt-4 md:mt-0 w-full md:w-8/12">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{game.name}</h1>
          <p className="text-lg text-gray-400 mt-2">Rating: {game.rating || 'N/A'}</p>
          <p className="text-lg text-gray-400 mt-2">Release Date: {game.release_date || 'N/A'}</p>
          <p className="text-lg text-gray-400 mt-2">
            Platforms: {game.platforms?.map(platform => platform.name).join(', ') || 'N/A'}
          </p>
          <p className="text-gray-300 mt-4 text-xl">{game.summary || 'No description available'}</p>
        </div>
      </div>

      {/* Similar Games Section */}
      <div className="w-full mt-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Similar Games</h2>
        <div className="flex flex-wrap justify-center">
          {similarGames.length > 0 ? (
            similarGames.map(similarGame => (
              <GameCard
                key={similarGame.id}
                id={similarGame.id} // Pass the ID for routing
                title={similarGame.name}
                imageUrl={similarGame.cover?.url || tempImg}
                rating={similarGame.rating || 'N/A'}
              />
            ))
          ) : (
            <p className="text-gray-400">No similar games found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
