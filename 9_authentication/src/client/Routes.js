import React from "react";
import App from "./App";
import HomePage from "./pages/HomePage";

import UsersListPage from "./pages/UsersListPage";

// We want to nest routes inside of app. As the App will be always used. We did not tie a path to app, it will always be displayed
export default [
  {
    ...App,
    // Nesting
    routes: [
      { ...HomePage, path: "/", exact: true },
      { ...UsersListPage, path: "/users" },
    ],
  },
];
