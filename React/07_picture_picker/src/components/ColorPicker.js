import React from 'react';

const ColorPicker = (props) => {
	const renderColorType = () => {
		const colors = ["blue", "gray", "red", "silver", "white"];

		if (Object.keys(props.images).length !== 0) {
			let hascolor = Object.keys(props.images);
			return colors.map((item, index) => {
				if (hascolor.indexOf(item) !== -1) {
					return <li
						key={index}
						className={item === props.position.color ? "cur" : ""}
						style={{ backgroundColor: item }}
						// 添加点击事件
						onClick={() => { props.changeColor(item) }}
					>
					</li>
				}
				return "";
			})
		}
	}

	return (
		<ul className="color">
			{renderColorType(props)}
		</ul>
	)
}

export default ColorPicker;