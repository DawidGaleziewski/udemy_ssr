import "babel-polyfill";
import express from "express";
const app = express();
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";

// Fpr checking components in route
import { matchRoutes } from "react-router-config";
import Routes from "./client/Routes";

app.use(express.static("public"));

app.get("*", (req, res) => {
  // We start working with store before renderer function.
  const store = createStore();

  // return array of components that will be rendered
  const components = matchRoutes(Routes, req.path);

  components.map(({ route }) => {
    // Load data on a route if it exists if it does start the function
    return route.loadData ? route.loadData() : null;
  });

  // Store will be passed to renderer
  res.send(renderer(req, store));
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
