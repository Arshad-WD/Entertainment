// utilities/gameApi.js

const API_KEY = 'c652890027b342ff92250dd8a3e57a15';
const BASE_URL = 'https://api.rawg.io/api/';
const PROXY_URL = 'https://thingproxy.freeboard.io/fetch/'; 

export const fetchGames = async (page) => {
  try {
    const response = await fetch(`${PROXY_URL}${BASE_URL}games?key=${API_KEY}&ordering=-rating&page_size=10&page=${page}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

export const fetchGameDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
  handleResponse(response);
  return response.json();
};
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};
export const fetchSimilarGames = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${id}/similar?key=${API_KEY}`);
    const data = await handleResponse(response);
    return data.results || [];
  } catch (error) {
    console.error("Error fetching similar games:", error);
    return [];
  }
};
