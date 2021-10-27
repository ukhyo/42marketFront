import styled from "styled-components";
import React, { Component } from "react";
import Header from "./Header";
import MainBanner from "./Banner";
import CategoryBar from "./CategoryBar";
import PreviewPost from "./PreviewPost";
import Footer from "./Footer";
//import { Cookies } from "react-cookie";
import { setCookie } from "../utils/Cookie";
function Mainpage() {
	//const [cookies, setCookie, removeCookie] = useCookies([]);
	//setCookie("user", "욱헌", { path: '/' });
	//setCookie("user2", "1", { path: "/" });
	//setCookie("user3", "2", { path: "/" });
	//setCookie("user4", "3", { path: "/" });
	//let test = new Cookies();
	let test;
	test.setCookie("uk", "ha", { path: "/" });
	console.log(test.getCookie("uk"));
	return (
		<SectionC>
			<Header />
			<MainBanner />
			<CategoryBar />
			<PreviewPost />
			<Footer />
		</SectionC>
	);
}

const SectionC = styled.section`
	margin: 0 auto;
`;

export default Mainpage;
