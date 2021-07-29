import express from "express";
const app = express();
import renderer from "./helpers/renderer";

app.use(express.static("public"));

app.get("/", (req, res) => {
  // we pass the request to the router so that it knows what route was requested from the browser and what to render
  res.send(renderer(req));
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
