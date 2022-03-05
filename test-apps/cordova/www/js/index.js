function greeting(name) {
  function success(response) {
    console.log(response);
  }
  function error(code) {
    console.error(code);
  }
  cordova.plugins.CordovaPluginExample.greeting(success, error, name);
}

function bitcoinCurrentPrice() {
  return new Promise((resolve, reject) => {
    cordova.plugins.CordovaPluginExample.bitcoinCurrentPrice(resolve, reject);
  });
}

function writeFile(fileName, text) {
  return new Promise((resolve, reject) => {
    cordova.plugins.CordovaPluginExample.writeFile(resolve, reject, fileName, text);
  });
}

function countdownTimer(seconds) {
  function success(response) {
    console.log(response);
  }
  function error(code) {
    console.error(code);
  }
  cordova.plugins.CordovaPluginExample.countdownTimer(success, error, seconds);
}

function bindClick(elementId, callbackFunction) {
  document
    .getElementById(elementId)
    .addEventListener("click", callbackFunction);
}

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");

  bindClick("greeting", () => greeting("World"));
  bindClick("greeting-empty", () => greeting());

  bindClick("bitcoin", () => {
    bitcoinCurrentPrice()
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  });

  bindClick("countdown", () => countdownTimer(12));

  bindClick("write-file", () => {
    writeFile("cordova-plugin-example.txt", "Hello there 👋")
      .then((res) => console.log("File written"))
      .catch((error) => console.error(error));
  });
}


document.addEventListener("deviceready", onDeviceReady, false);
