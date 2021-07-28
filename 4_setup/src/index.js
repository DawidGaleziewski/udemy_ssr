// const express = require("express");
// const app = express();

// // React libraries
// const React = require("react");
// const renderToString = require("react-dom/server").renderToString;

// React components
// const Home = require("./client/components/Home").default;

// Under the hood this is still require as this is node.js code. But we modify it by using webpack
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Home from "./client/components/Home";

const app = express();

app.get("/", (req, res) => {
  // We will be useing ReacDOM library to change react component into html. We will need however to use webpack to translate it
  const content = renderToString(<Home />);

  res.send(content);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
