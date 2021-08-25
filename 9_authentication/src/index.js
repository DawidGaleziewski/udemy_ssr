import "babel-polyfill";
import express from "express";
const app = express();
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";

import { matchRoutes } from "react-router-config";
import Routes from "./client/Routes";

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore();
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
