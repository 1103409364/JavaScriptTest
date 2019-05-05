import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
// import reducer from "./reducer";
import App from "./App";

const rootElement = document.getElementById("root");

const store = createStore(reducer);
render(
	<Provider store={store}>
		<App></App>
	</Provider>,
	rootElement
)