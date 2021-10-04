This redirect will work on client, but it wont work on ssr:

```js
switch (this.props.auth) {
  case false:
    // Redirect user if he is not logged in
    return <Redirect to="/" />;
  case null:
    // It is null as we have not yet fetched the state
    return <div>Loading</div>;
  default:
    // Auth is ok and we can show it
    return <ChildComponent {...this.props} />;
}
```

it is due to the fact that our ssr is using react static router on the server side. Static router has no way of handling "Redirect" component action, as there is no browser on the server side. Therefore we will need to use context.
