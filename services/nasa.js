const axios = require("axios");
const dns = require("dns");

// Force Node to use IPv4 to avoid ENOTFOUND errors
dns.setDefaultResultOrder("ipv4first");

// Fallback to DEMO_KEY if env var is missing
const NASA_KEY = process.env.NASA_API_KEY;

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
  const { data: dates } = await axios.get(
    "https://api.nasa.gov/EPIC/api/natural/all",
    {
      params: { api_key: NASA_KEY },
    }
  );

  if (!Array.isArray(dates) || dates.length === 0) {
    return null;
  }

  const shuffledDates = [...dates]
    .sort(() => Math.random() - 0.5);

  for (const dateEntry of shuffledDates) {
    try {
      const { data: photos } = await axios.get(
        `https://api.nasa.gov/EPIC/api/natural/date/${dateEntry.date}`,
        {
          params: { api_key: NASA_KEY },
        }
      );

      if (!Array.isArray(photos) || photos.length === 0) {
        continue;
      }

      // Remove the previously returned image if possible
      const availablePhotos = photos.filter(
        photo => photo.image !== lastEpicImage
      );

      const pool =
        availablePhotos.length > 0
          ? availablePhotos
          : photos;

      const photo =
        pool[Math.floor(Math.random() * pool.length)];

      lastEpicImage = photo.image;

      const dateStr =
        photo.date.split(" ")[0].replace(/-/g, "/");

      const imgUrl =
        `https://epic.gsfc.nasa.gov/archive/natural/${dateStr}/jpg/${photo.image}.jpg`;

      return {
        url: imgUrl,
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
