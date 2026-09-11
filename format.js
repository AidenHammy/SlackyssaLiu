function countdown(targetIso) {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) return "any moment now";

  const totalMins = Math.floor(diff / 60000);
  const days = Math.floor(totalMins / 1440),
        hours = Math.floor((totalMins % 1440) / 60),
        mins = totalMins % 60;

  return [days ? `${days}d` : null, hours ? `${hours}h` : null, `${mins}m`]
    .filter(Boolean)
    .join(" ");
}

async function safeRespond(respond, fn, errorLine) {
  try {
    await fn();
  } catch {
    console.error("Respond failed");
    await respond({ text: errorLine });
  }
}

module.exports = { countdown, safeRespond };