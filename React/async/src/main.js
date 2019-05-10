import React from "react";
import ReactDom from "react-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

import App from "./App";

const rootElement = document.querySelector("#app");

// 为了HRM功能，这里需要包一层代码
if (module.hot) {
	module.hot.accept(() => {
		ReactDom.render(
			<Provider store={store}>
				<App></App>
			</Provider>,
			rootElement
		)
	})
}

ReactDom.render(
	<Provider store={store}>
		<App></App>
	</Provider>,
	rootElement
)