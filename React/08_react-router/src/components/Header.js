import React from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";


function Header() {
	return (
		<ul>
			<li>
				<Link to="/">首页</Link>
			</li>
			<li>
				<Link to="/about">About</Link>
			</li>
			<li>
				<Link to="/topics">Topics</Link>
			</li>
		</ul>
	);
}

export default Header;