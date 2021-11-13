import React from "react";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import ReactDOM from "react-dom";
import App from "./Components/App";


const store = createStore(rootReducer);
console.log("store", store.getState());
ReactDOM.render(
	<Provider store={store}>
			<App />
	</Provider>,
	document.getElementById("root")
);

//ReactDOM.render(element, document.getElementById('checkmybody'));
