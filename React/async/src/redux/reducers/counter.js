import { ADD, INIT } from "../actionTypes";
// 初始化状态
const initinalState = { "v": 0 }

const counter = (state = initinalState, action) => {
	console.log(action)
	switch (action.type) {
		case ADD:
			return {
				...state,
				"v": state.v + action.payload.n
			};
// 从服务器得到的初始化数据
case INIT:
	return {
		...state,
		"v": action.payload.n
	}
		default:
			return state;
	}
}

export default counter;