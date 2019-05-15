import * as albumService from "../services/album";

export default {
	namespace: 'albumModel',

	state: {
		"images": {},
		"position": {
			"album": "view",
			"color": "",
			"idx": 0
		}
	},

	// subscriptions: {
	// 	setup({ dispatch, history }) {  // eslint-disable-line
	// 	},
	// },

	effects: {
		*init_async({ payload }, { call, put }) {  // eslint-disable-line
			const { data } = yield call(albumService.fetch);

			yield put({ type: 'init', payload: { data } });
		},
	},

	reducers: {
		init(state, { payload: { data: { results } } }) {

			return {
				...state,
				"images": results,
				"position": {
					...state.position,
					"color": Object.keys(results)[0],
					"idx": 0
				}
			};
		},
	},

};
