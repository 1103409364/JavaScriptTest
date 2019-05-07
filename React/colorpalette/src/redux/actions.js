import { ADD_TODO, TOGGLE_TODO, SET_FILTER, UPDATE_TODO } from "./actionTypes";
let nextTodoId = 0;

export const addTodo = content => ({
	type: ADD_TODO,
	payload: {
		id: ++nextTodoId,
		content
	}
});

export const toggleTodo = id => ({
	type: TOGGLE_TODO,
	payload: { id }
});
// payload装载货物，返回{ type: SET_FILTER, payload: { filter } }
export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });