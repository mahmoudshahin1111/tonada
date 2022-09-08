const path = require("path");
const fs = require("fs");
const { execSync, exec, spawn } = require("child_process");
const chalk = require("chalk");
const { srcPath, distPath, webpackConfig } = require("./utils/config");
let lastChangeTimeout;
execSync("npm run build");
fs.watch(path.join(srcPath, "scss"), (changeType, fileName) => {
  if (lastChangeTimeout) return;
  lastChangeTimeout = setTimeout(() => {
    const absSrcPath = path.join(srcPath, "scss", fileName);
    const absDistPath = path.join(
      distPath,
      "css",
      fileName.replace("scss", "css")
    );
    exec(`sass --no-source-map  ${absSrcPath} ${absDistPath}`).stdout.on('data',(data=>{
      console.log(data.toString('utf8'));
    }))
    console.log(chalk.green(`${absSrcPath} ${changeType}`));
    console.log("----------------------------");
    lastChangeTimeout = null;
  }, 1000);
});
spawn(
  `webpack`,
  ["--watch", "--mode development", `--config ${webpackConfig}`],
  { shell: true }
).stdout.on("data", (e) => {
  console.log(e.toString("utf8"));
  console.log("----------------------------");
});
console.log(chalk.green("watching 🧐 ..."));
