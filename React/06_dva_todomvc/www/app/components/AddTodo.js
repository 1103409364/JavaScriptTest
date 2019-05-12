import React, { Component } from 'react'
import { connect } from "dva";
class AddTodo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputTodo: ""
		}
	}

	handleClick() {
		this.props.dispatch({ "type": "todoModel/add", "payload": { "todo": this.state.inputTodo } });
		this.setState({
			inputTodo: ""
		})
	}

	handleChange(e) {
		this.setState({
			inputTodo: e.target.value
		})
	}

	render() {
		return (
			<div>
				<input
					autoFocus
					type="text"
					onChange={(this.handleChange).bind(this)}
					value={this.state.inputTodo}
				></input> {" "}
				<button
					onClick={(this.handleClick).bind(this)}
				>添加</button>
			</div>
		)
	}
}

export default connect()(AddTodo);