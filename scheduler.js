// Proactive behavior, the part a slash-command-only bot can't do.
// Requires SLACK_ANNOUNCE_CHANNEL (a channel ID the bot is a member of).

const cron = require('node-cron');
const nasa = require('./services/nasa');
const launchLibrary = require('./services/launchLibrary');
const db = require('./db');
const p = require('./personality');

function registerScheduler(app) {
  const channel = process.env.SLACK_ANNOUNCE_CHANNEL;
  if (!channel) {
    console.warn('SLACK_ANNOUNCE_CHANNEL not set, scheduled posts disabled.');
    return;
  }

  // Daily APOD, 9am server time.
  cron.schedule('0 9 * * *', async () => {
    try {
      const apod = await nasa.getApod();
      await app.client.chat.postMessage({
        channel,
        text: `🌌 *${apod.title}*\n${apod.url}\n${p.apodFlavor()}`,
      });
    } catch (err) {
      console.error('APOD cron failed:', err.message);
    }
  });

  // Every 10 minutes: check if a launch is within the next hour and not
  // yet announced. This is the "actually behaves like a product" feature.
  cron.schedule('*/10 * * * *', async () => {
    try {
      const launch = await launchLibrary.getNextLaunch();
      if (!launch || db.hasAnnouncedLaunch(launch.id)) return;

      const minutesOut = (new Date(launch.net).getTime() - Date.now()) / 60000;
      if (minutesOut > 0 && minutesOut <= 60) {
        await app.client.chat.postMessage({
          channel,
          text: `🚀 T-minus ~${Math.round(minutesOut)} min: *${launch.name}* is about to go up.\n${p.launchFlavor()}`,
        });
        db.markLaunchAnnounced(launch.id);
      }
    } catch (err) {
      console.error('Launch cron failed:', err.message);
    }
  });
}

module.exports = registerScheduler;