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

app.command("/skl-echo", async ({ command, ack, respond }) => {
  await ack();
  await respond({ text: `Echoing back: ${command.text}`});
});

app.command("/skl-joke", async ({ command, ack, respond }) => {
  await ack();

  try{
    const res = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({ text: `${res.data.setup}\n${res.data.punchline}` });
  } catch (err) {
    await respond({ text: `Sorry, I couldn't fetch a joke at the moment` });
  }
});

app.command("/skl-time", async ({ command, ack, respond }) => {
  await ack();
  const currentTime = new Date().toLocaleTimeString();
  await respond({ text: `The current time is: ${currentTime}`});
});

app.command("/skl-date", async ({ command, ack, respond }) => {
  await ack();
  const currentDate = new Date().toLocaleDateString();
  await respond({ text: `The current date is: ${currentDate}`});
});

app.command("/skl-quote", async ({ command, ack, respond }) => {
  await ack();
  try {
    const res = await axios.get(`https://api.quotable.io/random`);
    await respond({ text: `Here's a random quote for you:\n"${res.data.content}" - ${res.data.author}`});
  } catch (err) {
    await respond({ text: `Sorry, I couldn't fetch a quote for you at the moment.`});
  }
});

app.command("/skl-achoo", async ({ command, ack, respond }) => {
  await ack();
  await respond({ text: `Achoo!`});
});

app.command("/skl-wave", async({ command, ack, respond }) => {
  await ack();
  await respond({ text: `o/`});
});

app.command("/skl-help", async ({ ack, respond }) => {
  await ack();
  const helpMessage = `
  Here are the commands you can use:\n +
  - /skl-ping: Check the bot's latency.\n +
  - /skl-help: Display this help message.\n +
  - /skl-catfact: Get a random cat fact.\n +
  - /skl-joke: Get a random fact.\n +
  - /skl-quote: Get a random quote!\n +
  - /skl-time: Fetch the current time\n +
  - /skl-date: Fetch today's date\n +
  - /skl-echo [text]: Echo back the provided text\n +
  - /skl-achoo: Make the bot sneeze\n + 
  - /skl-wave: Bot waves at you`

  await respond({ text: helpMessage });
});

(async() => {
  await app.start();
  console.log("Bot is running!");
})();