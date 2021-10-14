import { createGlobalStyle } from "styled-components";
import React, { useEffect, useState } from "react";
import Mainpage from "./Mainpage/Mainpage";
import Mypage from "./Components/Mypage/Mypage";
import { BrowserRouter, Route } from "react-router-dom";
import PostDetail from "./PostDetail/PostDetail";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

function App() {
	console.log("%c in Function", "color: blue");
	return (
		<BrowserRouter>
			<Section>
				<GlobalStyles />
				<ScrollToTop />
				<Route path={"/"} exact component={Mainpage} />
				<Route path={"/mypage"} component={Mypage} />
				<Route path={"/post/detail"} component={PostDetail} />
			</Section>
		</BrowserRouter>
	);
}

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

const Section = styled.section``;

const GlobalStyles = createGlobalStyle`
	body {
		/*height: 3000px;*/
		margin: 0;
		background-color: #f5f5f5;
		font-family: 'TmoneyRoundWindExtraBold';
	}
`;

// test App Component
export default App;
