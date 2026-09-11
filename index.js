require('dotenv').config();
const { App } = require("@slack/bolt"),
      registerCommands = require('./commands'),
      registerScheduler = require('./scheduler'),
      p = require('./personality');

if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_APP_TOKEN) {
  throw new Error("Missing Slack tokens in .env");
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

registerCommands(app);
registerScheduler(app);

(async() => {
  await app.start();
  console.log("SlackyssaLiu is running!");
  console.log(p.bootLine());
})();