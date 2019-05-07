import React from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { PropTypes } from "prop-types";

import * as actions from '../redux/actions'

class ColorBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			R: props.rgb.R,
			G: props.rgb.G,
			B: props.rgb.B,
		};

		this.handleChangeR = (this.handleChangeR).bind(this);
		this.handleChangeG = (this.handleChangeG).bind(this);
		this.handleChangeB = (this.handleChangeB).bind(this);
	}

	handleChangeR(e) {
		let v = e.target.value < 0 ? 0 : e.target.value > 255 ? 255 : e.target.value;
		// v = e.target.value > 255 ? 255: e.target.value;
		this.setState({
			R: v
		});
		// console.log(this.props.updateR)
		// this.props.actions.updateR(v);
		this.props.updateR(v);
	}
	handleChangeG(e) {
		let v = e.target.value < 0 ? 0 : e.target.value > 255 ? 255 : e.target.value;
		this.setState({
			G: v
		});
		// this.props.actions.updateG(v);
		this.props.updateG(v);
	}
	handleChangeB(e) {
		let v = e.target.value < 0 ? 0 : e.target.value > 255 ? 255 : e.target.value;
		this.setState({
			B: v
		});
		// this.props.actions.updateB(v);
		this.props.updateB(v);
	}

	render() {
		// console.log(this.state)
		return (
			<div>
				<p>R:
					<input type="range" min="0" max="255" value={this.state.R} onChange={this.handleChangeR} ></input>
					<input style={{ width: "50px" }} type="number" value={this.state.R} onChange={this.handleChangeR}></input>
				</p>
				<p>G:
					<input type="range" min="0" max="255" value={this.state.G} onChange={this.handleChangeG}></input>
					<input style={{ width: "50px" }} type="number" value={this.state.G} onChange={this.handleChangeG}></input>
				</p>
				<p>B:
					<input type="range" min="0" max="255" value={this.state.B} onChange={this.handleChangeB} ></input>
					<input style={{ width: "50px" }} type="number" value={this.state.B} onChange={this.handleChangeB} ></input>
				</p>
			</div>
		)
	}
}

ColorBar.protoTypes = {
	R: PropTypes.number.isRequired,
	G: PropTypes.number.isRequired,
	B: PropTypes.number.isRequired,
}

// const mapDispatchToProps = dispatch => ({
// 	actions: bindActionCreators(actions, dispatch)
// });

// 可以直接传action creator组成的对象
export default connect(null, actions)(ColorBar);
// export default connect(null, mapDispatchToProps)(ColorBar);