import React from 'react';

class Preview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// "page": parseInt(props.position.idx / 6, 10)
		}
	}

renderPreview(props) {
	if (Object.keys(props.images).length !== 0) {
		let imgurlArr = props.images[props.position.color][props.position.album];
		let pages = parseInt(imgurlArr.length / 6, 10) + 1;
		// 每一页都用一个ul包起来
let pageArr = [];
for (let pageIdx = 0; pageIdx < pages; pageIdx++) {
	let pageImgArr = imgurlArr.slice(pageIdx * 6, pageIdx * 6 + 6);

	pageArr.push(
		<ul key={pageIdx} className="clearfix">
			{
				pageImgArr.map((item, index) => {
					return <li
						className={pageIdx * 6 + index === props.position.idx ? "cur" : ""}
						key={index}
						// 添加点击事件
						onClick={() => { props.changePicIdx(pageIdx * 6 + index) }}
					><img src={item} alt="car" /></li>
				})
			}
		</ul>
	)
}
return pageArr;
	}
}

	renderPicNav(props) {
		if (Object.keys(props.images).length !== 0) {
			let imgurlArr = props.images[props.position.color][props.position.album];
			let pages = parseInt(imgurlArr.length / 6, 10) + 1;
			let pagIdx = parseInt(props.position.idx / 6, 10);
			if (pages > 1) {
				var arr = [];

				for (let i = 0; i < pages; i++) {
					arr.push(
						<li
							style={{ width: 90 / pages + "%" }}
							className={pagIdx === i ? "cur" : ""}
							// 换页时切换到该页第一张
							onClick={() => { props.changePicIdx(i * 6 + 0) }}
						></li>
					)
				}
				return arr;
			}
		}
	}

	render() {
		// 图片列表换页时移动的距离
		const W = 360;
		return (
			<div>
				<div className="preview">
					<h3>图片预览</h3>
					<div className="carPreview clearfix"
						style={{ left: -parseInt(this.props.position.idx / 6, 10) * W + "px" }}
					>
						{this.renderPreview(this.props)}
					</div>
				</div>
				<div className="picNav">
					<ul>
						{this.renderPicNav(this.props)}
					</ul>
				</div>
			</div>
		)
	}
}

export default Preview;
