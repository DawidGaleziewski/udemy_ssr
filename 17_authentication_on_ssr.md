## Challanges of ssr authentication

Due to fact that we have a server in our frontend. And that server does contact the API for the data, it will need information on who wants to access the data.

Server will need to pretend it is a browser when contacting the API.

Problem with our authentication is that when we will get a cookie from api server to a browser the renderer server wont have it.

## Solution

Whenever user authenticates with api we will go thru the renderer server acting as our proxy for requests.
Proxy will forward that authentication to API.

## Initial request

When browser sends a request for the page initially, we will have to check for a cookie. As there is nothing to proxy. This is just a initial request.

## Why not JWT?

We would need to do a flollow request to the browser from the server to get the jwt token. As the jwt cant be send in cookie only in request header.

## proxy setup

in our express we want to proxy all requests to our backend

```javascript
app.use(express.static("public"));

app.use("/api", proxy("http://react-ssr-api.herokuapp.com"));
```

## moving cookie to api call

when we recive a api call from a browser to renderer, we want to take that cookie and use it in our request from the renderer to the api itself

but we do not want the cookie to be cjanged on the client.

Therefore we want the axios to behave diffrently depending on if it was invoked on client or the server

## modify thunk

we will use a thunk 3rd argument. We will pass a instance of axios to it that will behave diffrently on server and diffrently on browser

This will help us do requests without worring about things like cookies

setup on client:

```javascript
// Prepend each request with /api. This requests will be proxied by express.
const axiosInstance = axios.create({
  baseURL: "/api",
});

// We pacc axios instance to thunk
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);
```

In our actions

```js
// We recive new axios instance now. Called api here
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get("http://react-ssr-api.herokuapp.com/users");

  dispatch({
    type: FETCH_USERS,
    payload: res,
  });
};
```

On the server. We need to add cookie to request and pass it to the api

in /index.js we will need to pass each request to our create store function

```js
app.get("*", (req, res) => {
  // We pass request to the create store to be used to extract cookies
  const store = createStore(req);
```

in /createStore

```js
export default (req) => {
  const axiosInstance = axios.create({
    baseURL: "http://react-ssr-api.herokuapp.com",
    headers: {
      // sometimes users will make request without a cookie. and we never want to have a undefined header. This would crash the request
      // This tricks api to thinking the call was made by the user
      cookie: req.get("cookie") || "",
    },
  });

  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );

  return store;
};
```

IMPORTANT whenever we want to make a call that is outside of the api we need to make call by importing axios to the action

## figure out if user is authenticated

we will hit the /current_user path to check if the user is authenticated

as we want to check everytime if user is authenticated we want to run it from App.js

## oauth

we wauth by redirecting to google with a href as we do not want the request to be redirected

```js
const authButton = auth ? (
  <a href="/api/logout">Logout</a>
) : (
  <a href="/api/auth/google">Login</a>
);
```

this will proxy the request to the api by the server

request is proxied browser -> server -> google api
