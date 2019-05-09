import React from "react";

class App extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// api在3000端口，webpack dev在8080端口，这样就有跨域问题
		fetch('http://localhost:3000/getData', { "method": "get" })
			.then((response) => response.json())
			.then((json) => console.log(json))
	}

	render() {
		return (
			<div>
				Hello world
			</div>
		)
	}
}

export default App;