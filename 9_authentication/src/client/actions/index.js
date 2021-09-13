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
