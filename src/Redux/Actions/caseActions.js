import { GET_CASE_BY_ID } from "../Types";

export const getCase = (data) => {
  return async (dispatch) => {
    dispatch({
      type: GET_CASE_BY_ID,
      payload: data,
    });
  };
};

export const getCaseState = (caseid) => async (dispatch) => {
  const response = await fetch(
    `http://localhost:9999/home/getcasedetails/?caseid=${caseid}`
  );
  const result = await response.json();
  dispatch(getCase(result));
};
