import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.add = (this.add).bind(this);
	}

	add() {
		var num = Number(this.refs.num.value);
		this.props.actions.addNum(num);
	}

	render() {
		return (
			<div>
				<h1>{this.props.v}</h1>
				<button onClick={this.props.actions.add}>+</button>
				{" "}
				<button onClick={this.props.actions.minus}> - </button>
				<p>
					<input type="button" value="按我加" onClick={this.add} />
					{" "}
					<input type="number" ref="num" />
				</p>
			</div>
		)
	}
}

export default connect(
	(state) => ({ v: state.counterReducer.v }), //合并reducer之后要用counterReducer指出来
	(dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
)(App)