// Shared by both client and server side code base
// Div contains only routes, those will be imported to client.js and index.js

import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";

export default () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
    </div>
  );
};
