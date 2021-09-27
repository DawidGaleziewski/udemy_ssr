We will have a new component called "require auth".

This component will handle the auth depending on the user status

At this point we want the app to render no matter if we get a error from api.

We also have to keep in mind that we want to auth user no matter if its on browser or on server side

Best to use HOC for this. HOC is used often for validation/authentication.

```js
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default (ChildComponent) => {
  class RequireAuth extends Component {
    render() {
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
    }
  }

  function mapStateToProps({ auth }) {
    return { auth };
  }

  //  We use connect as we need to know the user status
  return connect(mapStateToProps)(RequireAuth);
};
```
