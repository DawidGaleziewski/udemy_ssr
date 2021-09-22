# 404 page

we want to return a 404 page and return 400 code

## adding 404 response in express

we use a context prop in static router to communicate a error

im express

```js
app.get("*", (req, res) => {
  // We pass request to the create store to be used to extract cookies
  const store = createStore(req);
  const components = matchRoutes(Routes, req.path);
  const promises = components.map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises).then(() => {
    const context = {};

    // Context object we are passing down
    const content = renderer(req, store, context);

    // If a error was set from our notFound page, we want to attach a 404
    console.log("con", content.notFound);
    if (context.notFound) {
      res.status(404);
    }
    res.send(content);
  });
});
```

In our server side router

```js
export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      {/* Context passed down to rendered components */}
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );
```

In component that will init the error

```js
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
```
