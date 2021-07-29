We can use npm-run-all to run all scripts in parallel

```JSON
  "scripts": {
    "dev": "npm-run-all --parallel dev*",
    "dev:server": "nodemon --watch build --exec node build/bundle.js",
    "dev:build-server": "webpack --config webpack.server.js --watch",
    "dev:build-client": "webpack --config webpack.client.js --watch"
  },
```
