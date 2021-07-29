const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const webpackNodeExtetnals = require("webpack-node-externals");

const config = {
  target: "node",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  // Do not bundle libraries if it exists in node_modules folder
  externals: [webpackNodeExtetnals()],
};

module.exports = merge(baseConfig, config);
