const path = require("path");

module.exports = {
  // Inform webpack we are building bundle for nodjs and not the browser. By default webpack uses browser setup
  target: "node",

  // Tell webpack root file of our server app
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    // dirname is the current working directory
    path: path.resolve(__dirname, "build"),
  },

  // Run babel on each file it runs through
  module: {
    rules: [
      {
        //Regex to run on js files
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          // Presets that are run on each js file
          presets: [
            "react",
            // For async code
            "stage-0",
            ["env", { targets: { browsers: ["last 2 versions"] } }],
          ],
        },
      },
    ],
  },
};
