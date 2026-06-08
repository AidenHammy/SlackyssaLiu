require("dotenv").config();
const axios = require("axios");

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/skl-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/skl-catfact", async ({ command, ack, respond }) => {
  await ack();

  try{
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: `Sorry, I couldn't fetch a cat fact at the moment.` });
  }
});

app.command("/skl-joke", async ({ command, ack, respond }) => {
  await ack();

  try{
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({ text: `${response.data.setup}\n${response.data.punchline}` });
  } catch (err) {
    await respond({ text: `Sorry, I couldn't fetch a joke at the moment` });
  }
});

app.command("/skl-help", async ({ ack, respond }) => {
  await ack();
  const helpMessage = `
  Here are the commands you can use:
  - /skl-ping: Check the bot's latency.
  - /skl-help: Display this help message.
  - /skl-catfact: Get a random cat fact.
  - /skl-joke: Get a random fact.`

  await respond({ text: helpMessage });
});

(async() => {
  await app.start();
  console.log("Bot is running!");
})();