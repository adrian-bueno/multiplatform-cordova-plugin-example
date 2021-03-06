import Foundation
import Alamofire


@objc(CordovaPluginExample) class CordovaPluginExample : CDVPlugin {

  var callbackHelper: CallbackHelper?

  func log(_ message: String) {
    NSLog("[CordovaPluginExample] %@", message)
  }

  // This method will be called on Cordova initialization.
  // Use it to initialize everything you may need later.
  // In this example, we will initialize our CallbackHelper class.
  override func pluginInitialize() {
    log("Initializing Cordova plugin example");
    super.pluginInitialize()
    callbackHelper = CallbackHelper(self.commandDelegate!)
  }

  // This is our simplest example.
  // Returns the string "Hello {name}!"
  // or "Hello!" if a name is not received.
  @objc(greeting:) func greeting(command: CDVInvokedUrlCommand) {
    let name = command.arguments[0] as? String ?? ""
    let greeting = name.isEmpty ? "Hello!" : "Hello \(name)"
    callbackHelper!.sendString(command, greeting)
  }

  // Returns a number every second, from "seconds" parameter value to 0.
  //
  // With this example we will see how can we return
  // multiple values over time, like an Observable.
  //
  // To return multiple values and keep the "connection"
  // open, just set the parameter "keepCallback" of
  // CallbackHelper methods to true
  @objc(countdownTimer:) func countdownTimer(command: CDVInvokedUrlCommand) {
    let seconds = command.arguments[0] as? Int ?? 10
    var secondsLeft = seconds > 0 ? seconds : 10
    let timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { (timer) in
      let keepCallback = secondsLeft > 0
      self.callbackHelper!.sendNumber(command, secondsLeft, keepCallback)
      if (keepCallback) {
        secondsLeft -= 1
      } else {
        timer.invalidate()
      }
    }
    timer.fire()
  }

  // With this method we can create and write
  // a file in our app's Documents directory.
  @objc(writeFile:) func writeFile(command: CDVInvokedUrlCommand) {
    let fileName = command.arguments[0] as? String;
    let text = command.arguments[1] as? String;

    if (fileName == nil || text == nil) {
      callbackHelper!.sendError(command, "BAD_ARGS")
      return
    }

    do {
      let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
      let fileUrl = documentsDirectory.appendingPathComponent(fileName!)
      log("Writing file at path: " + fileUrl.absoluteString)
      try text!.write(to: fileUrl, atomically: false, encoding: .utf8)
      callbackHelper!.sendEmpty(command)
    } catch {
      print(error)
      callbackHelper!.sendError(command, "COULD_NOT_CREATE_FILE")
    }
  }

  // This example is just to show how can we use
  // the external dependencies we declared previously,
  // in this case, Alomofire
  @objc(bitcoinCurrentPrice:) func bitcoinCurrentPrice(command: CDVInvokedUrlCommand) {
    let url = "https://api.coindesk.com/v1/bpi/currentprice.json"
    AF.request(url).responseString { response in
      switch response.result {
      case .success:
        let json = (try? JSONSerialization.jsonObject(with: response.data!, options: [])) as? [String:AnyObject]
        self.callbackHelper!.sendJson(command, json)
      case let .failure(error):
        print(error)
        self.callbackHelper!.sendError(command, "REQUEST_ERROR")
      }
    }
  }

}

