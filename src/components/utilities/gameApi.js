// src/components/utilities/gameApi.js

const API_KEY = 'c652890027b342ff92250dd8a3e57a15';
const BASE_URL = 'https://api.rawg.io/api/';

const MOCK_GAMES = [
  {
    id: 3498,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/456/456fc5a11d0feb71f36782f48f6bec40.jpg",
    rating: 4.5,
    released: "2013-09-17",
    description_raw: "Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond.",
    parent_platforms: [{ platform: { name: "PC" } }, { platform: { name: "PlayStation" } }, { platform: { name: "Xbox" } }],
    genres: [{ id: 4, name: "Action" }, { id: 3, name: "Adventure" }],
    metacritic: 97,
    playtime: 73,
    suggestions_count: 850,
    developers: [{ name: "Rockstar Games" }]
  },
  {
    id: 3328,
    name: "The Witcher 3: Wild Hunt",
    background_image: "https://media.rawg.io/media/games/618/618c31e6a10b65b4dbf814ea49682502.jpg",
    rating: 4.7,
    released: "2015-05-18",
    description_raw: "The Witcher: Wild Hunt is a story-driven, next-generation open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
    parent_platforms: [{ platform: { name: "PC" } }, { platform: { name: "PlayStation" } }, { platform: { name: "Xbox" } }],
    genres: [{ id: 5, name: "RPG" }, { id: 4, name: "Action" }],
    metacritic: 93,
    playtime: 46,
    suggestions_count: 730,
    developers: [{ name: "CD PROJEKT RED" }]
  },
  {
    id: 4200,
    name: "Portal 2",
    background_image: "https://media.rawg.io/media/games/328/3283c772b1e9c3d69f976a44c281a797.jpg",
    rating: 4.6,
    released: "2011-04-18",
    description_raw: "Portal 2 draws from the award-winning formula of innovative gameplay, story, and music that earned the original Portal over 70 industry accolades and created a cult following.",
    parent_platforms: [{ platform: { name: "PC" } }, { platform: { name: "Xbox" } }, { platform: { name: "PlayStation" } }],
    genres: [{ id: 2, name: "Shooter" }, { id: 7, name: "Puzzle" }],
    metacritic: 95,
    playtime: 11,
    suggestions_count: 512,
    developers: [{ name: "Valve" }]
  },
  {
    id: 5286,
    name: "Tomb Raider (2013)",
    background_image: "https://media.rawg.io/media/games/021/021841a69a052fd31f578553d07fd685.jpg",
    rating: 4.1,
    released: "2013-03-05",
    description_raw: "Tomb Raider explores the intense and gritty origin story of Lara Croft and her ascent from a young woman to a hardened survivor.",
    parent_platforms: [{ platform: { name: "PC" } }, { platform: { name: "PlayStation" } }, { platform: { name: "Xbox" } }],
    genres: [{ id: 4, name: "Action" }, { id: 3, name: "Adventure" }],
    metacritic: 86,
    playtime: 18,
    suggestions_count: 420,
    developers: [{ name: "Crystal Dynamics" }]
  },
  {
    id: 5679,
    name: "The Elder Scrolls V: Skyrim",
    background_image: "https://media.rawg.io/media/games/7a2/7a211ae2e67c29373d010d2e30e909cc.jpg",
    rating: 4.4,
    released: "2011-11-11",
    description_raw: "The next chapter in the highly anticipated Elder Scrolls saga arrives from the makers of the 2006 and 2008 Games of the Year, Bethesda Game Studios.",
    parent_platforms: [{ platform: { name: "PC" } }, { platform: { name: "PlayStation" } }, { platform: { name: "Xbox" } }],
    genres: [{ id: 5, name: "RPG" }, { id: 10, name: "Fantasy" }],
    metacritic: 94,
    playtime: 75,
    suggestions_count: 610,
    developers: [{ name: "Bethesda Game Studios" }]
  },
  {
    id: 12020,
    name: "Left 4 Dead 2",
    background_image: "https://media.rawg.io/media/games/d58/d588991d955140f5a7029339a7b46121.jpg",
    rating: 4.1,
    released: "2009-11-17",
    description_raw: "Set in the zombie apocalypse, Left 4 Dead 2 is the highly anticipated sequel to the award-winning Left 4 Dead, the #1 co-op game of 2008.",
    parent_platforms: [{ platform: { name: "PC" } }, { platform: { name: "Xbox" } }],
    genres: [{ id: 2, name: "Shooter" }, { id: 4, name: "Action" }],
    metacritic: 89,
    playtime: 32,
    suggestions_count: 390,
    developers: [{ name: "Valve" }]
  }
];

// Helper to filter out mature/adult content strictly
const isSafeContent = (game) => {
  const sensitiveKeywords = ['sex', 'hentai', 'nudity', 'naked', 'xxx', 'adult', 'erotic', 'nsfw', 'porn', 'boobs', 'waifu', 'milf', 'sensual', 'orgasm', 'fuck', 'nude'];
  const nameLower = (game.name || '').toLowerCase();
  const slugLower = (game.slug || '').toLowerCase();
  
  const tagsLower = game.tags?.map(t => (t.name || '').toLowerCase()).join(' ') || '';
  const descriptionLower = (game.description_raw || game.description || '').toLowerCase();

  return !sensitiveKeywords.some(keyword => 
    nameLower.includes(keyword) || 
    slugLower.includes(keyword) ||
    tagsLower.includes(keyword) || 
    descriptionLower.includes(keyword)
  );
};

export const fetchGames = async (page) => {
  try {
    const response = await fetch(`${BASE_URL}games?key=${API_KEY}&ordering=-rating&page_size=16&page=${page}`);
    if (!response.ok) {
      throw new Error(`Failed to load RAWG API: ${response.status}`);
    }
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      // Filter out duplicate IDs, invalid IDs, and non-safe adult content
      const uniqueResults = [];
      const seenIds = new Set();

      data.results.forEach(game => {
        if (game.id && game.id !== 750429 && !seenIds.has(game.id) && isSafeContent(game)) {
          seenIds.add(game.id);
          uniqueResults.push(game);
        }
      });

      return uniqueResults;
    }
    return MOCK_GAMES;
  } catch (error) {
    console.warn('Error fetching RAWG games, falling back to mock safe catalog:', error);
    return MOCK_GAMES.filter(isSafeContent);
  }
};

export const fetchGameDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}games/${id}?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch game details: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`Error fetching game ${id} details, falling back to mock details:`, error);
    const mock = MOCK_GAMES.find(g => g.id === parseInt(id)) || MOCK_GAMES[0];
    return mock;
  }
};

export const fetchSimilarGames = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}games/${id}/suggested?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch suggested games: ${response.status}`);
    }
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results.filter(game => game.id !== parseInt(id) && isSafeContent(game));
    }
    return MOCK_GAMES.filter(g => g.id !== parseInt(id) && isSafeContent(g));
  } catch (error) {
    console.warn(`Error fetching suggestions for ${id}, falling back to mock similar:`, error);
    return MOCK_GAMES.filter(g => g.id !== parseInt(id) && isSafeContent(g));
  }
};
