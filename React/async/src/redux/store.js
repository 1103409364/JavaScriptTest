import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
//任何对state的改变之前都会顺序执行中间件。
export default createStore(rootReducer, applyMiddleware(thunk));