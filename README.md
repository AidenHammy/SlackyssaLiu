# SlackyssaLiu

*My first Slack bot started as a basic cat-facts script. It kind of spiraled from there. Now it tracks the ISS, posts space photos and keeps a log of channel activity.*

---

## Overview

SlackyssaLiu used to be a standard "cat facts and jokes" bot. After a redesign, it gained a personality and a weird fixation on space. It now pulls live data to tell you where the ISS is, when the next rocket launch is happening and posts NASA's Astronomy Picture of the Day every morning.

It also uses SQLite to remember things now—like channel-specific mission logs and custom user callsigns.

---

## Features

* Live Space Data:

  * Current ISS location
  * Who is currently in space
  * Next rocket launch + countdown
  * NASA's Picture of the Day (APOD)
  * Random Mars rover photos
* Channel Memory (SQLite):

  * Channel-specific mission logs
  * Custom user callsigns
* Automated Tasks (node-cron):

  * Drops the APOD in the channel every morning
  * Pings the channel an hour before a scheduled launch
* Other:
  * Real-time slash commands via Slack Socket Mode (no public URL needed)
  * Fails gracefully if an API rate limits or goes down

---

## Commands

| Command               | Description                          |
| --------------------- | ------------------------------------ |
| `/skl-ping`           | Health check                         |
| `/skl-help`           | List all commands                    |
| `/skl-iss`            | Current ISS location                 |
| `/skl-crew`           | 	Current astronauts in space        |
| `/skl-launch`         | Next rocket launch + countdown       |
| `/skl-apod`           | NASA Astronomy Picture of the Day    |
| `/skl-mars`           | Random Mars rover photo              |
| `/skl-log [text]`     | Add an entry to the mission log      |
| `/skl-logs`           | View recent mission log entries      |
| `/skl-callsign [name]`| Set your user callsign               |

---

## Tech Stack

* Node.js
* Slack Bolt Framework
* Axios (API requests)
* better-sqlite3 (local database)
* node-cron (scheduled tasks)

---

## Deployment

Runs via Socket Mode so you don't need to set up public endpoints or tunnels. Just run it on a small VPS and it will stay connected in the background.

---

## Notes

* Open Notify API: This is a community-run API for ISS/crew data and is occasionally down. If `/skl-iss` or `/skl-crew` fail, check open-notify.org before debugging your code.
* Database: The SQLite file generates automatically on first run.
* Timezones: Cron jobs run on server time. You may need to adjust the schedule in `scheduler.js` depending on your server's timezone.

---

## Acknowledgements

Started from Stardance's mission guide then heavily customized from there.