import React from "react";

const genreList = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

function Genre({ onFetchGenres, setIsLoading }) {
  const fetchGenres = async () => {
    setIsLoading(true);
    try {
      // Simulate rapid premium fetch
      const result = await new Promise((resolve) => {
        setTimeout(() => resolve(genreList), 400);
      });
      onFetchGenres(result);
    } catch (error) {
      console.error("Failed to fetch genres:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <button
        className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-red-500/20 shadow-lg shadow-red-600/10 hover:shadow-red-600/30 transition-all duration-300 cursor-pointer"
        onClick={fetchGenres}
      >
        Select Genres
      </button>
    </div>
  );
}

export default Genre;
