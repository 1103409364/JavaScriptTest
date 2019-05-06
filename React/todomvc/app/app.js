import React from "react";
import { render } from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { createLogger } from 'redux-logger';
import reducer from "./redux/reducers";
import AddTodoBox from "./components/AddTodoBox";
import TodoList from "./components/TodoList"
import VisibilityFilters from "./components/VisibilityFilters"
import "./css/style.css";

const logger = createLogger();

const rootElement = document.querySelector("#app");
// 日志中间件logger
const store = createStore(reducer, applyMiddleware(logger));
// console.log(store.getState())
render(
	<Provider store={store} >
		<h1>Todo List</h1>
		<AddTodoBox></AddTodoBox>
		<TodoList></TodoList>
		<VisibilityFilters></VisibilityFilters>
	</Provider>,
	rootElement,
)