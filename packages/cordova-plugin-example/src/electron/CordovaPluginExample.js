const fs = require("fs");
const path = require("path");
const os = require("os");
const axios = require("axios").default;


function greeting([args]) {
  const [name] = args;
  return name ? `Hello ${name}!` : "Hello!";
}

// function countdownTimer([args]) {
//   // Not possible to implement it with cordova-electron 3.0.0
//   // const [seconds] = args;
//   throw "NOT_IMPLEMENTED";
// }

// This feature is not oficial yet, use my fork:
// github:adrian-bueno/cordova-electron#feature/keep-callback
function countdownTimer$(success, error, args) {
  const [seconds] = args;

  let secondsLeft = seconds > 0 ? seconds : 10;

  function startTimeout() {
    const keepCallback = secondsLeft > 0;
    success(secondsLeft, keepCallback);
    if (keepCallback) {
      secondsLeft--;
      setTimeout(startTimeout, 1000);
    }
  }

  startTimeout();
}

function writeFile([args]) {
  const [fileName, text] = args;

  if (!fileName || !text) {
    throw "BAD_ARGS";
  }

  try {
    const dir = path.join(os.homedir(), "Documents");
    fs.mkdirSync(dir, { recursive: true });
    const filePath = path.join(dir, fileName);
    fs.writeFileSync(filePath, text);
  } catch (error) {
    console.error(error);
    throw "WRITE_ERROR"
  }
}

async function bitcoinCurrentPrice() {
  try {
    const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
    return response.data;
  } catch (error) {
    console.error(error);
    throw "REQUEST_ERROR";
  }
}


module.exports = {
  greeting,
  // countdownTimer,
  countdownTimer$,
  writeFile,
  bitcoinCurrentPrice,
};
