const axios = require("axios");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const NASA_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

async function getApod() {
  const { data } = await axios.get("https://api.nasa.gov/planetary/apod", {
    params: { api_key: NASA_KEY },
    timeout: 10000
  });

  return {
    title: data.title,
    date: data.date,
    url: data.url,
    hdurl: data.hdurl || null,
    media_type: data.media_type,
    explanation: data.explanation || null
  };
}

let lastEpicImage = null;

async function getEpicPhoto() {
  const { data: dates } = await axios.get("https://api.nasa.gov/EPIC/api/natural/all", {
    params: { api_key: NASA_KEY },
  });

  if (!Array.isArray(dates) || dates.length === 0) return null;

  const shuffled = [...dates].sort(() => Math.random() - 0.5);

  for (const entry of shuffled) {
    try {
      const { data: photos } = await axios.get(`https://api.nasa.gov/EPIC/api/natural/date/${entry.date}`, {
        params: { api_key: NASA_KEY },
      });

      if (!Array.isArray(photos) || photos.length === 0) continue;

      const pool = photos.filter(p => p.image !== lastEpicImage);
      const photo = (pool.length > 0 ? pool : photos)[Math.floor(Math.random() * pool.length)];

      lastEpicImage = photo.image;
      const dateStr = photo.date.split(" ")[0].replace(/-/g, "/");
      
      return {
        url: `https://epic.gsfc.nasa.gov/archive/natural/${dateStr}/jpg/${photo.image}.jpg`,
        date: photo.date,
        caption: photo.caption,
      };
    } catch {
      continue;
    }
  }

  return null;
}

module.exports = { getApod, getEpicPhoto };