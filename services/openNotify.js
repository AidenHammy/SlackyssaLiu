const axios = require("axios");

async function getIssLocation() {
  try {
    // Try Open Notify first
    const { data } = await axios.get("http://api.open-notify.org/iss-now.json", { timeout: 5000 });
    if (data && typeof data === 'object' && data.iss_position) {
      return { latitude: data.iss_position.latitude, longitude: data.iss_position.longitude };
    }
    throw new Error("Bad response");
  } catch (e) {
    // Fallback to Where The ISS At
    const { data } = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
    return { latitude: data.latitude, longitude: data.longitude };
  }
}

async function getAstronautsInSpace() {
  try {
    // Try Open Notify first
    const { data } = await axios.get("http://api.open-notify.org/astros.json", { timeout: 5000 });
    if (data && typeof data === 'object' && Array.isArray(data.people)) {
      return data.people.map(p => ({ name: p.name, craft: p.craft }));
    }
    throw new Error("Bad response");
  } catch (e) {
    // Fallback to How Many People Are In Space
    const { data } = await axios.get("https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json");
    return data.people.map(p => ({ name: p.name, craft: p.craft }));
  }
}

module.exports = { getIssLocation, getAstronautsInSpace };
