import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCharacters } from './utilities/api';
import CharCard from './charCard';
import tempImg from '../assets/temperory.jpeg';
import { FaArrowLeft } from 'react-icons/fa6';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        const [movieData, characterData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieCharacters(id)
        ]);
        setMovie(movieData);
        setCharacters(characterData);
      } catch (error) {
        setError("Failed to load movie data");
      }
    };
    loadMovieData();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (error) return <div>{error}</div>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="relative w-full h-auto flex flex-col items-center bg-slate-700">
      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-transform transform hover:scale-110"
        style={{ zIndex: 10 }}
      >
        <FaArrowLeft className="text-white" size={24} />
      </button>

      <div className="flex w-full mt-8">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : tempImg}
          alt={movie.title}
          className="w-1/6 h-auto rounded-lg ml-20 mr-10"
        />
        <div className="ml-4 w-2/3">
          <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
          <p className="text-lg text-gray-400 mt-2">
            Genre: {movie.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
          </p>
          <p className="text-lg text-gray-400 mt-2">
            Rating: {movie.vote_average || 'N/A'}
          </p>
          <p className="text-lg text-gray-400 mt-2">
            Languages: {movie.spoken_languages?.map((lang) => lang.name).join(', ') || 'N/A'}
          </p>
          <p className="text-lg text-gray-400 mt-2">
            Country: {movie.production_countries?.map((country) => country.name).join(', ') || 'N/A'}
          </p>
          <p className="text-lg text-gray-400 mt-2">
            Director: {movie.credits?.crew.find(person => person.job === 'Director')?.name || 'N/A'}
          </p>
          <p className="text-gray-300 mt-4 text-xl">{movie.overview || 'No description available'}</p>
        </div>
      </div>

      <div className="w-full mt-8">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Screen Actors</h2>
        <div className="flex flex-wrap justify-center">
          {characters.map((char) => (
            <CharCard
              key={char.id}
              name={char.name}
              imageUrl={char.profile_path ? `https://image.tmdb.org/t/p/w500${char.profile_path}` : tempImg}
              role={char.character}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
