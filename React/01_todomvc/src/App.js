import React from "react";
import AddTodoBox from "./components/AddTodoBox";
import TodoList from "./components/TodoList"
import VisibilityFilters from "./components/VisibilityFilters"
import "./css/style.css";

// console.log(store.getState())
export default function ColorApp() {
	return (
		<div className="todo-app">
			<h1>Todo List</h1>
			<AddTodoBox></AddTodoBox>
			<TodoList></TodoList>
			<VisibilityFilters></VisibilityFilters>
		</div>
	)
}
