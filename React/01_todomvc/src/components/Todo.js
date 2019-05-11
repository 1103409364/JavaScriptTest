import React from "react";
import { connect } from "react-redux";
import { toggleTodo } from "../redux/actions";

const Todo = ({ todo, toggleTodo }) => (
	<li className="todo-item" onClick={() => toggleTodo(todo.id)}>
		{todo && todo.completed ? "👌" : "👋"}{" "}
		<span
			className={
				todo.completed ? "todo-item__text--completed" : "todo-item__text"
			}
		>
			{todo.content}
		</span>
	</li>
);

// export default Todo;
export default connect(
	null,
	{ toggleTodo }
)(Todo);
