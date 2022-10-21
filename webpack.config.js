const path = require("path");
require("dotenv").config();
const process = require("process");
const fs = require("fs");
const _ = require("lodash");
const packageJson = require("./package.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


/**
 * Remove the files by pattern after the build
 */
class CleanUpAfterMiniPlugin {
  constructor(patterns) {
    this.patterns = patterns;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "MiniCssExtractPluginCleanup",
      (compilation, callback) => {
        Object.keys(compilation.assets)
          .filter((asset) => {
            let match = false,
              i = this.patterns.length;
            while (i--) {
              if (this.patterns[i].test(asset)) {
                match = true;
              }
            }
            return match;
          })
          .forEach((asset) => {
            delete compilation.assets[asset];
          });

        callback();
      }
    );
  }
}

const styleConfig = {
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanUpAfterMiniPlugin([/\.js(\.map)?$/i]),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".sass", ".css"],
  },
  entry: {},
  output: {
    path: path.resolve(__dirname, `dist/css`),
  },

};

fs.readdirSync(path.resolve(__dirname, "src", "scss"))
  .filter((fileName) => fileName.match(/^(?!_).*\.scss$/i))
  .forEach((fileName) => {
    styleConfig.entry[`${fileName.replace(".scss", "")}`] = path.resolve(
      __dirname,
      "src",
      "scss",
      fileName
    );
  });

const getPackagesNames = () => {
  const filesNames = fs
    .readdirSync(packageJson.workspaces.at(0).replace("*", ""))
    .filter((fileName) => fileName.charAt(0) !== "_");
  return filesNames;
};

const jsConfig = {
  ...(process.env.debug === "true" ? { devtool: "source-map" } : {}),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  entry: {
    index: {
      import: path.resolve(__dirname, "src", "index.ts"),
      dependOn: "shared",
      library: {
        name: "Tonada",
        type: "window",
      },
    },
    shared: ["lodash"],
  },
  optimization: {
    runtimeChunk: "single",
    chunkIds: "named",
  },
  output: {
    filename: (pathData) => {
      return `${_.lowerCase(pathData.chunk.name).replace(' ','-')}.js`;
    },
    path: path.resolve(__dirname, "dist", "js"),
    clean: true,
  },
};

getPackagesNames().forEach((packageName) => {
  jsConfig.entry[packageName] = {
    import: path.resolve(__dirname, "src", "packages", packageName, "index.ts"),
    dependOn: "shared",
    library: {
      name: ["Tonada", "[name]"],
      type: "window",
    },
  };
});

module.exports = [styleConfig, jsConfig];
