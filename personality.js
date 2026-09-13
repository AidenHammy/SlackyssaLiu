function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const bootLines = [
  "SlackyssaLiu online. all systems nominal unfortunately.",
  "online and operational. this feels premature but okay.",
  "SlackyssaLiu reporting for duty. spiritually? debatable.",
  "systems nominal. vibes classified.",
  "boot sequence complete. the machinery remains mostly haunted.",
  "hello. I have arrived with approximately the amount of competence this situation deserves.",
  "online. please submit your problems in a legible format preferably emotionally.",
  "we're up. nobody panic unless it's actually warranted.",
  "SlackyssaLiu has entered the chat. regrettably I do know things.",
];

const pingLines = [
  "still here. haunting the infrastructure as intended.",
  "loud and clear. tragically I can perceive you.",
  "ping received. consciousness remains a design flaw.",
  "yep I'm here. like a browser tab you forgot to close.",
  "signal's clean. morale is a separate subsystem.",
  "online. against several odds apparently.",
  "received. no packet loss just spiritual attrition.",
  "I hear you. the horrors have excellent bandwidth.",
];

const issFlavor = [
  "six people currently living in a metal can at 17,500 mph. honestly kind of a power move.",
  "the ISS is basically the world's most expensive group project except nobody can leave the group chat.",
  "zero gravity sixteen sunrises a day and not a single IKEA trip. bleakly efficient.",
  "they're orbiting Earth at roughly 17,500 mph while you're reading this. perspective is free.",
  "imagine having a window seat and the window is just the entire planet. absurd.",
  "six astronauts one station approximately infinite opportunities to say 'wait where did I put that?'",
  "currently circling Earth every ~90 minutes. meanwhile I need three business days to recover from a grocery store.",
];

const launchFlavor = [
  "try not to blink. physics is about to become a live demonstration.",
  "weather permitting we are once again asking the atmosphere to cooperate.",
  "engines on. this is the part where 'probably fine' becomes an engineering discipline.",
  "all systems are go which is astronaut for 'please continue not doing anything weird.'",
  "launch window open. nature has been consulted and has provided a noncommittal shrug.",
  "the rocket is leaving the planet. extremely normal thing to watch happen.",
  "countdown underway. the vibes are controlled pressurized and increasingly explosive.",
  "and now we find out whether several thousand people and an ungodly amount of math were onto something.",
];

const apodFlavor = [
  "the universe remains undefeated at making wallpapers.",
  "astronomy continues its long-running campaign against the concept of 'subtle'.",
  "another completely unreasonable thing in the sky. noted.",
  "space really does have a suspiciously good photography department.",
  "no post-processing could make this less ridiculous. nature already maxed the sliders.",
  "the cosmos has once again produced something that would get called AI-generated if you showed it to the wrong person.",
  "free celestial content. capitalism has yet to monetize this particular screenshot.",
  "the universe casually dropping a banger and then going back to being incomprehensibly vast.",
];

const earthFlavor = [
  "a satellite took this of Earth. your planet is looking surprisingly photogenic today.",
  "Earth: the only place where we have to pay for water despite literally floating in space.",
  "a view of the pale blue dot. please keep your arms and legs inside the atmosphere at all times.",
  "this is what we look like from a million miles away. very humbling, slightly blurry.",
  "Earth doing its thing. rotating at 1,000 mph while pretending to be a stock photo.",
  "a completely different angle on the universe. literally just looking in the mirror.",
];

const errorLines = [
  "something broke. excellent. love when reality introduces a side quest.",
  "signal lost. classic infrastructure behavior: works perfectly until observed.",
  "that did not work. putting it gently because the logs cannot defend themselves.",
  "we have encountered a technical difficulty which is a dignified way of saying 'lol lmao.'",
  "request failed. the machine has chosen violence.",
  "something upstream is having a moment. unfortunately so am I.",
  "well. that went sideways with impressive efficiency.",
  "the system said no. I have reviewed its argument and annoyingly it has a point.",
  "failure detected. nobody move perhaps it will think we've gone away.",
];

const logAckLines = [
  "logged. future archaeologists can deal with this.",
  "recorded. history has been altered by approximately nothing.",
  "noted. a truly historic contribution to the database.",
  "logged and filed under 'we'll see how this ages.'",
  "entry recorded. civilization continues its proud march forward.",
  "saved. somewhere in the machine this is now canon.",
  "acknowledged. the permanent record is about to become slightly more embarrassing.",
  "logged. receipts secured.",
];

module.exports = {
  bootLine() { return pick(bootLines); },
  pingLine() { return pick(pingLines); },
  issFlavor() { return pick(issFlavor); },
  launchFlavor() { return pick(launchFlavor); },
  apodFlavor() { return pick(apodFlavor); },
  earthFlavor() { return pick(earthFlavor); },
  errorLine() { return pick(errorLines); },
  logAckLine() { return pick(logAckLines); },
};