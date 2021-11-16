import styled from "styled-components";
import React, { useEffect, useState, Component } from "react";
import Header from "./Header";
import MainBanner from "./Banner";
import CategoryBar from "./CategoryBar";
import PreviewPost from "./PreviewPost";
import Footer from "./Footer";
import { Cookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../modules/Login";
function Mainpage() {
	//const test = useSelector(state => state.Login);
	//console.log(test.isLogin, "테스트 한번 해봅시다.");
	//const dispatch = useDispatch();
	//const set_token = () => dispatch(setToken("안녕하세요qweqweqwe"));
	//useEffect(() => {
	//	set_token();
	//},[])
	//console.log(test);
	const cookie = new Cookies()
	console.log(cookie.getAll());
	const { userId: id, Authorization: token, subscribes: sub } = cookie.getAll();
	console.log(id, token, sub);
	const [HeaderState, setHeaderState] = useState(false);
	const [ScrollY, setScrollY] = useState(0);
	//const handleFollow  = () => {
	//	setScrollY(window.pageYOffset);
	//	if (ScrollY > 650)
	//		setHeaderState(true);
	//	else
	//		setHeaderState(false);
	//}
	//useEffect(() => {
	//	const watch = () => {
	//		window.addEventListener('scroll', handleFollow);
	//	}
	//	watch();
	//	return () => {
	//		window.removeEventListener('scroll', handleFollow);
	//	}
	//})

	return (
		<SectionC>
			{/*{HeaderState ? <Header/> : null}*/}
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
