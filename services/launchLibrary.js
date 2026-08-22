// Wraps The Space Devs' Launch Library 2 (https://thespacedevs.com/llapi)

const axios = require('axios');

const BASE = 'https://ll.thespacedevs.com/2.2.0';

async function getNextLaunch() {
  const res = await axios.get(`${BASE}/launch/upcoming/`, {
    params: { limit: 1 },
  });
  const launch = res.data.results[0];
  if (!launch) return null;

  return {
    id: launch.id,
    name: launch.name,
    net: launch.net, // ISO timestamp of "no earlier than" launch time
    provider: launch.launch_service_provider?.name,
    pad: launch.pad?.name,
    location: launch.pad?.location?.name,
    url: launch.url,
  };
}

async function getUpcomingLaunches(limit = 5) {
  const res = await axios.get(`${BASE}/launch/upcoming/`, { params: { limit } });
  return res.data.results.map((l) => ({
    id: l.id,
    name: l.name,
    net: l.net,
  }));
}

module.exports = { getNextLaunch, getUpcomingLaunches };