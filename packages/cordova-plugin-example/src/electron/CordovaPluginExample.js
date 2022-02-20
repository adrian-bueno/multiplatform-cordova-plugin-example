const fs = require("fs");
const path = require("path");
const os = require("os");
const axios = require("axios").default;


function greeting([args]) {
  const [name] = args;
  return name ? `Hello ${name}!` : "Hello!";
}

function countdownTimer([args]) {
  // Not possible to implement it with cordova-electron 3.0.0
  // const [seconds] = args;
  throw "NOT_IMPLEMENTED";
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
  countdownTimer,
  writeFile,
  bitcoinCurrentPrice,
};
