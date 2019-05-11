import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import App from './App.js';
 
const { ConnectedRouter } = routerRedux;
 
function RouterConfig({ history }) {
    return (
        <ConnectedRouter history={history}>
            <Route path="/" exact component={App} />
        </ConnectedRouter>
    );
}
 
export default RouterConfig;