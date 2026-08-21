// services/nasa.js
// Wraps NASA's open API (https://api.nasa.gov). Free key, generous rate limit

const axios = require("axios");

const NASA_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

async function getApod() {
  const res = await axios.get("https://api.nasa.gov/planetary/apod", {
    params: { api_key: NASA_KEY },
  });
  return res.data; // { title, explanation, url, date, etc }
}

async function getRandomMarsPhoto() {
  // Curiosity has been active since sol 1; pick a plausible recent-ish sol
  const sol = Math.floor(Math.random() * 3000) + 1;
  const res = await axios.get(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`,
    { params: { sol, api_key: NASA_KEY } },
  );
  const photos = res.data.photos;
  if (!photos || photos.length === 0) return null;
  return photos[Math.floor(Math.random() * photos.length)];
}

module.exports = { getApod, getRandomMarsPhoto };
