export default {
	namespace: "todoModel",
	state: {
		"todos": [
			{ "id": 1, "todo": "吃饭", "done": false },
			{ "id": 2, "todo": "睡觉", "done": false },
			{ "id": 3, "todo": "打豆豆", "done": false },
		],
	},
	//同步
	reducers: {
		add(state, action) {
			// 先找到最大id，新id+1
			const idArr = state.todos.map(item => {
				return item.id;
			})

	
			let maxId = Math.max(...idArr);
			if(idArr.length === 0) {
				maxId = 0;
			}

			return {
				...state,
				"todos": [
					...state.todos,
					{ "id": maxId + 1, "todo": action.payload.todo, "done": false }
				]
			}
		},
		update(state, action) {
			return {
				...state,
				"todos": state.todos.map(item => {
					if (item.id === action.payload.id) {
						return {
							...item,
							"todo":action.payload.todo
						}
					};
					return item;
				})

			}
		},
		delete(state, action) {
			// console.log(state,action)
			return {
				...state,
				"todos": state.todos.filter(item => {
					if (item.id !== action.payload.id) {
						return item;
					};
				})

			}
		},

		toggleDone(state, action) {
			return {
				...state,
				"todos": state.todos.map(item => {
					if (item.id === action.payload.id) {
						return {
							...item,
							"done": !item.done
						}
					};
					return item;
				})

			}
		},

		toggleEdit(state, action) {
			console.log(action)
			return {
				...state,
				"todos": state.todos.map(item => {
					if (item.id === action.payload.id) {
						return {
							...item,
							"done": !item.done
						}
					};
					return item;
				})

			}
		},
	},
	//异步
	// effects: {
	// 	*addFile(action, { call, put }) {
	// 		//写异步语句
	// 		const { result } = yield fetch(" http://localhost:3000/api").then((data) => data.json());
	// 		yield put({ "type": "add", "payload": { "number": result } })
	// 	}
	// }
}
