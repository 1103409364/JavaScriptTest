import React from 'react';
import { connect } from 'dva';
import './Album.less';
import SideBox from "../components/SideBox";
import BigImg from '../components/BigImg'

class Album extends React.Component {
	constructor(props) {
		super(props);
		props.init();
	}

	render() {
		return (
			<div className="album">
				<SideBox  images = { this.props.images} position = { this.props.position }/>
				<BigImg  imgNow = { this.props.imgNow } />
			</div>
		);
	}
}

const mapStateToProps = ({ albumModel }) => {
	console.log(albumModel);
	
	if ( Object.keys(albumModel.images).length > 0 ) {
		const album = albumModel.position.album;
		const color = albumModel.position.color;
		const idx = albumModel.position.idx;
		console.log(albumModel.images[color][album]);

		// console.log(albumModel.images[albumModel.position.album]);
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
	}

})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Album);
// 需要 connect model 的路由组件；