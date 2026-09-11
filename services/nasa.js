const axios = require("axios");

// Fallback to DEMO_KEY if env var is missing
const NASA_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

async function getApod() {
  const { data } = await axios.get("https://api.nasa.gov/planetary/apod", {
    params: { api_key: NASA_KEY },
  });
  return data;
}

async function getRandomMarsPhoto() {
  // Curiosity has thousands of sols, just grab a random one
  const sol = Math.floor(Math.random() * 3000) + 1;
  const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
  
  const { data } = await axios.get(url, {
    params: { sol, api_key: NASA_KEY },
  });

  const { photos } = data;
  if (!photos || !photos.length) return null;
  return photos[Math.floor(Math.random() * photos.length)];
}

module.exports = { getApod, getRandomMarsPhoto };