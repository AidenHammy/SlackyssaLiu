// personality.js

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const bootLines = [
  "SlackyssaLiu online. Humor setting: 75%",
  "Systems nominal. Sarcasm calibrated.",
  "SlackyssaLiu reporting in. Try not to need me too often.",
];

const pingLines = [
  "Still here. Unfortunately for both of us.",
  "Reading you loud and clear.",
  "Latency's fine. My patience is a separate metric.",
];

const issFlavor = [
  "Six people are up there doing your job but in zero gravity.",
  "No commute, no traffic, no ground beneath them. Living the dream.",
  "Currently moving at 17,500 mph. Still slower than your Monday.",
];

const launchFlavor = [
  "Try not to blink.",
  "Assuming the weather holds. It rarely does.",
  "Front row seats not included.",
];

const apodFlavor = [
  "The universe, doing its one job well.",
  "No filter required. Space doesn't need Instagram.",
  "Free of charge. Rare, for something this good.",
];

const marsFlavor = [
  "A robot took this. It did not complain once.",
  "Beats your last vacation photos.",
  "Mars: red, dusty, still no Wi-Fi.",
];

const errorLines = [
  "Something failed out there. Not my fault. Probably.",
  "Signal lost. Standard procedure: blame the network.",
  "That didn't work. Filing it under 'space is hard.'",
];

const logAckLines = [
  "Logged. History will remember this, briefly.",
  "Entry recorded. Riveting stuff.",
  "Noted for the record, such as it is.",
];

module.exports = {
  bootLine: () => pick(bootLines),
  pingLine: () => pick(pingLines),
  issFlavor: () => pick(issFlavor),
  launchFlavor: () => pick(launchFlavor),
  apodFlavor: () => pick(apodFlavor),
  marsFlavor: () => pick(marsFlavor),
  errorLine: () => pick(errorLines),
  logAckLine: () => pick(logAckLines),
};