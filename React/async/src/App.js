import React from "react";
import { connect } from "react-redux";
// 将所有action creator整合到一个对象中，actions是一个对象，里面有action creator
import * as actions from "./redux/actions";

class App extends React.Component {
	constructor(props) {
		super(props)
		// console.log(actions);
		//发出请求
		this.props.getInitialData();
	}

	render() {
		return (
			<div>
				Hello world!!
				<p>val: {this.props.val.v}</p>
				<button onClick={() => this.props.add(2)} >按我加2</button>
				{" "}
				<button onClick={() => this.props.addServerNum()} >按我加api接口中的数字</button>
				{/* log一下props，看看state和action creator进来了吗 */}
				{/* {console.log(this.props)} */}
			</div>
		)
	}
}

// 映射数据state和props
// selector在这里使用，筛选数据，使用时导入该文件
const mapPropsToState = state => {
	// console.log(state);
	return state;
}

// 映射事件和props
// actions在这里使用
// const mapDispatchToprops = (dispatch) => ({
//  "actions": actions
// })
// 第二个参数可以不用mapDispatchToprops函数，直接用对象，action creator将合并到props中
// 组件内使用的时候直接this.props.xxx就行，xxx是在actions.js中写好的action creator的函数名
// action creator返回一个action 形如：{ type：ADD， 。。。 }，
// action会被自动包一层dispatch({ type：ADD， 。。。 }),react-redux帮我们分发action
// 然后store调用reducer更新state。state一更新，react diff算法起作用，刷新视图
export default connect(mapPropsToState, actions)(App);


// componentDidMount() {
// 	// api在3000端口，webpack dev在8080端口，这样就有跨域问题
// 	fetch('http://localhost:3000/getData', { "method": "get" })
// 		.then((response) => response.json())
// 		.then((json) => console.log(json))
// }