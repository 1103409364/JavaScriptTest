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

		changeType(state, { payload: { albumtype } }) {
			return {
				...state,
				"position": {
					...state.position,
					"album": albumtype,
					"idx": 0
				}
			};
		},

		changeColor(state, { payload: { color } }) {
			var albums = state.images[state.position.color];
			var albumArr = ["view", "center", "detail"].filter((item) => {
				return albums.hasOwnProperty(item);
			});

			if (state.images[color].hasOwnProperty(state.position.album)) {
				console.log(albumArr);
				return {
					...state,
					"position": {
						...state.position,
						"color": color,
						"idx": 0
					}
				};
			} else {
				return {
					...state,
					"position": {
						...state.position,
						"album": "view", //如果没有内饰，恢复为外观
						"color": color,
						"idx": 0
					}
				};
			}
		},

		changePicIdx(state, { payload: { index } }) {
			return {
				...state,
				"position": {
					...state.position,
					"idx": index
				}
			};
		},
		nextPic(state) {
			// images - color -view center detail ,从小到大判断
			// view center detail
			var albums = state.images[state.position.color];
			var albumArr = ["view", "center", "detail"].filter((item) => {
				return albums.hasOwnProperty(item);
			});
			var albumIdx = albumArr.indexOf(state.position.album)

			var colorArr = Object.keys(state.images);
			var colorIdx = colorArr.indexOf(state.position.color);

			if (state.position.idx < albums[state.position.album].length - 1) {
				return {
					...state,
					"position": {
						...state.position,
						"idx": state.position.idx + 1
					}
				};
			} else if (albumIdx < albumArr.length - 1) {
				return {
					...state,
					"position": {
						...state.position,
						"album": albumArr[albumIdx + 1],
						idx: 0
					}
				}
			} else if (colorIdx < colorArr.length - 1) {
				return {
					...state,
					"position": {
						...state.position,
						"color": colorArr[colorIdx + 1],
						"album": "view",
						idx: 0
					}
				}
			}


			else {
				alert("已经到最后了！");
				return state;
			}
		},
	},

};
