// Root of client code
// Server will send the skeleton of the app (empty HTML).
// The job of client.js is to send 'life into it' crawl on the html and set all the logic/event handlers
// We can threat this file as if we were working with normal react
import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/Home";

// We want to mount on the same place that the Home component was rendered the first time

// Important part to understand is that react wont just replace all the content. It will hydrate it with extra logic

// We could use this and it would work, however newer versions of react ask for using hydrate
// ReactDOM.render(<Home />, document.querySelector("#root"));

// Newer way of rendering when we want to hydrate the app
ReactDOM.hydrate(<Home />, document.querySelector("#root"));
