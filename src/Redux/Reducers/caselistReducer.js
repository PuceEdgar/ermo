import { GET_CASELIST } from "../Types";

const initialState = {
  cases: [],
};

const caselistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CASELIST:
      return {
        ...state,
        cases: action.payload,
      };

    default:
      return state;
  }
};

export default caselistReducer;
