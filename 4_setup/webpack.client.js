const path = require("path");
// This config is used for client js

module.exports = {
  // We remove target so that webpack uses a client config
  //   target: "node",
  // We want to separate client entry point from server entry point. We do this to protect api keys and sensitive data we will send to the user.
  // This normally would be index.js it is named client to avoid confusion during learning
  entry: "./src/client/client.js",
  output: {
    filename: "bundle.js",
    // We change it from build to public. This will be files that should be publicly accesible
    path: path.resolve(__dirname, "public"),
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            "react",
            "stage-0",
            ["env", { targets: { browsers: ["last 2 versions"] } }],
          ],
        },
      },
    ],
  },
};
