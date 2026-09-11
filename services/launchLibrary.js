const axios = require('axios');

const BASE = 'https://ll.thespacedevs.com/2.2.0';

const headers = {
  // LL2 requires a user-agent or authorization string, even for basic limits
  Authorization: "Discord",
};

async function getNextLaunch() {
  const { data } = await axios.get(`${BASE}/launch/upcoming/`, {
    params: { limit: 1 },
    headers
  });
  
  const launch = data.results[0];
  if (!launch) return null;

  return {
    id: launch.id,
    name: launch.name,
    net: launch.net,
    provider: launch.launch_service_provider?.name,
    pad: launch.pad?.name,
    location: launch.pad?.location?.name,
    url: launch.url,
  };
}

async function getUpcomingLaunches(limit = 5) {
  const { data } = await axios.get(`${BASE}/launch/upcoming/`, { params: { limit }, headers });
  return data.results.map(l => ({
    id: l.id,
    name: l.name,
    net: l.net,
  }));
}

module.exports = { getNextLaunch, getUpcomingLaunches };