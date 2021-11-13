import React from "react";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from "react-dom";
import store from "./store";
import App from "./Components/App";
//import App from "./testApp";

ReactDOM.render(
	<Provider store={store}>
			<App />
	</Provider>,
	document.getElementById("root")
);

//ReactDOM.render(element, document.getElementById('checkmybody'));
