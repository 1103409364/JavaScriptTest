import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from './App'

const rootElement = document.querySelector("#app");
ReactDom.render(
	<Provider store={store} >
		<App/>
	</Provider>,
	rootElement
)