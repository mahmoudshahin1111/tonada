const path = require("path");
const { execSync, exec, spawn, spawnSync } = require("child_process");
const chalk = require("chalk");
const { webpackConfig, appPath } = require("./utils/config");
const process = require("process");
require("dotenv").config();

// execSync("npm run build");
const webpackArguments = ["--watch", `--config ${webpackConfig}`];
if (process.env.debug) {
  webpackArguments.push("--mode development");
}
execSync('npm i');
spawn(`webpack`, webpackArguments, { shell: true }).stdout.on("data", (e) => {
  console.log(e.toString("utf8"));
  console.log("----------------------------");
});
console.log(chalk.green("watching 🧐 ..."));

exec(`npx http-server ${path.join(appPath)} -o ./site`).stdout.on(
  "data",
  (data) => {
    console.log(data);
  }
);
