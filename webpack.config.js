const path = require("path");
const package = require("./package.json");
require("dotenv").config();
const process = require("process");
const _ = require("lodash");

const resolvePackInfoFromName = (name) => {
  const nameSlices = String(name)
    .split("-")
    .map((nameSlice) => _.capitalize(nameSlice));
  return [_.capitalize(package.name), ...nameSlices].join("");
};

const sharedConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "sass-loader",
            options: {
              includePaths: ["src/scss"],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  ...(process.env.debug ? { devtool: "source-map" } : {}),
};

module.exports = [
  ...package.packages.map((pack) => {
    return {
      ...sharedConfig,
      entry: {
        [pack.name]:path.resolve(__dirname, "src", "packages", pack.name, "index.ts"),
      },
      output: {
        path: path.resolve(__dirname, "dist", "js"),
        library: {
          name: resolvePackInfoFromName(pack.name),
          type: "window",
        },
      },
    };
  }),
  {
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
  },
];
