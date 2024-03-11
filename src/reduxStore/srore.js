import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { combineReducers } from "redux";
import counterReducer from "./Reducer/counterSlice";
import rootReducer from "./reducer";

// const rootReducer = combineReducers({
//   counter: counterReducer,
// });

const store = createStore(
  rootReducer, // Combine all your reducers here
  applyMiddleware(thunk)
);

export default store;
