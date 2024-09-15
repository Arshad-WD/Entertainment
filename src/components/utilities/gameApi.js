// gameApi.js

const CLIENT_ID = 'cnm977r5eoi0ilrpvcdkg6gvbxqilo';
const CLIENT_SECRET = '8yfq7y65m5ig88vcljg13ov30opfkb';
const BASE_URL = 'https://api.igdb.com/v4/';

// Function to get top games
export const fetchTopGames = async () => {
  const endpoint = 'games';
  const requestBody = `fields name, rating; sort rating desc; limit 10;`;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${CLIENT_SECRET}`,
        'Content-Type': 'text/plain'
      },
      body: requestBody
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching top games:', error);
    throw error;
  }
};

// Function to get game details
export const fetchGameDetails = async (gameId) => {
  const endpoint = 'games';
  const requestBody = `fields name, rating, summary, cover; where id = ${gameId};`;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${CLIENT_SECRET}`,
        'Content-Type': 'text/plain'
      },
      body: requestBody
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};
