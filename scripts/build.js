const { spawn } = require("child_process");
const chalk = require("chalk");
const { webpackConfig } = require("./utils/config");
const process = require("process");
require("dotenv").config();

const webpackArguments = [`--config ${webpackConfig}`];

if (process.env.debug === "true") {
  webpackArguments.push("--mode development");
} else {
  webpackArguments.push("--mode production");
}
console.log(chalk.white("building .... 👇🏻"));
spawn("webpack", webpackArguments, { shell: true })
  .stdout.on("data", (e) => {
    console.log(e.toString("utf8"));
    console.log("----------------------------");
  })
  .on("end", () => {
    console.log(chalk.green("congratulation! 🎉"));
  })
  .on("error", (e) => {
    console.log(chalk.red(e));
  });
