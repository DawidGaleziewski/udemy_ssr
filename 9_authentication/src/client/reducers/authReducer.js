import { FETCH_CURRENT_USER } from "../actions";

// we want to start with state of null for authentication
export default function (state = null, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      // we want to return false if action.payload is undefined to be clear that user is was not found
      return action.payload.data || false;
    default:
      return state;
  }
}
