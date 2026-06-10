# SlackyssaLiu — Lightweight Slack Assistant

*A simple, real-time Slack bot built for interaction, utility, and automation.*

---

## Overview

SlackyssaLiu is a Slack bot built using Node.js and the Bolt framework that responds to slash commands in real time. It is designed to provide useful utilities, fun interactions, and seamless command handling inside a Slack workspace.

The bot is deployed and runs continuously, allowing it to respond instantly without requiring a local environment.

---

## Features

* Real-time slash command handling
* Lightweight and responsive design
* External API integrations:

  * Cat facts
  * Jokes
  * Quotes
* Utility commands:

  * Time and date
  * Echo functionality
* Error handling for API failures
* Runs 24/7 in a live environment

---

## Commands

| Command            | Description           |
| ------------------ | --------------------- |
| `/skl-ping`        | Check bot latency     |
| `/skl-help`        | Display all commands  |
| `/skl-catfact`     | Get a random cat fact |
| `/skl-joke`        | Get a random joke     |
| `/skl-quote`       | Get a random quote    |
| `/skl-time`        | Get current time      |
| `/skl-date`        | Get today’s date      |
| `/skl-echo [text]` | Echo your message     |
| `/skl-achoo`       | Make the bot sneeze   |
| `/skl-wave`        | Bot waves             |

---

## Tech Stack

* Node.js
* Slack Bolt Framework
* Axios (for API requests)
* Socket Mode (real-time communication)

---

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add:

```
SLACK_BOT_TOKEN=your_token
SLACK_APP_TOKEN=your_app_token
```

4. Run the bot:

```bash
node index.js
```

---

## Deployment

The bot is deployed and runs continuously 24/7, enabling real-time interaction within a Slack workspace.

---

## Learning Outcomes

* Understanding Slack’s event-driven architecture
* Handling async operations in real-time systems
* Integrating external APIs
* Building and deploying a persistent backend service

---

## Acknowledgements

Built by following Stardance’s mission guide and extended with custom features and integrations.
