import React from "react";
import { renderRoutes } from "react-router-config";
import { fetchCurrentUser } from "./actions";

import Header from "./components/Header";

// This component will display on all pages.
// We also will want probably be able to execute data fetching on this component as well
const App = ({ route }) => {
  // We want to render arr routes that are matched
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

export default {
  component: App,
  // Destructure dispatch that will be passed and dispatch our action. This will auth each time
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser()),
};
