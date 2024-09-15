import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Genre from './genre';
import MovieCard from './MovieCard';
import { fetchTopMovies, fetchTopSeries, fetchMoviesByGenre, fetchAnimeMovies, fetchOtherMovies } from './utilities/api';
import '../components/responsive.css';
import tempImg from '../assets/temperory.jpeg';

const Movie = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentIndex, setCurrentIndex] = useState({ topMovies: 0, topSeries: 0, animeMovies: 0, otherMovies: 0 });
  const [topMovies, setTopMovies] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [animeMovies, setAnimeMovies] = useState([]);
  const [otherMovies, setOtherMovies] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [movies, series, animes, others] = await Promise.all([
        fetchTopMovies(),
        fetchTopSeries(),
        fetchAnimeMovies(),
        fetchOtherMovies()
      ]);
      setTopMovies(movies);
      setTopSeries(series);
      setAnimeMovies(animes);
      setOtherMovies(others);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleFetchGenres = (fetchedGenres) => {
    setGenres(fetchedGenres);
    setIsLoading(false);
  };

  const handleGenreClick = async (genre) => {
    setSelectedGenre(genre);
    setCurrentIndex(prev => ({ ...prev, topMovies: 0 }));
    console.log(`${genre} genre clicked`);
    const genreId = 28;
    const movies = await fetchMoviesByGenre(genreId);
    setTopMovies(movies);
  };

  const getVisibleMovies = (section) => {
    switch (section) {
      case 'topMovies':
        return selectedGenre && genres[selectedGenre]
          ? genres[selectedGenre].slice(currentIndex.topMovies, currentIndex.topMovies + 6)
          : topMovies.slice(currentIndex.topMovies, currentIndex.topMovies + 6);
      case 'topSeries':
        return topSeries.slice(currentIndex.topSeries, currentIndex.topSeries + 6);
      case 'animeMovies':
        return animeMovies.slice(currentIndex.animeMovies, currentIndex.animeMovies + 6);
      case 'otherMovies':
        return otherMovies.slice(currentIndex.otherMovies, currentIndex.otherMovies + 6);
      default:
        return [];
    }
  };

  const canShowNext = (section) => {
    switch (section) {
      case 'topMovies':
        return selectedGenre && genres[selectedGenre] && genres[selectedGenre].length > currentIndex.topMovies + 6
          || topMovies.length > currentIndex.topMovies + 6;
      case 'topSeries':
        return topSeries.length > currentIndex.topSeries + 6;
      case 'animeMovies':
        return animeMovies.length > currentIndex.animeMovies + 6;
      case 'otherMovies':
        return otherMovies.length > currentIndex.otherMovies + 6;
      default:
        return false;
    }
  };

  const canShowPrevious = (section) => {
    switch (section) {
      case 'topMovies':
        return currentIndex.topMovies > 0;
      case 'topSeries':
        return currentIndex.topSeries > 0;
      case 'animeMovies':
        return currentIndex.animeMovies > 0;
      case 'otherMovies':
        return currentIndex.otherMovies > 0;
      default:
        return false;
    }
  };

  const handleNavigation = (section, direction) => {
    setCurrentIndex(prev => {
      const newIndex = { ...prev };
      if (direction === 'next') {
        newIndex[section] += 3;
      } else if (direction === 'prev') {
        newIndex[section] -= 3;
      }
      return newIndex;
    });
  };

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center bg-gray-950 overflow-x-hidden">
      <div className="mt-6 top-30 w-full flex items-center justify-center space-x-4">
        <SearchBar />
        <Genre onFetchGenres={handleFetchGenres} setIsLoading={setIsLoading} />
      </div>

      <div className="mt-4 ml-32 w-full flex flex-col items-center">
        {isLoading && <p className='text-white'>Loading genres...</p>}
        {genres.length > 0 && (
          <div className="flex flex-wrap justify-center">
            {genres.map((genre, index) => (
              <button
                key={index}
                className={`p-3 px-6 m-2 rounded-3xl outline-none font-semibold
                ${selectedGenre === genre ? 'bg-white text-black' : 'bg-slate-400 hover:bg-gray-300 text-black'}`}
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Top Movies Section */}
      <div className="relative w-full flex flex-col items-center mt-10">
        <div className="relative w-full flex items-center">
          {canShowPrevious('topMovies') && (
            <button
              onClick={() => handleNavigation('topMovies', 'prev')}
              className={`absolute left-6 p-3 bg-gray-600 rounded-full hover:bg-gray-700 ${canShowPrevious('topMovies') ? 'opacity-100' : 'opacity-0'}`}
              style={{ zIndex: 10 }}
            >
              &lt;
            </button>
          )}
          <div className="flex flex-nowrap overflow-hidden mx-12">
            {getVisibleMovies('topMovies').map((movie, index) => (
              <MovieCard
                key={index}
                id = {movie.id}
                title={movie.title}
                imageUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : tempImg}
                rating={movie.vote_average}
                className="mx-2"
              />
            ))}
          </div>
          {canShowNext('topMovies') && (
            <button
              onClick={() => handleNavigation('topMovies', 'next')}
              className={`absolute right-6 p-3 bg-gray-600 rounded-full hover:bg-gray-700 ${canShowNext('topMovies') ? 'opacity-100' : 'opacity-0'}`}
              style={{ zIndex: 10 }}
            >
              &gt;
            </button>
          )}
        </div>
      </div>

      {/* Top Series Section */}
      <div className='Card-container w-screen h-5/6 bg-gray-800 mt-10'>
        <div className='TopMovieWeek px-4 py-2 text-left text-white flex items-center'>
          <h2 className='mr-4 font-semibold'>Top Series Of The Week</h2>
          <div className='flex-grow border-t border-gray-600'></div>
        </div>
        <div className="relative w-full flex flex-col items-center">
          <div className="relative w-full flex items-center">
            {canShowPrevious('topSeries') && (
              <button
                onClick={() => handleNavigation('topSeries', 'prev')}
                className={`absolute left-6 p-3 bg-gray-600 rounded-full hover:bg-gray-700 ${canShowPrevious('topSeries') ? 'opacity-100' : 'opacity-0'}`}
                style={{ zIndex: 10 }}
              >
                &lt;
              </button>
            )}
            <div className="flex flex-nowrap overflow-hidden mx-12 ml-16">
              {getVisibleMovies('topSeries').map((series, index) => (
                <MovieCard
                  key={index}
                  id = {series.id}
                  title={series.name}
                  imageUrl={series.poster_path ? `https://image.tmdb.org/t/p/w200${series.poster_path}` : tempImg}
                  rating={series.vote_average}
                  className="mx-2"
                />
              ))}
            </div>
            {canShowNext('topSeries') && (
              <button
                onClick={() => handleNavigation('topSeries', 'next')}
                className={`absolute right-6 p-3 bg-gray-600 rounded-full hover:bg-gray-700 ${canShowNext('topSeries') ? 'opacity-100' : 'opacity-0'}`}
                style={{ zIndex: 10 }}
              >
                &gt;
              </button>
            )}
          </div>
        </div>

        {/* Anime Movies Section */}
        <div className='AnimeMovies px-4 py-2 text-left text-white flex items-center mt-10'>
          <h2 className='mr-4 font-semibold'>Anime Movies</h2>
          <div className='flex-grow border-t border-gray-600'></div>
        </div>
        <div className="relative w-full flex flex-col items-center">
          <div className="relative w-full flex items-center">
            {canShowPrevious('animeMovies') && (
              <button
                onClick={() => handleNavigation('animeMovies', 'prev')}
                className={`absolute left-6 p-3 bg-gray-600 rounded-full hover:bg-gray-700 ${canShowPrevious('animeMovies') ? 'opacity-100' : 'opacity-0'}`}
                style={{ zIndex: 10 }}
              >
                &lt;
              </button>
            )}
            <div className="flex flex-nowrap overflow-hidden mx-12 ml-16">
              {getVisibleMovies('animeMovies').map((movie, index) => (
                <MovieCard
                  key={index}
                  id = {movie.id}
                  title={movie.title}
                  imageUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : tempImg}
                  rating={movie.vote_average}
                  className="mx-2"
                />
              ))}
            </div>
            {canShowNext('animeMovies') && (
              <button
                onClick={() => handleNavigation('animeMovies', 'next')}
                className={`absolute right-6 p-3 bg-gray-600 rounded-full hover:bg-gray-700 ${canShowNext('animeMovies') ? 'opacity-100' : 'opacity-0'}`}
                style={{ zIndex: 10 }}
              >
                &gt;
              </button>
            )}
          </div>
        </div>

        {/* Other Movies Section */}
        <div className='OtherMovies px-4 py-2 text-left text-white flex items-center mt-10'>
          <h2 className='mr-4 font-semibold'>Other Movies</h2>
          <div className='flex-grow border-t border-gray-600'></div>
        </div>
        <div className="relative w-full flex flex-col items-center">
          <div className="relative w-full flex items-center">
            {canShowPrevious('otherMovies') && (
              <button
                onClick={() => handleNavigation('otherMovies', 'prev')}
                className={`absolute left-6 p-3 bg-gray-600 rounded-full hover:bg-gray-700 ${canShowPrevious('otherMovies') ? 'opacity-100' : 'opacity-0'}`}
                style={{ zIndex: 10 }}
              >
                &lt;
              </button>
            )}
            <div className="flex flex-nowrap overflow-hidden mx-12 ml-16">
              {getVisibleMovies('otherMovies').map((movie, index) => (
                <MovieCard
                  key={index}
                  id = {movie.id}
                  title={movie.title}
                  imageUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : tempImg}
                  rating={movie.vote_average}
                  className="mx-2"
                />
              ))}
            </div>
            {canShowNext('otherMovies') && (
              <button
                onClick={() => handleNavigation('otherMovies', 'next')}
                className={`absolute right-6 p-3 bg-gray-600 rounded-full hover:bg-gray-700 ${canShowNext('otherMovies') ? 'opacity-100' : 'opacity-0'}`}
                style={{ zIndex: 10 }}
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
