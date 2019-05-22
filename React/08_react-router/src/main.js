import React from 'react';
import ReactDom from 'react-dom';
import App from './App.js';

const rootElement = document.querySelector("#root");

if (module.hot) {
	module.hot.accept((App) => {
		ReactDom.render(
			<div>113331</div>
			,
			rootElement
		)
	})
}

// ReactDom.render(
// 	<div>
// 		<App />
// 	</div>,
// 	rootElement
// )
