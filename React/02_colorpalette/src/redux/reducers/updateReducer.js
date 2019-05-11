import { UPDATE_R, UPDATE_G, UPDATE_B } from "../actionTypes"

const initinalState = [
	{ "color": "R", "v": 200 },
	{ "color": "G", "v": 200 },
	{ "color": "B", "v": 200 }
]
// 改变数据结构
// {
// 	"R": 200,
// 	"G": 100,
// 	"B": 0,
// }

const updateReducer = (state = initinalState, action) => {
	switch (action.type) {
		case UPDATE_R:
			return state.map((item) => {
				if (item.color === "R") {
					return { "color": "R", "v": action.payload.R }
				} else {
					return { ...item }
				}
			});

		case UPDATE_G:
			return state.map((item) => {
				if (item.color === "G") {
					return { "color": "G", "v": action.payload.G }
				} else {
					return { ...item }
				}
			});
			
		case UPDATE_B:
			return state.map((item) => {
				if (item.color === "B") {
					return { "color": "B", "v": action.payload.B }
				} else {
					return { ...item }
				}
			});
		default:
			return state;
	}
}

export default updateReducer;

