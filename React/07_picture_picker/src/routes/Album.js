import React from 'react';
import { connect } from 'dva';
import './Album.less';
import Picker from "../components/Picker"


function Album() {
	return (
		<div>
			<Picker/>
		</div>
	);
}

Album.propTypes = {
};

export default connect()(Album);
// 需要 connect model 的路由组件；