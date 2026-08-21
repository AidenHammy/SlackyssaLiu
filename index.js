require('dotenv').config();
const {App} = require("@slack/bolt");
const registerCommands = require('./commands');
const registerScheduler = require('./scheduler');
const p = require('./personality');

const requiredEnvVars = ['SLACK_BOT_TOKEN', 'SLACK_APP_TOKEN'];
for(const key of requiredEnvVars){
  if(!process.env[key]) throw new Error(`Missing required env var: ${key}`);
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

registerCommands(app);
registerScheduler(app);

(async () => {
  await app.start();
  console.log("SlackyssaLiu is running!");
  console.log(p.bootLine());
})();