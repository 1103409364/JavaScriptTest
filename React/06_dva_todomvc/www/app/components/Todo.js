import React, { Component } from 'react'

export default class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"isEdit": false,
			"thisTodo": props.item.todo,
		};
		// console.log(this.state)
	}

	handleChange(e) {
		this.setState({
			"thisTodo": e.target.value
		});
	}

	handleBlur() {
		this.setState({
			"isEdit": false
		})
		this.props.changeTodo(this.props.item.id, this.state.thisTodo);
		// console.log(this.state)
	}

	handleDelete() {
		// 点击一个按钮this永远指向初始化的第一个Todo，是因为构造函数只执行一次？
		// 好像这个按钮的this无法绑定，全局的state直接使用就不会有问题。别用local state接
		console.log( this.state)
		this.props.deleteTodo(this.props.item.id);
	}
	render() {
		let { id, todo, done } = this.props.item;
		return (
			<li>
				<input
					type="checkbox"
					checked={done ? true : false}
					onChange={() => {
						this.props.toggleDone(id);
					}}
				/>
				{/* 双击编辑 */}
				{!this.state.isEdit
					?
					<span
						style={{ width: "200px", display: "inline-block" }}
						onDoubleClick={() => { this.setState({ "isEdit": true }) }}
					>
						{todo}
					</span>
					:
					<input
						autoFocus
						value={this.state.thisTodo}
						onBlur={this.handleBlur.bind(this)}
						onChange={this.handleChange.bind(this)}
					/>
				}
				<button
					onClick={this.handleDelete.bind(this)}
				>
					删除
				</button>
			</li>
		)
	}
}
