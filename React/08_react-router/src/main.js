import React from 'react';
import ReactDom from 'react-dom';
import AppRouter from './AppRouter'; //路由组件 demo1
import AppRouter2 from './AppRouter2'; //加子路由 demo2


const rootElement = document.querySelector("#root");

if (module.hot) {
	module.hot.accept(() => {
		ReactDom.render(
			<AppRouter2 />,
			rootElement
		)
	})
}

ReactDom.render(
	<AppRouter2 />,
	rootElement
)
