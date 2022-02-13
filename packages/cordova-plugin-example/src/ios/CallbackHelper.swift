import Foundation


class CallbackHelper {

    let commandDelegate: CDVCommandDelegate

    init(_ commandDelegate: CDVCommandDelegate) {
        self.commandDelegate = commandDelegate
    }

    private func send(_ command: CDVInvokedUrlCommand, _ pluginResult: CDVPluginResult, _ keepCallback: Bool = false) {
        pluginResult.setKeepCallbackAs(keepCallback)
        self.commandDelegate.send(
            pluginResult,
            callbackId: command.callbackId
        )
    }

    func sendError(_ command: CDVInvokedUrlCommand, _ message: String) {
        let pluginResult = CDVPluginResult(
            status: CDVCommandStatus_ERROR,
            messageAs: message
        )
        self.send(command, pluginResult!)
    }

    func sendEmpty(_ command: CDVInvokedUrlCommand, _ keepCallback: Bool = false) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK)
        self.send(command, pluginResult!, keepCallback)
    }

    func sendString(_ command: CDVInvokedUrlCommand, _ string: String, _ keepCallback: Bool = false) {
        let pluginResult = CDVPluginResult(
            status: CDVCommandStatus_OK,
            messageAs: string
        )
        self.send(command, pluginResult!, keepCallback)
    }

    func sendNumber(_ command: CDVInvokedUrlCommand, _ number: Int, _ keepCallback: Bool = false) {
        let pluginResult = CDVPluginResult(
            status: CDVCommandStatus_OK,
            messageAs: number
        )
        self.send(command, pluginResult!, keepCallback)
    }

    func sendJson(_ command: CDVInvokedUrlCommand, _ json: [String:AnyObject]?, _ keepCallback: Bool = false) {
        let pluginResult = CDVPluginResult(
            status: CDVCommandStatus_OK,
            messageAs: json
        )
        self.send(command, pluginResult!, keepCallback)
    }

}
