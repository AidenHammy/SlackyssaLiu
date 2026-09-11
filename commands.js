const nasa = require("./services/nasa"),
      openNotify = require("./services/openNotify"),
      launchLibrary = require("./services/launchLibrary"),
      db = require("./db"),
      p = require("./personality"),
      { countdown, safeRespond } = require("./format");

const HELP_MESSAGE = `*SlackyssaLiu | Commands*

_Live telemetry_
- /skl-iss -> where the ISS is right now
- /skl-crew -> who's currently off-planet
- /skl-launch -> the next scheduled rocket launch
- /skl-apod -> NASA's picture of the day
- /skl-mars -> a random photo from Curiosity

_Mission records_
- /skl-log [text] -> add an entry to this channel's mission log
- /skl-logs -> show recent entries
- /skl-callsign [name] -> set your callsign

_Scheduling_
- /skl-setup -> bind daily scheduled posts to this channel
- /skl-unset -> stop scheduled posts in this channel

_Utility_
- /skl-ping -> check the link
- /skl-help -> this message`;

function registerCommands(app) {
  app.command("/skl-ping", async ({ ack, respond }) => {
    const start = Date.now();
    await ack();
    await respond({ text: `Pong! ${Date.now() - start}ms.\n${p.pingLine()}` });
  });

  app.command("/skl-iss", async ({ ack, respond }) => {
    await ack();
    await safeRespond(respond, async () => {
      const pos = await openNotify.getIssLocation();
      await respond({ text: `🛰️ ISS position: ${pos.latitude}, ${pos.longitude}\n${p.issFlavor()}` });
    }, p.errorLine());
  });

  app.command("/skl-crew", async ({ ack, respond }) => {
    await ack();
    await safeRespond(respond, async () => {
      const people = await openNotify.getAstronautsInSpace();
      const names = people.map(m => `• ${m.name} (${m.craft})`).join("\n");
      await respond({ text: `Currently in space (${people.length}):\n${names}\n${p.issFlavor()}` });
    }, p.errorLine());
  });

  app.command("/skl-launch", async ({ ack, respond }) => {
    await ack();
    await safeRespond(respond, async () => {
      const launch = await launchLibrary.getNextLaunch();
      if (!launch) {
        await respond({ text: "No upcoming launches on record. Quiet week." });
        return;
      }
      await respond({ 
        text: `Next launch: *${launch.name}*\nProvider: ${launch.provider || "unknown"}\nSite: ${launch.location || "unspecified"}\nT-minus: ${countdown(launch.net)}\n${p.launchFlavor()}`
      });
    }, p.errorLine());
  });

  app.command("/skl-apod", async ({ ack, respond }) => {
    await ack();
    await safeRespond(respond, async () => {
      const { title, date, url } = await nasa.getApod();
      await respond({ 
        text: `*${title}* (${date})\n<${url}>\n${p.apodFlavor()}`,
        unfurl_links: true,
        unfurl_media: true
      });
    }, p.errorLine());
  });

  app.command("/skl-mars", async ({ ack, respond }) => {
    await ack();
    await safeRespond(respond, async () => {
      const photo = await nasa.getRandomMarsPhoto();
      if (!photo) {
        await respond({ text: "No photo on file for that sol. Try again." });
        return;
      }
      await respond({ text: `🔴 Curiosity, sol ${photo.sol} (${photo.camera.full_name})\n${photo.img_src}\n${p.marsFlavor()}` });
    }, p.errorLine());
  });

  app.command("/skl-log", async ({ command, ack, respond }) => {
    await ack();
    const entry = command.text.trim();
    if (!entry) {
      await respond({ text: 'Log needs content. "/skl-log fixed the deploy at 2am" - that sort of thing!' });
      return;
    }
    db.addLog(command.channel_id, command.user_id, entry);
    await respond({ text: p.logAckLine() });
  });

  app.command("/skl-logs", async ({ command, ack, respond }) => {
    await ack();
    const logs = db.getRecentLogs(command.channel_id, 5);
    if (!logs.length) {
      await respond({ text: "No entries yet. Clean slate." });
      return;
    }
    const text = logs.map(l => `• <@${l.user_id}>: ${l.entry} _(${l.created_at})_`).join("\n");
    await respond({ text: `*Recent mission log:*\n${text}` });
  });

  app.command("/skl-callsign", async ({ command, ack, respond }) => {
    await ack();
    const callsign = command.text.trim();
    if (!callsign) {
      const current = db.getCallsign(command.user_id);
      await respond({ text: current ? `Your callsign is "${current}"` : 'No callsign on file, "/skl-callsign Falcon" to set one.' });
      return;
    }
    db.setCallsign(command.user_id, callsign);
    await respond({ text: `Callsign set: "${callsign}"! Copy that.` });
  });

  app.command("/skl-help", async ({ ack, respond }) => {
    await ack();
    await respond({ text: HELP_MESSAGE });
  });

  app.command("/skl-setup", async ({ command, ack, respond }) => {
    await ack();
    // command.channel_id is the channel where the user typed the command
    db.setAnnounceChannel(command.channel_id, command.team_id);
    await respond({ text: "Scheduled posts (APOD/Launches) are now bound to this channel. 📡" });
  });

  app.command("/skl-unset", async ({ command, ack, respond }) => {
    await ack();
    db.removeAnnounceChannel(command.channel_id);
    await respond({ text: "Removed this channel from the daily schedule. No more pings here." });
  });
}

module.exports = registerCommands;