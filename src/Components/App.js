import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import reset from "styled-reset";
import Router from "./Router";
import axios from "axios";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { setSocket } from '../modules/Socket';

let socket = new SockJS("http://4m2d.shop/4m2d");
let stompClient = Stomp.over(socket);
stompClient.debug= () => {};

function App() {
	const dispatch = useDispatch();
	dispatch(setSocket(socket, stompClient));
	return (
		<BrowserRouter>
			<Router />
			<GlobalStyles />
			<ScrollToTop />
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
		-ms-overflow-style: none;
		::-webkit-scrollbar { display: none; }
		margin: 0;
		padding: 0;
		background-color: #fdfdfd;
		/*background-color: #dbf3f5;*/
		/*font-family: var(---font-face);*/
		font-family: 'Noto Sans KR', sans-serif;
		--color-hover: "rgb(130, 130, 238)";
		--BackColor: "#fdfdfd";
		--LineColor: "#c0c0c0";
		--MintColor: "rgb(178, 232, 229)";

	}
	html {
		--color-hover: "rgb(130, 130, 238)";
		--BackColor: "#fdfdfd";
		--LineColor: "#c0c0c0";
		--MintColor: "rgb(178, 232, 229)";

	}
	:root {
		font-size: 16px;
		--color-hover: "rgb(130, 130, 238)";
		--font-face: 'Noto SansKR';
	}

`;

export default App;
