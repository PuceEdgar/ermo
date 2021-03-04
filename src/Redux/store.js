import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import caselistReducer from "./Reducers/caselistReducer";
import caseReducer from "./Reducers/caseReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  cases: caselistReducer,
  case: caseReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
