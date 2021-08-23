We have a error where in console we see:

"bundle.js:7106 Warning: Did not expect server HTML to contain a <li> in <ul>."

Browser thinks there should be no li in ul.

List of users also blinks for a second.

This is due to fact that at this state we use redux store to render the application on server and send only html to the browser. No state is send. After that bundle clreates the client side store.

React tasking over in the browser takes over and uses the client side redux store. This store is empty.

We want to preserve the state pre-fetched to the store and communicate this to the browser

# passing state to html

we want to inject the html we are returning on server side with the stringified store

```js
return `<html>
          <head>
          </head>
          <body>
            <div id="root">${content}</div>
            <script>
              window.INITIAL_STATE = ${JSON.stringify(store.getState())}
            </script>
            <script src="bundle.js"></script>
          </body>
        </html>`;
```

# getting the data on the client

on the client side we just want to initialize the redux store with the value that is on our global variable

```js
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk)
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
```

We are still doing a request on component.
It is a little redundant. But this request will be done on redux router when user will go from ie homepage to listing.
