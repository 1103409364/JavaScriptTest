import React from "react";

export default (props) => {
	return (
		<div
			style = {{"width":"100px", "height":"100px", "backgroundColor": `rgb(${props.R}, ${props.G}, ${props.B})`}}
		>
		</div>
	)
}