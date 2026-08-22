// Wraps Open Notify (http://open-notify.org)
// No API key required!

const axios = require("axios");

async function getIssLocation() {
  const res = await axios.get("http://api.open-notify.org/iss-now.json");
  return res.data.iss_position; // { latitude, longitude }
}

async function getAstronautsInSpace() {
  const res = await axios.get("http://api.open-notify.org/astros.json");
  return res.data.people; // [{ name, craft }, ...]
}

module.exports = { getIssLocation, getAstronautsInSpace };
