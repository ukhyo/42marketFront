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
import { setUserId } from "../../modules/User";

function Mainpage() {
	const cookie = new Cookies()
	const { userId: id, Authorization: token, subscribes: sub } = cookie.getAll();
	console.log(id, token, sub);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setUserId(1));
	}, []);
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
	width: 100%;
	margin: 0 auto;
`;

export default Mainpage;
