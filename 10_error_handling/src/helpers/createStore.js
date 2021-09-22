import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../client/reducers";
import axios from "axios";

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
