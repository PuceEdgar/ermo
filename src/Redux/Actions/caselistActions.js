import { GET_CASELIST } from "../Types";

export const getCaselist = (data) => {
  return async (dispatch) => {
    dispatch({
      type: GET_CASELIST,
      payload: data,
    });
  };
};

export const getCaselistState = (value, period) => async (dispatch) => {
  const response = await fetch(
    `http://localhost:9999/home/getcaselist/?value=${value}&period=${period}`
  );
  const result = await response.json();
  dispatch(getCaselist(result));
};
