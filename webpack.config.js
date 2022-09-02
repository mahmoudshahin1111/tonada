const path = require("path");
const package = require("./package.json");

const sharedConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "source-map",
};

module.exports = [
  ...package.packages.map((pack) => {
    return {
      ...sharedConfig,
      entry: {
        [pack.name]: path.resolve(__dirname, pack.path),
      },
      output: {
        path: path.resolve(__dirname, "dist", "js"),
        library: {
          name: pack.className,
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
