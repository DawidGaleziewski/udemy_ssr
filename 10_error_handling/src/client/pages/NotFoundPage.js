import React from "react";

// Static router renames context into staticContext. It will only exist on the server side. BROWSER CANT SEE IT
const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  console.log("staticContext", staticContext);
  return <h1>Ooops, route not found</h1>;
};

export default {
  component: NotFoundPage,
};
