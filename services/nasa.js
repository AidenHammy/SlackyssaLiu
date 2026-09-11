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
  const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
  
  // Try up to 5 times to find a sol with actual photos
  for (let i = 0; i < 5; i++) {
    const sol = Math.floor(Math.random() * 3000) + 1;
    const { data } = await axios.get(url, {
      params: { sol, api_key: NASA_KEY },
    });

    const { photos } = data;
    if (photos && photos.length > 0) {
      return photos[Math.floor(Math.random() * photos.length)];
    }
  }
  
  // If it still fails after 5 tries, just grab a known good sol (Sol 1000)
  const { data } = await axios.get(url, {
    params: { sol: 1000, api_key: NASA_KEY },
  });
  
  const { photos } = data;
  if (photos && photos.length > 0) return photos[0];
  return null;
}

module.exports = { getApod, getRandomMarsPhoto };