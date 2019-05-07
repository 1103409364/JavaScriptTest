import React from "react";

const Bar = (props) => {
	return (
		<div>
			<p>{props.item.color}:
				<input type="range" min="0" max="255" value={props.item.v} onChange={props.handleChange} data-color = {props.item.color} ></input>
				<input style={{ width: "50px" }} type="number" value={props.item.v} onChange={props.handleChange} data-color = {props.item.color}></input>
			</p>
		</div>
	)
}

export default Bar;