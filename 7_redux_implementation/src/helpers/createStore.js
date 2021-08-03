import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// We do not import provider! Sole purpose of this file is to create store

import reducers from "../client/reducers";

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));

  return store;
};
