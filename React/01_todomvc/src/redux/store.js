import { applyMiddleware, createStore } from "redux";
import { createLogger } from 'redux-logger';

import rootReducer from "./reducers";
// 日志中间件logger
const logger = createLogger();

export default createStore(rootReducer, applyMiddleware(logger));