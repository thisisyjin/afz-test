import hospital from "./hospital";
import upload from "./upload";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  hospital,
  upload,
});

export default rootReducer;
