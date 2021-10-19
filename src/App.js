import { createGlobalStyle } from "styled-components";
import React, { useEffect, useState } from "react";
import Mainpage from "./Mainpage/Mainpage";
import Mypage from "./Components/Mypage/Mypage";
import { BrowserRouter, Route } from "react-router-dom";
import PostDetail from "./PostDetail/PostDetail";
import styled from "styled-components";

function App() {
	return (
		<BrowserRouter>
			<Section>
				<GlobalStyles />
				<Route path={"/"} exact component={Mainpage} />
				<Route path={"/mypage"} component={Mypage} />
				<Route path={"/post/detail"} component={PostDetail} />
			</Section>
		</BrowserRouter>
	);
}

const Section = styled.section``;

const GlobalStyles = createGlobalStyle`
	body {
		font-family: 'TmoneyRoundWindExtraBold';
	}
`;

// test App Component
export default App;
