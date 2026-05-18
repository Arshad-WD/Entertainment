import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails, fetchMovieCharacters } from "./utilities/api";
import CharCard from "./charCard";
import tempImg from "../assets/temperory.jpeg";
import { FaArrowLeft, FaPlay, FaChevronLeft, FaStar, FaGlobe, FaCalendarAlt, FaFilm } from "react-icons/fa";
import MovieCard from "./movieCard";
import { fetchSimilarMovie } from "./utilities/api";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        const [movieData, characterData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieCharacters(id),
        ]);
        setMovie(movieData);
        setCharacters(characterData);
      } catch (error) {
        setError("Failed to load movie details");
      }
    };
    loadMovieData();
    setRecommended([]);
  }, [id]);

  const getRecommendation = async () => {
    if (!movie) return;
    setIsLoadingRecs(true);
    try {
      const lang = movie.spoken_languages && movie.spoken_languages[0] ? movie.spoken_languages[0].iso_639_1 : "en";
      const data = await fetchSimilarMovie(id, lang);
      setRecommended(data);
    } catch (err) {
      console.error("Failed to load recommendations", err);
    } finally {
      setIsLoadingRecs(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (error) return <div className="min-h-screen bg-[#03000a] text-red-500 flex items-center justify-center font-bold text-xl uppercase tracking-wider">{error}</div>;
  if (!movie) return (
    <div className="min-h-screen bg-[#03000a] text-zinc-400 flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-t-red-600 border-white/10 animate-spin mb-4"></div>
      <div className="animate-pulse text-xs font-bold uppercase tracking-widest">Streaming TMDB Portal...</div>
    </div>
  );

  const formattedRating = typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : movie.vote_average;

  return (
    <div className="relative w-full min-h-screen bg-[#03000a] text-zinc-100 pb-24 overflow-x-hidden animate-fade-in">
      
      {/* Dynamic Blur Poster Background Backdrop */}
      <div 
        className="absolute top-0 left-0 w-full h-[550px] bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: movie.backdrop_path 
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` 
            : movie.poster_path 
              ? `url(https://image.tmdb.org/t/p/original${movie.poster_path})` 
              : 'none',
        }}
      >
        {/* Cinematic Linear and Radial Dark Masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#03000a] via-[#03000a]/80 to-black/40"></div>
        <div className="absolute inset-0 bg-radial-at-t from-transparent via-[#03000a]/30 to-[#03000a]"></div>
      </div>

      {/* Main Container Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Floating Back Action Circle */}
        <button
          onClick={handleBackClick}
          className="p-3 bg-black/60 hover:bg-red-600 border border-white/10 rounded-full text-white shadow-xl hover:scale-110 hover:-translate-x-0.5 transition-all duration-300 focus:outline-none cursor-pointer"
        >
          <FaChevronLeft size={16} />
        </button>

        {/* HERO META SHOWCASE SECTION */}
        <div className="flex flex-col md:flex-row items-center md:items-start mt-20 gap-10 md:gap-16">
          
          {/* Framed Glowing Card Poster */}
          <div className="relative w-72 md:w-80 flex-shrink-0 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : tempImg}
              alt={movie.title}
              className="relative w-full h-auto rounded-3xl border border-white/10 shadow-2xl object-cover"
            />
          </div>

          {/* Details Column Info */}
          <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left">
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white uppercase bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              {movie.title}
            </h1>

            {/* Quick Badges Info */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
              
              {/* Rating */}
              <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
                <FaStar className="text-amber-400 text-xs" />
                <span className="text-xs font-black text-amber-400 tracking-wider">
                  {formattedRating || "7.5"} Rating
                </span>
              </div>

              {/* Language */}
              <div className="flex items-center space-x-1.5 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-full">
                <FaGlobe className="text-blue-400 text-xs" />
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                  {movie.spoken_languages?.map((lang) => lang.english_name || lang.name).slice(0, 1).join("") || "EN"}
                </span>
              </div>

              {/* Year */}
              <div className="flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
                <FaCalendarAlt className="text-emerald-400 text-xs" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  {movie.release_date?.split("-")[0] || "2026"}
                </span>
              </div>

            </div>

            {/* Genre Pill Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mt-8">
              {movie.genres?.map((g) => (
                <span 
                  key={g.id} 
                  className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-extrabold uppercase tracking-widest text-zinc-300"
                >
                  {g.name}
                </span>
              )) || "N/A"}
            </div>

            {/* Overview / Summary */}
            <div className="mt-8 bg-white/5 border border-white/5 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-3xl">
              <span className="text-[10px] font-black uppercase text-red-500 tracking-widest block mb-2">Movie Overview</span>
              <p className="text-zinc-300 text-sm font-light leading-relaxed">
                {movie.overview || "No detailed cinematic overview description is currently available for this title."}
              </p>
            </div>

            {/* Extra Info Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-xl mt-8 pt-6 border-t border-white/5 text-center md:text-left">
              <div>
                <span className="text-[9px] font-bold uppercase text-zinc-500 tracking-widest block">Countries</span>
                <span className="text-sm font-bold text-zinc-300">{movie.production_countries?.map((c) => c.iso_3166_1).slice(0, 2).join(", ") || "USA"}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase text-zinc-500 tracking-widest block">Runtime</span>
                <span className="text-sm font-bold text-zinc-300">{movie.runtime ? `${movie.runtime} Min` : "120 Min"}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase text-zinc-500 tracking-widest block">Tagline</span>
                <span className="text-sm font-bold text-zinc-300 italic truncate block max-w-[150px]">{movie.tagline || "Cinema Excellence"}</span>
              </div>
            </div>

            {/* Recommendations Trigger Buttons */}
            <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start w-full">
              <button
                onClick={getRecommendation}
                disabled={isLoadingRecs}
                className="group flex items-center space-x-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-red-600/10 hover:shadow-red-600/30 transition-all duration-300 cursor-pointer"
              >
                <FaFilm className="text-sm group-hover:scale-110 transition-transform" />
                <span>{isLoadingRecs ? "Loading Suggestions..." : "Get Recommendations"}</span>
              </button>
            </div>

          </div>

        </div>

        {/* CAST MEMBERS PORTAL ROW */}
        {characters.length > 0 && (
          <div className="mt-20 border-t border-white/5 pt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black uppercase tracking-wider text-white">
                Featured Screen Actors
              </h2>
              <div className="flex-grow border-t border-white/5 ml-6"></div>
            </div>
            
            <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden space-x-3 py-4 scrollbar-none">
              {characters.slice(0, 15).map((char) => (
                <CharCard
                  key={char.id}
                  name={char.name}
                  imageUrl={
                    char.profile_path
                      ? `https://image.tmdb.org/t/p/w300${char.profile_path}`
                      : tempImg
                  }
                  role={char.character}
                />
              ))}
            </div>
          </div>
        )}

        {/* SIMILAR SUGGESTED MOVIE ROW */}
        {recommended.length > 0 && (
          <div className="mt-20 border-t border-white/5 pt-16 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black uppercase tracking-wider text-white">
                Similar Recommendations
              </h2>
              <div className="flex-grow border-t border-white/5 ml-6"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {recommended.slice(0, 12).map((recMovie, index) => (
                <div key={index} className="animate-fade-in">
                  <MovieCard
                    id={recMovie.id}
                    title={recMovie.title}
                    imageUrl={
                      recMovie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${recMovie.poster_path}`
                        : tempImg
                    }
                    rating={recMovie.vote_average}
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

export default MovieDetail;
