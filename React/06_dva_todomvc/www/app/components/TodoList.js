import React, { Component } from 'react'
import { connect } from 'dva';
import Todo from "./Todo";

class TodoList extends Component {
	toggleDone(id) {
		this.props.dispatch({ "type": "todoModel/toggleDone", "payload": { "id": id } })
	}

	changeTodo(id, newtodo) {
		this.props.dispatch({ "type": "todoModel/update", "payload": { "id": id, "todo": newtodo } })
	}

	deleteTodo(id) {
		this.props.dispatch({ "type": "todoModel/delete", "payload": { "id": id} })
	}

	render() {
		return (
			<ul>
				{this.props.todos.map((item) => {
					return <Todo
						key={item.id}
						item={item}
						toggleDone={this.toggleDone.bind(this)}
						changeTodo={this.changeTodo.bind(this)}
						deleteTodo={this.deleteTodo.bind(this)}
					/>
				})}
			</ul>
		)
	}
}
// 筛选器
const selector = (filter, todos) => {
	switch (filter) {
		case "all":
			return todos;
		case "done":
			return todos.filter((item) => {
				if (item.done === true) {
					return item;
				}
			});
		case "undone":
			return todos.filter((item) => {
				if (item.done === false) {
					return item;
				}
			});
	}
}
// 这里筛选数据
export default connect(
	({ todoModel, filterModel }) => {
		// console.log(filterModel.show)
		return { "todos": selector(filterModel.show, todoModel.todos)}
	}
)(TodoList);