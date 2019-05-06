import {combineReducers} from "redux";
import todoReducer from "./todoReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
	// 返回的state，会被加上这个key,可以自定义key
	todos: todoReducer,
	visibilityFilter: filterReducer,
});

export default rootReducer;