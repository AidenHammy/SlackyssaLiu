# SlackyssaLiu

> **[Add to Slack (Demo)](https://slack.com/oauth/v2/authorize?client_id=2210535565.11305028366354&scope=files:write,chat:write,commands&user_scope=)**

SlackyssaLiu started as a basic cat-facts script and kind of spiraled from there. Now it's a space-obsessed Slack bot that tracks the ISS, posts daily satellite imagery and keeps a log of channel activity.

It runs entirely via Slack Socket Mode, meaning there's no public HTTP endpoint or webhook tunneling required. It also uses SQLite to remember channel-specific mission logs, custom user callsigns and which channels want daily scheduled posts.

## Screenshots

### APOD Image Embed 

![APOD Image Embed](APOD.png?raw=true)

### ISS Tracking 

![ISS Tracking](ISS.png?raw=true)

### EPIC Earth Photo 

![EPIC Earth Photo](EPIC.png?raw=true)

## Commands

Once added to your workspace, use `/invite @SlackyssaLiu` in the channel where you want to use it.

|      **Command**       |                   **Description**                     |
| ---------------------- | ----------------------------------------------------- |
| `/skl-ping`            | Health check                                          |
| `/skl-help`            | List all commands                                     |
| `/skl-iss`             | Current ISS location                                  |
| `/skl-crew`            | Current astronauts in space                           |
| `/skl-launch`          | Next rocket launch + countdown                        |
| `/skl-apod`            | NASA Astronomy Picture of the Day (natively embedded) |
| `/skl-earth`           | Recent photo of Earth from the EPIC satellite         |
| `/skl-log [text]`      | Add an entry to the mission log                       |
| `/skl-logs`            | View recent mission log entries                       |
| `/skl-callsign [name]` | Set your user callsign                                |
| `/skl-setup`           | Bind daily scheduled posts to this channel            |
| `/skl-unset`           | Stop scheduled posts in this channel                  |

## Required Permissions

This bot requires the following Bot Token Scopes to function. It does not ask for admin or read permissions:

- `commands` — to listen for slash commands
- `chat:write` — to respond and post scheduled messages
- `files:write` — to upload NASA APOD video files directly to Slack

## Tech Stack

- **Node.js**
- **Slack Bolt Framework** (Socket Mode)
- **Axios** (API requests)
- **better-sqlite3** (local database for logs, callsigns and channel routing)
- **node-cron** (scheduled tasks)

## Notes / Gotchas

- **ISS & Crew APIs:** The primary Open Notify API is community-run and occasionally goes offline. If it fails or returns non-JSON, the bot automatically falls back to `wheretheiss.at` and `howmanypeopleareinspacerightnow.com` with a 5-second timeout.
- **Launch Library 2:** The `/skl-launch` command requires a specific header (`Authorization: "Discord"`) to hit the free tier API. If it silently fails, double-check that header in `services/launchLibrary.js`.
- **Video Limits:** When NASA's APOD is a raw `.mp4` file, the bot downloads and streams it directly to Slack using `filesUploadV2` to prevent memory limits on smaller hosting plans. YouTube videos are rendered using Slack's native video block.
- **Timezones:** Cron jobs run on server time. You may need to adjust the schedule in `scheduler.js` depending on your server's timezone.

## Acknowledgements

Started from Stardance's mission guide then heavily customized from there.