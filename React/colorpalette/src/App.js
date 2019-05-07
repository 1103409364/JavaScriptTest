import React from "react";
import ColorBar from "./components/ColorBar";
import Display from "./components/Display"
import { connect } from "react-redux";
import { getColor}  from './redux/selectors'

const App = (props) => {
	return (
		<div>
			<h1>调色板</h1>
			<Display R= {props.rgb.R} G ={props.rgb.G} B={props.rgb.B}></Display>
			<ColorBar></ColorBar>
		</div>
	)
}

const mapStateToProps = (state) => {
	let rgb = getColor(state);
	// console.log(rgb);

	return { rgb };
}

export default connect(
	mapStateToProps,
	null
)(App);
