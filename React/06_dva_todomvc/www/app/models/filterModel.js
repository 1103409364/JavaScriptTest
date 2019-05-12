export default {
	namespace: "filterModel",
	state: {
		"show": "all",
	},

	reducers: {
		changehow(state, action) {
			// console.log(action.payload)
			return {
				...state,
				"show": action.payload.show
			}
		},
	},
}
