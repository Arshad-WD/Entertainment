import React, { useState, useEffect } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SearchBar from "./searchBar";
import Genre from "./genre";
import MovieCard from "./movieCard";
import SkeletonCard from "./skeletonCard";
import {
  fetchTopMovies,
  fetchTopSeries,
  fetchMoviesByGenre,
  fetchAnimeMovies,
  fetchOtherMovies,
  fetchMovieByName,
} from "./utilities/api";
import "../components/responsive.css";
import tempImg from "../assets/temperory.jpeg";

const Movie = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentIndex, setCurrentIndex] = useState({
    topMovies: 0,
    topSeries: 0,
    animeMovies: 0,
    otherMovies: 0,
  });
  const [topMovies, setTopMovies] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [animeMovies, setAnimeMovies] = useState([]);
  const [otherMovies, setOtherMovies] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [movies, series, animes, others] = await Promise.all([
        fetchTopMovies(),
        fetchTopSeries(),
        fetchAnimeMovies(),
        fetchOtherMovies(),
      ]);
      setTopMovies(movies);
      setTopSeries(series);
      setAnimeMovies(animes);
      setOtherMovies(others);
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (value) {
      fetchMovieByName(value).then(setTopMovies);
    } else {
      fetchTopMovies().then(setTopMovies);
    }
  }, [value]);

  const handleFetchGenres = (fetchedGenres) => {
    setGenres(fetchedGenres);
    setIsLoading(false);
  };

  const handleGenreClick = async (genre) => {
    setSelectedGenre(genre);
    setCurrentIndex((prev) => ({ ...prev, topMovies: 0 }));
    console.log(`${genre.name} genre clicked`);
    const genreId = genre.id;
    const movies = await fetchMoviesByGenre(genreId);
    setTopMovies(movies);
  };

  const getVisibleMovies = (section) => {
    switch (section) {
      case "topMovies":
        return selectedGenre && genres[selectedGenre]
          ? genres[selectedGenre].slice(
              currentIndex.topMovies,
              currentIndex.topMovies + 6
            )
          : topMovies.slice(currentIndex.topMovies, currentIndex.topMovies + 7);
      case "topSeries":
        return topSeries.slice(
          currentIndex.topSeries,
          currentIndex.topSeries + 7
        );
      case "animeMovies":
        return animeMovies.slice(
          currentIndex.animeMovies,
          currentIndex.animeMovies + 7
        );
      case "otherMovies":
        return otherMovies.slice(
          currentIndex.otherMovies,
          currentIndex.otherMovies + 7
        );
      default:
        return [];
    }
  };

  const canShowNext = (section) => {
    switch (section) {
      case "topMovies":
        return (
          (selectedGenre &&
            genres[selectedGenre] &&
            genres[selectedGenre].length > currentIndex.topMovies + 6) ||
          topMovies.length > currentIndex.topMovies + 6
        );
      case "topSeries":
        return topSeries.length > currentIndex.topSeries + 6;
      case "animeMovies":
        return animeMovies.length > currentIndex.animeMovies + 6;
      case "otherMovies":
        return otherMovies.length > currentIndex.otherMovies + 6;
      default:
        return false;
    }
  };

  const canShowPrevious = (section) => {
    switch (section) {
      case "topMovies":
        return currentIndex.topMovies > 0;
      case "topSeries":
        return currentIndex.topSeries > 0;
      case "animeMovies":
        return currentIndex.animeMovies > 0;
      case "otherMovies":
        return currentIndex.otherMovies > 0;
      default:
        return false;
    }
  };

  const handleNavigation = (section, direction) => {
    setCurrentIndex((prev) => {
      const newIndex = { ...prev };
      if (direction === "next") {
        newIndex[section] += 3;
      } else if (direction === "prev") {
        newIndex[section] -= 3;
      }
      return newIndex;
    });
  };

  const renderSkeletons = () => (
    <div className="flex flex-nowrap overflow-hidden space-x-4 mx-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#03000a] text-zinc-100 flex flex-col items-center pb-24 overflow-x-hidden animate-fade-in">
      
      {/* Top Title/Intro Section */}
      <div className="max-w-7xl mx-auto w-full px-8 pt-12 text-center flex flex-col items-center">
        <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2">Cinematic Universe</span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent uppercase mb-4">
          LuxeVista Cinema
        </h1>
        <p className="text-sm text-zinc-400 max-w-xl font-light mb-10 leading-relaxed">
          Filter through multiple genres, query global cinematic databases, and find your next absolute binge watch immediately.
        </p>

        {/* Search Bar & Genres Actions Row */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl bg-white/5 p-4 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl">
          <SearchBar value={value} setValue={setValue} placeholder="Search Movies..." />
          <Genre onFetchGenres={handleFetchGenres} setIsLoading={setIsLoading} />
        </div>
      </div>

      {/* Genres Buttons Container */}
      {genres.length > 0 && (
        <div className="max-w-5xl mx-auto w-full px-8 mt-10">
          <div className="flex flex-wrap justify-center bg-black/40 p-4 rounded-3xl border border-white/5 backdrop-blur-md">
            {genres.map((genre, index) => (
              <button
                key={index}
                className={`p-2 px-5 m-1.5 rounded-full outline-none font-bold text-[10px] tracking-widest uppercase transition-all duration-300 border cursor-pointer
                ${
                  selectedGenre === genre
                    ? "bg-gradient-to-r from-red-600 to-pink-600 border-transparent text-white shadow-lg shadow-red-600/30 scale-105"
                    : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => handleGenreClick(genre)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RENDER SHELVES */}
      
      {/* 1. TOP TRENDING MOVIES */}
      <div className="w-full mt-16 max-w-[1400px] mx-auto px-8 relative">
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="font-black tracking-wider text-2xl uppercase bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              {selectedGenre ? `${selectedGenre.name} Movies` : "Top Trending Movies"}
            </h2>
            <span className="text-[10px] font-black uppercase bg-red-600/10 border border-red-500/20 px-3 py-1 rounded-full text-red-500">
              TMDB Live
            </span>
          </div>
          <div className="flex-grow border-t border-white/5 ml-6"></div>
        </div>

        <div className="relative w-full flex items-center group">
          {canShowPrevious("topMovies") && (
            <button
              onClick={() => handleNavigation("topMovies", "prev")}
              className="absolute -left-4 z-30 w-11 h-11 rounded-full bg-black/75 hover:bg-red-600 border border-white/10 text-white flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <FaChevronLeft size={14} />
            </button>
          )}

          {isLoading ? (
            renderSkeletons()
          ) : (
            <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden space-x-5 py-4 scrollbar-none w-full scroll-smooth">
              {getVisibleMovies("topMovies").map((movie, index) => (
                <MovieCard
                  key={index}
                  id={movie.id}
                  title={movie.title}
                  imageUrl={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : tempImg
                  }
                  rating={movie.vote_average}
                />
              ))}
            </div>
          )}

          {canShowNext("topMovies") && (
            <button
              onClick={() => handleNavigation("topMovies", "next")}
              className="absolute -right-4 z-30 w-11 h-11 rounded-full bg-black/75 hover:bg-red-600 border border-white/10 text-white flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <FaChevronRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* 2. TOP SERIES */}
      <div className="w-full mt-16 max-w-[1400px] mx-auto px-8 relative">
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="font-black tracking-wider text-2xl uppercase bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Top Series of The Week
            </h2>
            <span className="text-[10px] font-black uppercase bg-red-600/10 border border-red-500/20 px-3 py-1 rounded-full text-red-500">
              TV Shows
            </span>
          </div>
          <div className="flex-grow border-t border-white/5 ml-6"></div>
        </div>

        <div className="relative w-full flex items-center group">
          {canShowPrevious("topSeries") && (
            <button
              onClick={() => handleNavigation("topSeries", "prev")}
              className="absolute -left-4 z-30 w-11 h-11 rounded-full bg-black/75 hover:bg-red-600 border border-white/10 text-white flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <FaChevronLeft size={14} />
            </button>
          )}

          {isLoading ? (
            renderSkeletons()
          ) : (
            <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden space-x-5 py-4 scrollbar-none w-full scroll-smooth">
              {getVisibleMovies("topSeries").map((series, index) => (
                <MovieCard
                  key={index}
                  id={series.id}
                  title={series.name}
                  imageUrl={
                    series.poster_path
                      ? `https://image.tmdb.org/t/p/w300${series.poster_path}`
                      : tempImg
                  }
                  rating={series.vote_average}
                />
              ))}
            </div>
          )}

          {canShowNext("topSeries") && (
            <button
              onClick={() => handleNavigation("topSeries", "next")}
              className="absolute -right-4 z-30 w-11 h-11 rounded-full bg-black/75 hover:bg-red-600 border border-white/10 text-white flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <FaChevronRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* 3. ANIME SHOWCASE */}
      <div className="w-full mt-16 max-w-[1400px] mx-auto px-8 relative">
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="font-black tracking-wider text-2xl uppercase bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Anime Masterpieces
            </h2>
            <span className="text-[10px] font-black uppercase bg-red-600/10 border border-red-500/20 px-3 py-1 rounded-full text-red-500">
              Animation
            </span>
          </div>
          <div className="flex-grow border-t border-white/5 ml-6"></div>
        </div>

        <div className="relative w-full flex items-center group">
          {canShowPrevious("animeMovies") && (
            <button
              onClick={() => handleNavigation("animeMovies", "prev")}
              className="absolute -left-4 z-30 w-11 h-11 rounded-full bg-black/75 hover:bg-red-600 border border-white/10 text-white flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <FaChevronLeft size={14} />
            </button>
          )}

          {isLoading ? (
            renderSkeletons()
          ) : (
            <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden space-x-5 py-4 scrollbar-none w-full scroll-smooth">
              {getVisibleMovies("animeMovies").map((anime, index) => (
                <MovieCard
                  key={index}
                  id={anime.id}
                  title={anime.title}
                  imageUrl={
                    anime.poster_path
                      ? `https://image.tmdb.org/t/p/w300${anime.poster_path}`
                      : tempImg
                  }
                  rating={anime.vote_average}
                />
              ))}
            </div>
          )}

          {canShowNext("animeMovies") && (
            <button
              onClick={() => handleNavigation("animeMovies", "next")}
              className="absolute -right-4 z-30 w-11 h-11 rounded-full bg-black/75 hover:bg-red-600 border border-white/10 text-white flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <FaChevronRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* 4. OTHER POPULAR MOVIES */}
      <div className="w-full mt-16 max-w-[1400px] mx-auto px-8 relative">
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="font-black tracking-wider text-2xl uppercase bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Popular Classics
            </h2>
            <span className="text-[10px] font-black uppercase bg-red-600/10 border border-red-500/20 px-3 py-1 rounded-full text-red-500">
              Community Hits
            </span>
          </div>
          <div className="flex-grow border-t border-white/5 ml-6"></div>
        </div>

        <div className="relative w-full flex items-center group">
          {canShowPrevious("otherMovies") && (
            <button
              onClick={() => handleNavigation("otherMovies", "prev")}
              className="absolute -left-4 z-30 w-11 h-11 rounded-full bg-black/75 hover:bg-red-600 border border-white/10 text-white flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <FaChevronLeft size={14} />
            </button>
          )}

          {isLoading ? (
            renderSkeletons()
          ) : (
            <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden space-x-5 py-4 scrollbar-none w-full scroll-smooth">
              {getVisibleMovies("otherMovies").map((other, index) => (
                <MovieCard
                  key={index}
                  id={other.id}
                  title={other.title}
                  imageUrl={
                    other.poster_path
                      ? `https://image.tmdb.org/t/p/w300${other.poster_path}`
                      : tempImg
                  }
                  rating={other.vote_average}
                />
              ))}
            </div>
          )}

          {canShowNext("otherMovies") && (
            <button
              onClick={() => handleNavigation("otherMovies", "next")}
              className="absolute -right-4 z-30 w-11 h-11 rounded-full bg-black/75 hover:bg-red-600 border border-white/10 text-white flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <FaChevronRight size={14} />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default Movie;
