const intinalState = { "v": 0 };

const counterReducer = (state = intinalState, action) => {
	switch (action.type) {
		case "ADD":
			return { ...state, "v": state.v + 1 };
		case "MINUS":
			return { ...state, "v": state.v - 1 };
		case "ADDNUM":
			return { ...state, "v": state.v + action.num };

		default:
			return state
	}
}

export default counterReducer;