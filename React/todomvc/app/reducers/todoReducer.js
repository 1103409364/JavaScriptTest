const initinalState = {
	todoList: [{}],
}

const todoReducer = ( state=initinalState, action ) => {
	switch(action.type) {
		case "ADD": 
			return {add: "add"};

		default:
			return state;
	}
}

export default todoReducer;