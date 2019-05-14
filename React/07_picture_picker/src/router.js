import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Album from './routes/Album';

function RouterConfig({ history }) {
	return (
		<Router history={history}>
			<Switch>
				<Route path="/" exact component={Album} />
			</Switch>
		</Router>
	);
}

export default RouterConfig;
