import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGameDetails } from '../components/utilities/gameApi'; // Adjust the import path if needed
import tempImg from '../assets/temperory.jpeg'; // Replace with a default image for games
import { FaArrowLeft } from 'react-icons/fa6';
import GameCard from './gameCard'; // Import the GameCard component

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGameData = async () => {
      try {
        const gameData = await fetchGameDetails(id);
        setGame(gameData[0]); // Assuming the API returns an array of game details
      } catch (error) {
        setError("Failed to load game data");
      }
    };
    loadGameData();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (error) return <div>{error}</div>;
  if (!game) return <div>Loading...</div>;

  return (
    <div className="relative w-full h-auto flex flex-col items-center bg-gray-900">
      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-transform transform hover:scale-110"
        style={{ zIndex: 10 }}
      >
        <FaArrowLeft className="text-white" size={24} />
      </button>

      <div className="w-full flex flex-col items-center mt-10">
        <div className="relative w-full">
          <img
            src={game.cover?.url || tempImg}
            alt={game.name}
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="relative z-10 mt-6 w-4/5 max-w-screen-md bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white">{game.name}</h1>
          <p className="text-lg text-gray-400 mt-2">Rating: {game.rating || 'N/A'}</p>
          <p className="text-lg text-gray-400 mt-2">Summary: {game.summary || 'No description available'}</p>
        </div>
      </div>

      {/* Example of a GameCard component */}
      <div className="w-full mt-8">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Similar Games</h2>
        <div className="flex flex-wrap justify-center">
          <GameCard
            name="Example Game"
            imageUrl={tempImg}
            rating="4.5"
          />
          {/* Add more GameCard components as needed */}
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
