import React from 'react';

export default (props) => {
	return (
		<div className="bigImgWrap">
			<div className="bigImg">
				<img src={props.imgNow} alt="img" />
				<div
					className="leftBtn"
					onClick={() => { props.prevPic() }}
				></div>
				<div
					className="rightBtn"
					onClick={() => { props.nextPic() }}
				></div>
			</div>
		</div>
	)
}
