# SlackyssaLiu — A Bot That Went to Space

*Started as a lightweight Slack bot. Now it checks on the ISS more than I check my email.*

---

## Overview

SlackyssaLiu used to do catfacts and jokes like everybody else's first Slack bot. Then it got a redesign, a personality and a slight space obsession. Now it tells you where the ISS is, when the next rocket's going up and posts a picture of the universe every morning whether you asked or not.

It also remembers things now (mission logs, callsigns) which honestly feels like an upgrade nobody asked for but everybody needed.

---

## Features

* Real-time slash commands, same as before, just cooler now
* Live space data, no API key drama:

  * Where the ISS is right now
  * Who's currently off-planet
  * When the next rocket launch is (with a countdown, for the dramatic effect)
  * NASA's picture of the day
  * A random Mars photo, courtesy of a very hardworking rover
* Actually remembers stuff (SQLite, very fancy):

  * Mission logs per channel
  * Custom callsigns per user
* Shows up uninvited sometimes:

  * Posts APOD every morning automatically
  * Pings the channel when a launch is about an hour out
* A personality that's dry, online and self-aware without trying too hard
* Doesn't fall over when an API has a bad day

---

## Commands

| Command               | Description                          |
| --------------------- | ------------------------------------ |
| `/skl-ping`           | Check if it's still alive            |
| `/skl-help`           | Show everything it can do            |
| `/skl-iss`            | Where the ISS is right now           |
| `/skl-crew`           | Who's currently in space             |
| `/skl-launch`         | Next rocket launch + countdown       |
| `/skl-apod`           | NASA's picture of the day            |
| `/skl-mars`           | A random photo from Curiosity        |
| `/skl-log [text]`     | Add an entry to the mission log      |
| `/skl-logs`           | See recent mission log entries       |
| `/skl-callsign [name]`| Set your callsign                    |

---

## Tech Stack

* Node.js
* Slack Bolt Framework
* Axios (for talking to APIs)
* better-sqlite3 (for remembering things)
* node-cron (for showing up uninvited on a schedule)
* Socket Mode (real-time, no public URL needed)

---

## Deployment

Runs continuously via Socket Mode so no tunnels or public endpoints needed. Deploy it somewhere that stays on (a small VPS, a Pi, whatever's lying around) and it'll keep going!

---

## Notes / Things to Watch

* Open Notify (ISS + crew data) is a small community-run API and occasionally naps. If `/skl-iss` or `/skl-crew` start acting up, check open-notify.org before blaming your code.
* NASA's `DEMO_KEY` caps out at 30 requests/hour — get a free real key at api.nasa.gov if this thing's actually getting used.
* The SQLite file shows up on its own on first run so no setup needed!
* Cron jobs run in server time, adjust the schedule in `scheduler.js` if your team's not on that clock.

---

## Learning Outcomes

* Slack's event-driven architecture, up close
* Wrangling async operations without everything catching fire
* Stitching together a few external APIs that don't talk to each other
* Adding persistence and scheduled jobs to something that used to just sit there and wait

---

## Acknowledgements

Started from Stardance's mission guide then redesigned into whatever this is now blehhh