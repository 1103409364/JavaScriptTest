import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App";

const rootElement = document.querySelector("#app");

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);