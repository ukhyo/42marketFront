import React from "react";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from "react-dom";
import App from "./Components/App";
//import App from "./testApp";

const isLogin = false;

function reducer(state = isLogin, action)
{
	if (action.type === 'LOGIN_SUCCESS')
	{
		state = true;
		return state;
	}
	else if (action.type === 'LOGIN_FAILED')
	{
		state = false;
		return (state);
	}
	else
		return state;
}

const store = createStore(reducer);
ReactDOM.render(
	<Provider store={store}>
			<App />
	</Provider>,
	document.getElementById("root")
);

//ReactDOM.render(element, document.getElementById('checkmybody'));
