// 数据筛选器
export const getColor = state => {
	// console.log(state);
	// 取出rgb值
	let rgb = state.rgb.reduce((pre, cur) => {
		pre[cur["color"]] = cur["v"];
		return pre;
	}, {})
	return rgb;
};

export const getAll = state => {
	return state;
};