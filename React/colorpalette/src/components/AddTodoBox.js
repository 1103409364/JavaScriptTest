import React from "react";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addTodo } from "../redux/actions.js";

class AddTodoBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = { input: "" };

		this.keyDownHandler = (this.keyDownHandler).bind(this);
		this.clickHandler = (this.clickHandler).bind(this);
		this.add = (this.add).bind(this);
	}

	updateInput(input) {
		this.setState({ input });
	};

	add() {
		this.props.addTodo(this.state.input);
		this.setState({input: ""});
	}

	keyDownHandler(e) {
		// 回车键添加
		if (e.key === "Enter") {
			this.add();
		}
	}

	clickHandler() {
		this.add();
	}

	render() {
		return (
			<div>
				<input placeholder="输入框"
					onKeyDown={this.keyDownHandler}
					onChange={e => this.updateInput(e.target.value)}
					value={this.state.input}
					autoFocus>
				</input>
				{" "}
				<button onClick={this.clickHandler}>添加</button>
			</div>
		)
	}
}

// 第二个参数可以是对象,每个定义在该对象的函数都将被当作 Redux action creator，会被自动dispatch
export default connect(null, { addTodo })(AddTodoBox);