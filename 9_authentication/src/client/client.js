import "babel-polyfill";
import React from "react";
import ReactDOM, { render } from "react-dom";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

import { renderRoutes } from "react-router-config";

// Redux
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

// Reducer
import reducers from "./reducers";

// Prepend each request with /api. This requests will be proxied by express.
const axiosInstance = axios.create({
  baseURL: "/api",
});

// We pacc axios instance to thunk
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
