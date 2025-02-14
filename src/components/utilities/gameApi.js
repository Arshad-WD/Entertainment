const API_KEY = 'c652890027b342ff92250dd8a3e57a15';
const BASE_URL = 'https://api.rawg.io/api/';
const PROXY_URL = 'https://thingproxy.freeboard.io/fetch/';


export const fetchGames = async (page) => {
  try {
    const response = await fetch(`${PROXY_URL}${BASE_URL}games?key=${API_KEY}&ordering=-rating&page_size=20&page=${page}`);
    const data = await response.json();
    let result = data.results.filter(game => game.id !== 750429); // Use strict inequality
    // console.log(result);
    return result;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

export const fetchGameDetails = async (id) => {
  try {
    const response = await fetch(`${PROXY_URL}${BASE_URL}games/${id}?key=${API_KEY}`); // Added PROXY_URL here
    return await handleResponse(response); // Handle the response
  } catch (error) {
    console.error(`Error fetching game details for id ${id}:`, error);
    return null; // Return null if there's an error
  }
};

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json(); // Return parsed JSON data
};

export const fetchGamesByGenre = async (genreId) => {
  try {
    const response = await fetch(`${PROXY_URL}${BASE_URL}games?key=${API_KEY}&genres=${genreId}&ordering=-rating&page_size=10`); // Fetching games by genre
    const data = await handleResponse(response);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching games for genre id ${genreId}:`, error);
    return []; // Return an empty array if there's an error
  }
};

// Update the fetchSimilarGames function to get genres of the game first
export const fetchSimilarGames = async (id) => {
  try {
    const gameDetails = await fetchGameDetails(id);
    const genres = gameDetails.genres.map(genre => genre.id); // Get genre IDs
    const promises = genres.map(genreId => fetchGamesByGenre(genreId)); // Fetch games for each genre

    // Wait for all genre-based fetches to complete
    const genreGamesArrays = await Promise.all(promises);
    const similarGames = [].concat(...genreGamesArrays); // Flatten the array of arrays

    // Optionally remove duplicates
    const uniqueSimilarGames = Array.from(new Set(similarGames.map(game => game.id)))
      .map(id => similarGames.find(game => game.id === id));

    return uniqueSimilarGames;
  } catch (error) {
    console.error(`Error fetching similar games for game id ${id}:`, error);
    return []; // Return an empty array if there's an error
  }
};
