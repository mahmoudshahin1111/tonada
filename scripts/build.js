const path = require("path");
const fs = require("fs");
const { execSync, spawnSync, spawn } = require("child_process");
const chalk = require("chalk");
const appPath = path.resolve(__dirname, "../");
const distPath = path.join(appPath, "dist");
const webpackConfig = path.join(appPath, "webpack.config.js");
const process = require("process");
require("dotenv").config();

execSync("npm run build");
const webpackArguments = [`--config ${webpackConfig}`];
if (process.env.debug) {
  webpackArguments.push("--mode development");
}
console.log(chalk.white("cleaning ..."));
const isExists = fs.existsSync(distPath);
if (isExists) {
  fs.rmSync(distPath, { recursive: true });
}
fs.mkdirSync(distPath, { recursive: true });
console.log(chalk.white("building .... 👇🏻"));
spawn("webpack", webpackArguments).stdout.on("data", (e) => {
  console.log(e.toString("utf8"));
  console.log("----------------------------");
});
console.log(chalk.green("congratulation! 🎉"));
