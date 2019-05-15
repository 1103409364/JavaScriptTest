import React from 'react';

const Preview = (props) => {
	const renderPreview = (props) => {
		if (Object.keys(props.images).length !== 0) {
			let imgurlArr = props.images[props.position.color][props.position.album];
			// console.log(imgurlArr);
			return imgurlArr.map((item, index) => {
				return <li
					key={index}
					// 添加点击事件
					onClick={() => { props.changePicIdx(index) }}
				><img src={item} alt="car" /></li>
			})
		}
	}
	return (
		<div className="preview">
			<h3>图片预览</h3>
			<ul className="clearfix">
				{renderPreview(props)}
			</ul>
		</div>
	);
};

export default Preview;
