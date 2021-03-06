import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Routes from "../client/Routes";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        {/* <Routes /> */}
        {/* We render routes via our helper */}
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );
  return `<html>
          <head>
          </head>
          <body>
            <div id="root">${content}</div>
            <script src="bundle.js"></script>
          </body>
        </html>`;
};
