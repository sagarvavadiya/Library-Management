import { combineReducers } from "redux";
import counterReducer from "./Reducer/counterSlice";
import bookSlice from "./Reducer/book";
import userSlice from "./Reducer/user";
const rootReducer = combineReducers({
  counter: counterReducer, // Add your reducers here
  book: bookSlice,
  user: userSlice,
});

export default rootReducer;
