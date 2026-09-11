const cron = require('node-cron'),
      nasa = require('./services/nasa'),
      launchLibrary = require('./services/launchLibrary'),
      db = require('./db'),
      p = require('./personality');

function registerScheduler(app) {
  // 9am daily APOD
  cron.schedule('0 9 * * *', async () => {
    const channels = db.getAnnounceChannels();
    if (!channels.length) return;

    try {
      const { title, url } = await nasa.getApod();
      const text = `🌌 *${title}*\n${url}\n${p.apodFlavor()}`;
      
      for (const { channel_id } of channels) {
        await app.client.chat.postMessage({
          channel: channel_id,
          text,
          unfurl_links: true,
          unfurl_media: true
        });
      }
    } catch (e) {
      console.error('APOD cron failed');
    }
  });

  // Check for upcoming launches every 10 mins
  cron.schedule('*/10 * * * *', async () => {
    const channels = db.getAnnounceChannels();
    if (!channels.length) return;

    try {
      const launch = await launchLibrary.getNextLaunch();
      if (!launch || db.hasAnnouncedLaunch(launch.id)) return;

      const diff = (new Date(launch.net).getTime() - Date.now()) / 60000;
      if (diff > 0 && diff <= 60) {
        const text = `🚀 T-minus ~${Math.round(diff)} min: *${launch.name}* is about to go up.\n${p.launchFlavor()}`;
        
        for (const { channel_id } of channels) {
          await app.client.chat.postMessage({
            channel: channel_id,
            text
          });
        }
        db.markLaunchAnnounced(launch.id);
      }
    } catch (e) {
      console.error('Launch check failed');
    }
  });
}

module.exports = registerScheduler;