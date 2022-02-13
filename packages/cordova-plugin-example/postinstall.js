// if (process.platform != "darwin") {
//   return;
// }

// const path = require("path");
// const { spawn } = require("child_process");

// const cwd = path.join(__dirname, "../src/ios");
// const command = spawn("carthage", ["update", "--use-xcframeworks", "--platform", "ios"], { cwd });

// command.stdout.on("data", data => {
//   console.log(data);
// });

// command.stderr.on("data", data => {
//   console.error(`stderr: ${data}`);
// });

// command.on("error", (error) => {
//   console.error(`error: ${error.message}`);
// });

// command.on("close", code => {
//   console.log("Carthage dependencies installed");
// });
