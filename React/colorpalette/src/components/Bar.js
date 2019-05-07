import React from "react";

const Bar = (props) => {
	console.log(props)
	return (
		<div>
			<p>R:
				<input type="range" min="0" max="255" value={props.item.v} onChange={props.handleChange} ></input>
				<input style={{ width: "50px" }} type="number" value={props.item.v} onChange={props.handleChange}></input>
			</p>
		</div>
	)
}

export default Bar;