import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./reducers";
// import Header from "./Header.js";

// Provider组件要求放在最顶层，传入store属性

const rootElement = document.querySelector("#app");
const store = createStore(reducer);

render(
	<Provider store={store} >
		Hello world!!1;
	</Provider>,
	rootElement,
)