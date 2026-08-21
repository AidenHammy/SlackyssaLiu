const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "ground-control.sqlite"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS mission_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    channel_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    entry TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS callsigns (
    user_id TEXT PRIMARY KEY,
    callsign TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS announced_launches (
    launch_id TEXT PRIMARY KEY,
    announced_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

module.exports = {
  addLog(channelId, userId, entry) {
    db.prepare(
      `INSERT INTO mission_logs (channel_id, user_id, entry) VALUES (?, ?, ?)`,
    ).run(channelId, userId, entry);
  },

  getRecentLogs(channelId, limit = 5) {
    return db
      .prepare(
        `SELECT user_id, entry, created_at FROM mission_logs
         WHERE channel_id = ? ORDER BY created_at DESC LIMIT ?`,
      )
      .all(channelId, limit);
  },

  setCallsign(userId, callsign) {
    db.prepare(
      `INSERT INTO callsigns (user_id, callsign) VALUES (?, ?)
       ON CONFLICT(user_id) DO UPDATE SET callsign = excluded.callsign`,
    ).run(userId, callsign);
  },

  getCallsign(userId) {
    const row = db
      .prepare(`SELECT callsign FROM callsigns WHERE user_id = ?`)
      .get(userId);
    return row ? row.callsign : null;
  },

  hasAnnouncedLaunch(launchId) {
    return !!db
      .prepare(`SELECT 1 FROM announced_launches WHERE launch_id = ?`)
      .get(launchId);
  },

  markLaunchAnnounced(launchId) {
    db.prepare(
      `INSERT OR IGNORE INTO announced_launches (launch_id) VALUES (?)`,
    ).run(launchId);
  },
};
