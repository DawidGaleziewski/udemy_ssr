import "babel-polyfill";
import express from "express";
const app = express();
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import proxy from "express-http-proxy";
import { matchRoutes } from "react-router-config";
import Routes from "./client/Routes";

app.use(express.static("public"));

app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(opts) {
      // This is specific to the api we use and oauth with google
      opts.headers["x-forwarded-host"] = "localhost:3000";
      return opts;
    },
  })
);

app.get("*", (req, res) => {
  // We pass request to the create store to be used to extract cookies
  const store = createStore(req);
  const components = matchRoutes(Routes, req.path);
  const promises = components.map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
