import React from "react";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import ReactDOM from "react-dom";
import "./app.css";
import App from "./Components/App";
//import App from "./testApp";


const store = createStore(rootReducer);
ReactDOM.render(
	<Provider store={store}>
			<App />
	</Provider>,
	document.getElementById("root")
);

//ReactDOM.render(element, document.getElementById('checkmybody'));
