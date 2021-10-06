import React from "react";

const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  console.log("staticContext", staticContext);
  return <h1>Ooops, route not found</h1>;
};

export default {
  component: NotFoundPage,
};
