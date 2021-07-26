const express = require("express");
const app = express();

// React libraries
const React = require("react");
const renderToString = require("react-dom/server").renderToString;

// React components
const Home = require("./client/components/Home").default;

app.get("/", (req, res) => {
  // We will be useing ReacDOM library to change react component into html
  const content = renderToString(<Home />);

  res.send(content);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
