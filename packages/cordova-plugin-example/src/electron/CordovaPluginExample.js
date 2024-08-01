const fs = require("fs");
const path = require("path");
const os = require("os");
const axios = require("axios").default;


// This is our simplest example.
// Returns the string "Hello {name}!"
// or "Hello!" if a name is not received.
function greeting(args) {
  const [name] = args;
  return name ? `Hello ${name}!` : "Hello!";
}

// Returns a number every second, from "seconds" parameter value to 0.
// NOT POSSIBLE TO IMPLEMENT IT WITH cordova-electron 3.0.0.
// cordova-electron 3.0.0 doesn't support the keepCallback
// functionality that is available in Android and iOS.
function countdownTimer(args) {
  // const [seconds] = args;
  throw "NOT_IMPLEMENTED";
}

// This feature is not official yet, use my fork:
// github:adrian-bueno/cordova-electron#feature/keep-callback
//
// Add the $ to the function name
// This functions now have 3 parameters:
// - success callback
// - error callback
// - args
//
// The callbacks have the following interfaces:
// - success(data: any, keepCallback: boolean): void
// - error(data: any): void
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

// Writes a file in the user's Documents folder.
function writeFile(args) {
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

// This example is just to show how can we use
// the external dependencies we declared previously,
// in this case, axios.
//
// Functions could also be async and return Promises.
async function bitcoinCurrentPrice() {
  try {
    const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
    return response.data;
  } catch (error) {
    console.error(error);
    throw "REQUEST_ERROR";
  }
}


// Export the funtions, use the same names
// declared in www/CordovaPluginExample.js
// (in the 'action' parameter, the 4th one)
//
// exports.writeFile = function (successCallback, errorCallback, fileName, text) {
//   exec(successCallback, errorCallback, PLUGIN_NAME, 'writeFile', [fileName, text]);
// };
module.exports = {
  greeting,
  countdownTimer,
  countdownTimer$,
  writeFile,
  bitcoinCurrentPrice,
};
