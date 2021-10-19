import React from "react";
import ReactDOM from "react-dom";
import GlobalFonts from "./Styles/fonts";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<App />
		<GlobalFonts />
	</React.StrictMode>,
	document.getElementById("root")
);
//ReactDOM.render(element, document.getElementById('checkmybody'));
