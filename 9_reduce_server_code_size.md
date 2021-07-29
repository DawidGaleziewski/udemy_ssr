Webpack on client imports whole libraries like React.
On server we dont need those. We can improve the start time of our scripts by using webpack-node-externals

```javascript
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
```
