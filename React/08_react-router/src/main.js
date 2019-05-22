import React from 'react';
import ReactDom from 'react-dom';
import App from './App.js';

const rootElement = document.querySelector("#root");

if (module.hot) {
	module.hot.accept(() => {
		ReactDom.render(
			<div>
				<App />
			</div>,
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
