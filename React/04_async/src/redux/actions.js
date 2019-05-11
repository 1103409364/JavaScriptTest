import { ADD, INIT } from "./actionTypes";
// 形参n表示要加多少
export const add = n => ({ "type": ADD, payload: { n } })


// store.dispatch方法正常情况下，参数只能是对象，不能是函数。这时，就要使用中间件redux-thunk。
// 让dispatch可以接受函数为参数,这样dispatch就能继续往内层函数里传
// 
// 用户操作返回第一个action,这个action是个异步函数,返回数据的时候,发出第二个action.
// 返回的第一个action依然会被dispatch包裹。不需要更改connect的代码
export const addServerNum = () => async dispatch => {
	// 先用ajax得到服务器上某个值，再利用这个值发出dispatch改变store，
	// action要带着从服务器上下来的值当做载荷，此时必须使用dispatch的“延时插件
	let { n } = await fetch("http://localhost:3000/getData")
		.then((response) => response.json());
	// async声明这是一个异步函数,await让后面的语句等等
	dispatch({ "type": ADD, payload: { n } });
}

export const getInitialData = () => async dispatch => {
	// 服务器返回的是{"n": 5}这种形式，所以还要用n解构
	let { n } = await fetch("http://localhost:3000/getInit")
		.then((response) => response.json());

	dispatch({ "type": INIT, payload: {n} })
}