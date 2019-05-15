import React from 'react';

export default (props) => {
	return (
		<div className="bigImgWrap">
			<div className="bigImg">
				<img src={props.imgNow} alt="img" />
				<div className="leftBtn"></div>
				<div className="rightBtn"></div>
			</div>
		</div>
	)
}
