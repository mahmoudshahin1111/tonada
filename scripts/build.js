const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const chalk = require("chalk");
const appPath = path.resolve(__dirname, "../");
const distPath = path.join(appPath, "dist");
const srcPath = path.join(appPath, "src");
const webpackConfig = path.join(appPath, "webpack.config.prod.js");
console.log(chalk.white("cleaning ..."));
const isExists = fs.existsSync(distPath);
if (isExists) {
  fs.rmSync(distPath, {recursive:true});
}
fs.mkdirSync(distPath, { recursive: true });
console.log(chalk.white("building .... 👇🏻"));
fs.readdirSync(path.join(srcPath, "scss"))
  .filter((file) => {
    return file.charAt(0) !== "_";
  })
  .forEach((fileName) => {
    const absSrcPath = path.join(srcPath, "scss", fileName);
    const absDistPath = path.join(
      distPath,
      "css",
      fileName.replace("scss", "css")
    );
    execSync(`sass --no-source-map ${absSrcPath} ${absDistPath}`);
    console.log(
      chalk.green(`${fileName} to ${fileName.replace("scss", "css")} builded`)
    );
  });
console.log(chalk.white("build javascript 👇🏻"));
execSync(`webpack --config ${path.join(webpackConfig)}`);
console.log(chalk.green("congratulation! 🎉"));
