import React from 'react';
import { connect } from 'dva';
import './Album.less';
import SideBox from "../components/SideBox";
import BigImg from '../components/BigImg'

function Album() {
	return (
		<div className="album">
			<SideBox />
			<BigImg />
		</div>
	);
}

Album.propTypes = {
};

export default connect()(Album);
// 需要 connect model 的路由组件；