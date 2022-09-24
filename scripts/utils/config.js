const path = require("path");
const appPath = path.resolve(__dirname, "../../");
const distPath = path.join(appPath, "dist");
const srcPath = path.join(appPath, "src");
const webpackConfig = path.join(appPath, "webpack.config.js");

module.exports = {
    appPath,
    distPath,
    srcPath,
    webpackConfig,
}