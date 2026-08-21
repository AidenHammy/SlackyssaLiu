function countdown(targetIso) {
  const diffMs = new Date(targetIso).getTime() - Date.now();
  if (diffMs <= 0) return "any moment now";

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  return parts.join(" ");
}

async function safeRespond(respond, fn, errorLine) {
  try {
    await fn();
  } catch (err) {
    console.error(err);
    await respond({ text: errorLine });
  }
}

module.exports = { countdown, safeRespond };