import React, { Component } from 'react'
import { connect } from 'dva';

class TodoFilter extends Component {
	render() {
		// console.log(this.props)

		return (
			<div>
				<button
					style={{ backgroundColor: this.props.show === "all" ? "#fff" : "#999" }}
					onClick={() => {
						this.props.dispatch({ "type": "filterModel/changehow", "payload": { "show": "all" } })
					}}
				>全部</button>
				{" "}
				<button
					style={{ backgroundColor: this.props.show === "done" ? "#fff" : "#999" }}
					onClick={() => {
						this.props.dispatch({ "type": "filterModel/changehow", "payload": { "show": "done" } })
					}}
				>已做</button>
				{" "}
				<button
					style={{ backgroundColor: this.props.show === "undone" ? "#fff" : "#999" }}
					onClick={() => {
						this.props.dispatch({ "type": "filterModel/changehow", "payload": { "show": "undone" } })
					}}
				>未做</button>
				{" "}
			</div>
		)
	}
}

export default connect(
	({filterModel}) => ({ "show": filterModel.show })
)(TodoFilter);
