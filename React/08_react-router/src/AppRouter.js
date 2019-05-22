import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Users from "./components/Users";

function AppRouter() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about/">About</Link>
						</li>
						<li>
							<Link to="/users/">Users</Link>
						</li>
					</ul>
				</nav>

				<Route path="/" exact component={Home} />
				<Route path="/about/" component={About} />
				<Route path="/users/" component={Users} />
			</div>
		</Router>
	);
}

export default AppRouter;