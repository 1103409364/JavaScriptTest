import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Header from './components/Header'

function AppRouter2() {
	return (
		<Router>
			<div>
				<Header />

				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/topics" component={Topics} />
			</div>
		</Router>
	);
}

function Topics({ match }) {
	return (
		<div>
			<h2>Topics</h2>

			<ul>
				<li>
					{/* match.url当前url */}
					<Link to={`${match.url}/components`}>Components</Link>
				</li>
				<li>
					<Link to={`${match.url}/props-v-state`}>Props v. State</Link>
				</li>
			</ul>
			{/* :id 是变量，${match.path}/:id 表示把当前url后面的值赋值给id， Topic组件通过match拿到id*/}
			<Route path={`${match.path}/:id`} component={Topic} />

			<Route
				exact
				path={match.path}
				render={() => <h3>Please select a topic.</h3>}
			/>
		</div>
	);
}

function Topic({ match }) {
	return (
		<div>
			<p>Requested Param: {match.params.id}</p>
			<p>看看match是什么: {JSON.stringify(match)}</p>
		</div>
	)

}

export default AppRouter2;