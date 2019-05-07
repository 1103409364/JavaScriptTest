import { UPDATE_R, UPDATE_G, UPDATE_B } from "../actionTypes"

const initinalState = {
	"R": 200,
	"G": 100,
	"B": 0,
}

const updateReducer = (state = initinalState, action) => {
	switch (action.type) {
		case UPDATE_R:
			return {
				...state,
				"R": action.payload.R
			};
		case UPDATE_G:
			return {
				...state,
				"G": action.payload.G
			};
		case UPDATE_B:
			return {
				...state,
				"B": action.payload.B
			};
		// 必须返回一个state
		default:
			return state;
	}
}

export default updateReducer;

