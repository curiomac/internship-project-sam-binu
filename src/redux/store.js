import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import thunk from "redux-thunk";

const reducer = combineReducers({    
  todoState: todoReducer,
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
