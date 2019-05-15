import React from 'react';

const ImgType = (props) => {
	const renderImgType = (props) => {
		const type = {
			"view": "外观",
			"center": "内饰",
			"detail": "细节"
		}
		// 检查images是否为空
		if (Object.keys(props.images).length !== 0) {
			let imgTypeArr = Object.keys(props.images[props.position.color]);

			return Object.keys(type).map((item, index) => {
				if (imgTypeArr.indexOf(item) !== -1) {
					return <li
						key={index}
						className={item === props.position.album ? "cur" : ""}
						// 添加点击事件
						onClick={() => { props.changeType(item) }}
					>
						{type[item] + " (" + props.images[props.position.color][item].length + ")"}

					</li>
				}

				return "";
			})
		}
	}



	return (
		<ul className="imgType">
			{renderImgType(props)}
		</ul>

	)
}

export default ImgType;