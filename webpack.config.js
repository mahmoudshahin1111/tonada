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
};

module.exports = [
  ...package.components.map((component) => {
    return {
      ...sharedConfig,
      entry: {
        [component.name]: path.resolve(__dirname, component.path),
      },
      output: {
        path: path.resolve(__dirname, "dist", "js"),
        library: {
          name: component.className,
          type: "window",
        },
      },
    };
  }),
  {
    ...sharedConfig,
    entry: {
      index: path.resolve(__dirname, "src/ts", "index.ts"),
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
