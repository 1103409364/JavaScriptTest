const intinalState = { "v": 0 };

export default (state = intinalState, action) => {
	switch (action.type) {
		case "ADD":
			return { ...state, "v": state.v + 1 };
		case "MINUS":
			return { ...state, "v": state.v - 1 };
		case "ADDNUM":
			return { ...state, "v": state.v + action.num };
	}
	// 返回一个新state
	return state;
}