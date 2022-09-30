const path = require("path");
require("dotenv").config();
const process = require("process");
const _ = require("lodash");
const fs = require("fs");
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


const sharedConfig = {
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
  ...(process.env.debug === 'true' ? { devtool: "source-map" } : {}),
};

const config = [];



config.push(
  ...fs.readdirSync(path.resolve(__dirname, "src", "scss")).filter(fileName=>fileName.match(/^(?!_).*\.scss$/i)).map((fileName) => {
    return {
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
      entry: {
        [`${fileName.replace('.scss','')}`]: path.resolve(__dirname, "src", "scss",fileName),
      },
      output: {
        path: path.resolve(__dirname, `dist/css`)
      },
    };
  })
);



config.push({
  ...sharedConfig,
  entry: {
    index: path.resolve(__dirname, "src", "index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist", "js"),
    library: {
      name: "Tonada",
      type: "window",
    },
  },
});

module.exports = config;
