import React from 'react';
import { connect } from 'dva';
import './Album.less';
import ImgType from "../components/ImgType";
import ColorPicker from "../components/ColorPicker";
import Preview from "../components/Preview";
import BigImg from '../components/BigImg'

class Album extends React.Component {
	constructor(props) {
		super(props);
		props.init();
	}

	render() {
		return (
			<div className="album">
				<div className="sideBox" >
					<h2>丰田卡罗拉</h2>
					<p>2199款 AI自动驾驶</p>
					{/* 图片类型 */}
					<div className="type">
						<ImgType
							images={this.props.images}
							position={this.props.position}
							changeType={this.props.changeType.bind(this)}
						/>
						<ColorPicker
							images={this.props.images}
							position={this.props.position}
							changeColor={this.props.changeColor.bind(this)}
						/>
					</div>
					{/* 预览小图 */}
					<Preview
						images={this.props.images}
						position={this.props.position}
						changePicIdx={this.props.changePicIdx.bind(this)}
					/>
				</div>

				<BigImg
					imgNow={this.props.imgNow}
					nextPic={this.props.nextPic.bind(this)}
					prevPic={this.props.prevPic.bind(this)}
				/>
			</div>
		);
	}
}

const mapStateToProps = ({ albumModel }) => {
	if (Object.keys(albumModel.images).length > 0) {
		const album = albumModel.position.album;
		const color = albumModel.position.color;
		const idx = albumModel.position.idx;

		return {
			images: albumModel.images,
			position: albumModel.position,
			imgNow: albumModel.images[color][album][idx],
		}
	}
	return {
		images: {},
		position: albumModel.position,
		imgNow: "",
	};
}

const mapDispatchToProps = (dispatch) => ({
	init() {
		dispatch({ "type": "albumModel/init_async" })
	},
	changeType(albumtype) {
		dispatch({ "type": "albumModel/changeType", payload: { albumtype } })
	},
	changeColor(color) {
		dispatch({ "type": "albumModel/changeColor", payload: { color } })
	},
	changePicIdx(index) {
		dispatch({ "type": "albumModel/changePicIdx", payload: { index } })
	},
	nextPic() {
		dispatch({ "type": "albumModel/nextPic" })
	},
	prevPic() {
		dispatch({ "type": "albumModel/prevPic" })
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Album);
// 需要 connect model 的路由组件；