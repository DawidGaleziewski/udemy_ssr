We will have two routing tiers

1. Express routing
   express will not enforce any routing rules (\*).

All routing will be done by react router

2. React router
   /
   /users
   /admins

react router should be responsible for displaying anything html specific.

We can put things in our express server like json responses and apis

## Two routers staticRouter and BrowserRouter

React router looks at the browser url. Due to the fact we use SSR we would get an error when trying to do this.
Therefore we need to divide our router in two parts

- client - BrowserRouter - for use when running in a browser

- Server - staticRouter - For use when doing SSR

In routes.js we will import routes from both server and client

Implementation on client:

```javascript
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

// We use routes shared with server side inside browser router for our client setup
ReactDOM.hydrate(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.querySelector("#root")
);
```

Implementation on the server

```javascript
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Routes from "../client/Routes";

export default () => {
  const content = renderToString(
    <StaticRouter context={{}}>
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
```
