const exec = require('cordova/exec');

const PLUGIN_NAME = 'CordovaPluginExample';

// Returns the string "Hello {name}!"
exports.greeting = function (successCallback, errorCallback, name) {
  exec(successCallback, errorCallback, PLUGIN_NAME, 'greeting', [name]);
};

// Returns a number every second, from "seconds" parameter value to 0.
exports.countdownTimer = function (successCallback, errorCallback, seconds) {
  exec(successCallback, errorCallback, PLUGIN_NAME, 'countdownTimer', [seconds]);
};

// Writes a file in user's root directory
exports.writeFile = function (successCallback, errorCallback, fileName, text) {
  exec(successCallback, errorCallback, PLUGIN_NAME, 'writeFile', [fileName, text]);
};

// Returns current Bitcoin price
exports.bitcoinCurrentPrice = function (successCallback, errorCallback) {
  exec(successCallback, errorCallback, PLUGIN_NAME, 'bitcoinCurrentPrice', []);
};
