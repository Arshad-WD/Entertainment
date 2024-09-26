// https://api.themoviedb.org/3/genre/movie/list?api_key=513f6d16a4509c1eb376c505e66ec61c
import React from "react";

const genre = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
const handleGenreClick = (id) => {
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);
  setSelectedGenreIds((prevIds) => [...prevIds, id]);
};

function Genre({ onFetchGenres, setIsLoading }) {
  const fetchGenres = async (setSelectedGenreIds) => {
    setIsLoading(true);
    try {
      const genreList = await new Promise((resolve) => {
        setTimeout(() => {
          // const updateGenres = genre.map((genre) => (genre.id, genre.name));
          // const temp = genre.m ap(genre=> genre.id);
          // console.log(temp)
          resolve(genre);
          // onclick.updateGenres=setSelectedGenreIds((prevIds) => [...prevIds, updateGenres.id]);
        }, 1000);
      });

      onFetchGenres(genreList);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch genres:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="bg-cyan-500 hover:shadow-xl before:shadow-2xl p-3 rounded-2xl outline-none text-black hover:font-bold hover:text-white"
        onClick={fetchGenres}
      >
        Genres →
      </button>
    </div>
  );
}

export default Genre;
