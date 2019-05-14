import React from 'react';

const SideBox = () => {
	return (
		<div className="sideBox" >
			<h2>丰田卡罗拉</h2>
			<p>2199款 AI自动驾驶，核动力版</p>

			<div className="type">
				<ul className="imgType">
					<li className="cur">外观(10)</li>
					<li>内饰(10)</li>
					<li>细节(11)</li>
				</ul>

				<ul className="color">
					<li className="cur"></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>

			<div className="preview">
				<h3>图片预览</h3>
				<ul className="clearfix">
					<li><img src="" alt="pic" /> </li>
					<li><img src="" alt="pic" /> </li>
					<li><img src="" alt="pic" /> </li>
					<li><img src="" alt="pic" /> </li>
					<li><img src="" alt="pic" /> </li>
					<li><img src="" alt="pic" /> </li>
					<li><img src="" alt="pic" /> </li>
					<li><img src="" alt="pic" /> </li>
				</ul>
			</div>

			<div className="picNav">
				<ul>
					<li className="cur"></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>
	);
};

export default SideBox;
