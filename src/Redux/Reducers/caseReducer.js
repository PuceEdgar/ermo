import { GET_CASE_BY_ID } from "../Types";

const initialState = {
  case: {},
};

const caselistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CASE_BY_ID:
      return {
        ...state,
        case: action.payload,
      };

    default:
      return state;
  }
};

export default caselistReducer;
