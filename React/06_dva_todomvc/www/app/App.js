import React from "react";
// import { connect } from "dva";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import TodoFilter from './components/TodoFilter'

class App extends React.Component {
	// constructor() {
	// 	super();
	// }

	render() {
		return <div>
			<h1>todo list</h1>
			<AddTodo />
			<TodoList />
			<TodoFilter />
			{/* <h1>{this.props.v}</h1>
			<button onClick={() => { this.props.dispatch({ "type": "counter/add", "payload": { "number": 1 } }) }}>+</button>
			{" "}
			<button onClick={() => { this.props.dispatch({ "type": "counter/add", "payload": { "number": 2 } }) }}>+2</button>
			{" "}
			<button onClick={() => { this.props.dispatch({ "type": "counter/minus" }) }}>-</button>
			{" "}
			<button onClick={() => { this.props.dispatch({ "type": "counter/addFile" }) }}>加接口中的数</button> */}
		</div>
	}
}

export default App;
// connect(
// 	({ counter }) => ({
// 		v: counter.v
// 	})
// )(App);
