require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/skl-ping", async ({command, ack, respond}) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({text: `Pong!\nLatency: ${latency}ms`});
})

app.command("/skl-echo", async ({command, ack, respond}) => {
  await ack();
  await respond({text: `Echoing back: ${command.text}`});
});

app.command("/skl-joke", async ({command, ack, respond}) => {
  await ack();
  const jokeAPI = `https://official-joke-api.appspot.com.random_joke`;
  try {
    const res = await fetch(jokeAPI);
    const data = await res.json();
    await respond({text: `${data.setup}\n${data.punchline}`});
  }
  catch (error) {
    await respond({text: `Sorry, I couldn't fetch a joke at the moment.`});
  }
});

app.command("/skl-time", async ({command, ack, respond}) => {
  await ack();
  const currentTime = new Date().toLocaleTimeString();
  await respond({text: `The current time is: ${currentTime}`});
});

app.command("/skl-date", async ({command, ack, respond}) => {
  await ack();
  const currentDate = new Date().toLocaleDateString();
  await respond({text: `Today's date is: ${currentDate}`});
});

app.command("/skl-quote", async ({command, ack, respond}) => {
  await ack();
  const quoteAPI = `https://api.quotable.io/random`;
  try {
    const res = await fetch(quoteAPI);
    const data = await res.json();
    await respond({text: `Here's a random quote for you:\n"${data.content}" - ${data.author}`});
  }
  catch (error) {
    await respond({text: `Sorry, I couldn't fetch a quote at the moment.`});
  };
});

app.command("/skl-help", async ({ack, respond}) => {
  await ack();
  await respond({
    text: `Available commands:\n +
          /skl-ping - Check bot latency\n +
          /skl-echo [text] - Echo back the provided text\n +
          /skl-help - Show this help message\n +
          /skl-joke - Get a random joke\n +
          /skl-time - Get the current time\n +
          /skl-date - Get today's date\n +
          /skl-quote - Get a random inspirational quote`
  });
});

(async () => {
  await app.start();
  console.log("Bot is running!");
})();