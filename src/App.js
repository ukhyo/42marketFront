import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import reset from "styled-reset";
import Mypage from "./Components/Mypage/Mypage";
import Mainpage from "./Components/Mainpage/Mainpage";
import PostDetail from "./Components/PostDetail/PostDetail";

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

const Section = styled.section`
	/*font-family: 'Noto Sans KR';*/
`;

const GlobalStyles = createGlobalStyle`
 ${reset}
@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  src: url('../fonts/noto-sans-kr-v21-latin-regular.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('../fonts/noto-sans-kr-v21-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../fonts/noto-sans-kr-v21-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('../fonts/noto-sans-kr-v21-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('../fonts/noto-sans-kr-v21-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('../fonts/noto-sans-kr-v21-latin-regular.svg#NotoSansKR') format('svg'); /* Legacy iOS */
}
	body {
		margin: 0;
		padding: 0;
		background-color: #fdfdfd;
		/*background-color: #dbf3f5;*/
		font-family: 'Noto Sans KR';
	}
`;

// test App Component
export default App;
