import {combineReducers} from "redux";
import todoReducer from "./todoReducer.js";

const rootReducer = combineReducers({
	todoReducer,
});

console.log(rootReducer)
export default rootReducer;