import { combineReducers } from "redux";
import counterReducer from "./counterReducer";

const rootReducer = combineReducers({
	counterReducer
});

console.log(rootReducer)
export default rootReducer;