import React, { useEffect, useState } from "react";
import Mainpage from "./Mainpage/Mainpage";
import { BrowserRouter, Route } from "react-router-dom";
import PostDetail from "./PostDetail/PostDetail";
import { createGlobalStyle } from "styled-components";

function App() {
	console.log("%c in Function", "color: blue");
	return (
		<section>
			<BrowserRouter>
				<section>
					<GlobalStyle />
					<Route path={"/"} exact component={Mainpage} />
					<Route path={"/post/detail"} component={PostDetail} />
				</section>
			</BrowserRouter>
		</section>
	);
}

const GlobalStyle = createGlobalStyle`
	font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-size: 30px;
	background-color: black;
`;

// test App Component

export default App;
