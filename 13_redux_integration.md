Api for testing
https://react-ssr-api.herokuapp.com/

Routes that can be used

/ - route
/users - returns a list of 'users'
/admins - returns the list of admins
/auth/google - starts the auth process
/current_user - returns info on current user
/logout

# 4 challanges when working with redux in ssr

1. Redux needs diffrent config on browser vs server

This is due to other 3 reasons.

We will have two stores. One for server and one for the browser.

2. Auth needs to be done on server and not browser

Will use cookie based auth. However we do not have easy access to the data on server.

3. Need a way to detect when all initial data load
   action creators are completed on the server

We need to know the info in a instance.
We need to know a way to know when our action creators finish loading a request

4. Need to stay rehydrated on the server

similar rehydration process. We need to give redux existing state to boot up from

## Browser store creation

On Client the redux store is quite straightforward

```javascript
// Redux
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const store = createStore(reducers, {}, applyMiddleware(thunk));

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
```

## Server store creation

We create a new helper for this name createStore

```javascript
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// We do not import provider! Sole purpose of this file is to create store

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));

  return store;
};
```

store is passed from the route handler in index.js as we will add extra logic to it. And finally to the renderer function

```javascript
app.get("*", (req, res) => {
  // We start working with store before renderer function.
  const store = createStore();

  // Extra logic to init and load data into the store

  // Store will be passed to renderer
  res.send(renderer(req, store));
});
```

## action creator and reducer for fetching

We will get this error when trying to use async await:

Uncaught ReferenceError: regeneratorRuntime is not defined

We need to configure babel by importing babel polifil in index.js

we need to import import "babel-polyfill"; both to index.js and client.js

In order to do a client side render of the route we setup thunk action same way we do normally

1. client/action

```js
import axios from "axios";

export const FETCH_USERS = "fetch_users";

export const fetchUsers = () => async (dispatch) => {
  const res = await axios.get("http://react-ssr-api.herokuapp.com/users");

  dispatch({
    type: FETCH_USERS,
    payload: res,
  });
};
```

2. client/reducers

```js
import { combineReducers } from "redux";
import usersReducer from "./usersReducer";

export default combineReducers({
  users: usersReducer,
});
```

3. Dispatch from component

```js
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

export default connect(mapStateToProps, { fetchUsers })(UsersList);
```

## server side loading

Due to the fact that we have no logic now to fetch data or wait for reducers the server wont wait and send the html.

In ssr we do not use componentDidMount lifecycle method to fetch the data.

### solution

This is not perfect but is popular

Attach a little function to all components, that describes what data that component needs to load in order to be rendered.

1. We look at the url that request is trying to access
2. Figure out what components need to be rendered
3. Fire function for each of the components to figure out the data fetching process

We are NOT doing a initial rendeer of components.
Whenever somebody makes a request we create a list of data fetching functions and call each of those.

Once each is complete we detect those are finished we render the data and send response to the user.

Pros:

- Renders app once
- makes data requirments for each component clear

const:

- Requires a ton of code

Custome code will affect our react router

### figuring out what componets we need

we use library called react-router-config for this.
We will have to define our routes in a array of objects way.

Each object defines a path we can visit inside of our application

New routes config:

```js
import React from "react";
import Home from "./components/Home";
import UsersList from "./components/UsersList";

// We say bye bye to our clean code
// export default () => {
//   return (
//     <div>
//       <Route exact path="/" component={Home} />
//       <Route path="/test" component={() => <div>Hii</div>} />
//       <Route path="/users" component={UsersList} />
//     </div>
//   );
// };

// Hello to ssr code
export default [
  { path: "/", component: Home, exact: true },
  { path: "users", component: UsersList },
];
```

We also need to implement this object inside both client.js and index.js

```js
<Provider store={store}>
  <StaticRouter location={req.path} context={{}}>
    {/* <Routes /> */}
    {/* We render routes via our helper */}
    <div>{renderRoutes(Routes)}</div>
  </StaticRouter>
</Provider>
```

After that in our route hendler for express we can get components for the path

```js
app.get("*", (req, res) => {
  // We start working with store before renderer function.
  const store = createStore();

  // return array of components that will be rendered
  const components = matchRoutes(Routes, req.path);

  console.log(components);

  // Store will be passed to renderer
  res.send(renderer(req, store));
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
```

### fire loadData from components

Finally we need to add new function for component file called load data.

For each path we will need to decide what component needs what data

At last step index.js we will rune ach loadData function

1. Create load data function inside usersList component and export it

```js
function loadData() {
  console.log("Trying to load some data");
}

export { loadData };
```

2. Import load data inside routes

```js
export default [
  { path: "/", component: Home, exact: true },
  { path: "/users", component: UsersList, loadData },
];
```

This should be now visable inside matchRoutes return array:

```js
[
  {
    route: {
      path: '/users',
      component: [Function],
      loadData: [Function: loadData]
    },
    match: { path: '/users', url: '/users', isExact: true, params: {} }
  }
]
```

3. Lastly we want to call each loadData function in our route handler

```js
app.get("*", (req, res) => {
  // We start working with store before renderer function.
  const store = createStore();

  // return array of components that will be rendered
  const components = matchRoutes(Routes, req.path);

  components.map(({ route }) => {
    // Load data on a route if it exists if it does start the function
    return route.loadData ? route.loadData() : null;
  });

  // Store will be passed to renderer
  res.send(renderer(req, store));
});
```
