const path = require("path");
const fs = require("fs");
const { execSync, exec, spawn } = require("child_process");
const chalk = require("chalk");
const sass = require("sass");
const { srcPath, distPath, webpackConfig } = require("./utils/config");
let lastChangeTimeout;
execSync("npm run build");
fs.watch(path.join(srcPath, "scss"), (changeType, fileName) => {
  if (lastChangeTimeout) return;
  lastChangeTimeout = setTimeout(() => {
    // if private file build all the dependant files otherwise build the file had changed only
    if (fileName.charAt(0) === "_") {
      const files = fs.readdirSync(path.join(srcPath, "scss"));
      files.forEach((file) => {
        if (file.charAt(0) === "_") return;
        compileStyleFile(file, changeType);
        console.log("----------------------------");
      });
    } else {
      compileStyleFile(fileName, changeType);

      console.log("----------------------------");
    }

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

function compileStyleFile(fileName, changeType) {
  const absSrcPath = path.join(srcPath, "scss", fileName);
  const absDistPath = path.join(
    distPath,
    "css",
    fileName.replace("scss", "css")
  );
  const result = sass.compile(absSrcPath, {
    sourceMap: false,
    style: "compressed",
  });
  fs.writeFileSync(absDistPath, result.css);
  console.log(chalk.green(`${absSrcPath} ${changeType}`));
}
