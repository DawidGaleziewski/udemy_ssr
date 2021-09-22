export const FETCH_USERS = "fetch_users";

// We recive new axios instance now. Called api here
// we also do not have to give whole url. Just need to give our api
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get("/users");

  dispatch({
    type: FETCH_USERS,
    payload: res,
  });
};

export const FETCH_CURRENT_USER = "fetch_current_user";
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const response = await api.get("/current_user");

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: response,
  });
};
