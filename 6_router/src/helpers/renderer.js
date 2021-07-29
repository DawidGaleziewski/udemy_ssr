import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Routes from "../client/Routes";

export default (req) => {
  const content = renderToString(
    // Pass the url from the request to the router
    <StaticRouter location={req.path} context={{}}>
      <Routes />
    </StaticRouter>
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
