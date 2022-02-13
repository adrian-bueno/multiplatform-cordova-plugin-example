function greeting(name) {
  function success(response) {
    console.log(response);
  }
  function error(code) {
    console.error(code);
  }
  cordova.plugins.CordovaPluginExample.greeting(success, error, name);
}

function greeting2(name) {
  return new Promise((resolve, reject) => {
    cordova.plugins.CordovaPluginExample.greeting(
      resolve,
      (code) => reject(new Error(code)),
      name
    );
  });
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

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    greeting("Adrián");

    greeting2("Adrián2")
      .then(res => console.log(res))
      .catch(error => console.error(error));

    greeting2()
      .then(res => console.log(res))
      .catch(error => console.error(error));

    bitcoinCurrentPrice()
      .then((res) => console.log(res))
      .catch((error) => console.error(error));

    setTimeout(() => countdownTimer(12), 5000);

    writeFile("cordova-plugin-example.txt", "Hello there 👋")
      .then((res) => console.log("File written"))
      .catch((error) => console.error(error));
}


document.addEventListener("deviceready", onDeviceReady, false);
