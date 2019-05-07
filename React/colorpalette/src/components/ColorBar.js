import React from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { PropTypes } from "prop-types";
import * as actions from '../redux/actions'
import { getAll } from '../redux/selectors'
import Bar from "./Bar";

class ColorBar extends React.Component {
	constructor(props) {
		super(props);


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
				{
					// console.log(this.props.rgb)
					this.props.rgb.map((item) => {
						return <Bar item={item} key={item.color} handleChange={item.color === "R" ? this.handleChangeR : item.color === "G" ? this.handleChangeG : item.color === "B" ? this.handleChangeB : null} ></Bar>
						// if (item.color === "R") {
						// 	return <Bar item={item} key={item.color} handleChange={this.handleChangeR} ></Bar>
						// }
						// if (item.color === "G") {
						// 	return <Bar item={item} key={item.color} handleChange={this.handleChangeG} ></Bar>
						// }
						// if (item.color === "B") {
						// 	return <Bar item={item} key={item.color} handleChange={this.handleChangeB} ></Bar>
						// }
					})

				}
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

const mapStateToProps = (state) => {
	// 可以直接返回，需要筛选
	return getAll(state);
}

// 可以直接传action creator组成的对象
export default connect(mapStateToProps, actions)(ColorBar);
// export default connect(null, mapDispatchToProps)(ColorBar);