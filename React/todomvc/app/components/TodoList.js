import React from "react";
import { connect } from "react-redux";
import { getTodosByVisibilityFilter } from "../redux/selectors"
import Todo from "./Todo";

const TodoList = ({ todos }) => (
	<ul className="todo-list">
		{todos && todos.length
			? todos.map((todo) => {
				return <Todo key={`todo-${todo.id}`} todo={todo} />;
			})
			: "No todos, yay!"}
	</ul>
);

const mapStateToProps = state => {
	const { visibilityFilter } = state;
	// 引入selectors筛选数据
	const todos = getTodosByVisibilityFilter(state, visibilityFilter);
	// console.log(1 ,todos)
	
	return { todos };
}
// 连接store
export default connect(mapStateToProps)(TodoList);