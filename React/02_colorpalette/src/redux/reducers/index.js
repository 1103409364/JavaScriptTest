import { combineReducers } from "redux";
import updateReducer from './updateReducer'

export default combineReducers({
	// 用一个自定义key接一下返回的state是{key：state}这种形式
	rgb: updateReducer
})