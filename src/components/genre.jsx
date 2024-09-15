import React from 'react';

function Genre({ onFetchGenres, setIsLoading }) {

  const fetchGenres = async () => {
    setIsLoading(true);
    try {
      const genreList = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(['Action', 'Horror', 'Comedy', 'Drama', 'Sci-Fi']);
        }, 1000);
      });

      onFetchGenres(genreList); 
    } catch (error) {
      console.error('Failed to fetch genres:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className='bg-cyan-500 hover:shadow-xl before:shadow-2xl p-3 rounded-2xl outline-none text-black hover:font-bold hover:text-white'
        onClick={fetchGenres}
      >
        Genres →
      </button>
    </div>
  );
}

export default Genre;
