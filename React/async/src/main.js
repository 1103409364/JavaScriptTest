import React from "react";
import ReactDom from "react-dom";

import App from "./App";

const rootElement = document.querySelector("#app");

if (module.hot) {
	module.hot.accept(() => {
	  ReactDom.render(
		  <App />,
		  rootElement
	  )
	})
  }

ReactDom.render(
	<App></App>,
	rootElement
)