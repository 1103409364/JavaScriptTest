import React, { Component } from 'react'

export default class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"isEdit": false,
			"thisTodo": props.item.todo,
			"id": props.item.id
		}
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
		this.props.changeTodo(this.state.id, this.state.thisTodo);
		// console.log(this.state)
	}
	render() {
		const { id, todo, done } = this.props.item;
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
						onDoubleClick={() => { this.setState({ "isEdit": true }) }}>{todo}
					</span>
					:
					<input
						autoFocus
						value={this.state.thisTodo}
						onBlur={this.handleBlur.bind(this) }
						onChange={this.handleChange.bind(this)}
					/>
				}
			</li>
		)
	}
}
