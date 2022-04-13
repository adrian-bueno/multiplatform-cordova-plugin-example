import Foundation


class CallbackHelper {

  let commandDelegate: CDVCommandDelegate

  // We need the CDVCommandDelegate from the main class
  init(_ commandDelegate: CDVCommandDelegate) {
    self.commandDelegate = commandDelegate
  }

  // This is the main method of this helper class.
  // It receives as parameters the received command,
  // the pluginResult we want to return, and the
  // keepCallback option.
  // By setting setKeepCallbackAs(true) we can
  // return multiple values over time for the same command.
  // Use setKeepCallbackAs(false) if you don't
  // want to return more values.
  private func send(_ command: CDVInvokedUrlCommand, _ pluginResult: CDVPluginResult, _ keepCallback: Bool = false) {
    pluginResult.setKeepCallbackAs(keepCallback)
    self.commandDelegate.send(
      pluginResult,
      callbackId: command.callbackId
    )
  }

  // Returns an error result with a message
  func sendError(_ command: CDVInvokedUrlCommand, _ message: String) {
    let pluginResult = CDVPluginResult(
      status: CDVCommandStatus_ERROR,
      messageAs: message
    )
    self.send(command, pluginResult!)
  }

  // Returns an OK response with no value
  func sendEmpty(_ command: CDVInvokedUrlCommand, _ keepCallback: Bool = false) {
    let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK)
    self.send(command, pluginResult!, keepCallback)
  }

  // Returns an OK response with a string value
  func sendString(_ command: CDVInvokedUrlCommand, _ string: String, _ keepCallback: Bool = false) {
    let pluginResult = CDVPluginResult(
      status: CDVCommandStatus_OK,
      messageAs: string
    )
    self.send(command, pluginResult!, keepCallback)
  }

  // Returns an OK response with a number value
  func sendNumber(_ command: CDVInvokedUrlCommand, _ number: Int, _ keepCallback: Bool = false) {
    let pluginResult = CDVPluginResult(
      status: CDVCommandStatus_OK,
      messageAs: number
    )
    self.send(command, pluginResult!, keepCallback)
  }

  // Returns an OK response with a JSON object
  func sendJson(_ command: CDVInvokedUrlCommand, _ json: [String:AnyObject]?, _ keepCallback: Bool = false) {
    let pluginResult = CDVPluginResult(
      status: CDVCommandStatus_OK,
      messageAs: json
    )
    self.send(command, pluginResult!, keepCallback)
  }

}
