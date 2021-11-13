import styled from "styled-components";
import React, { useEffect, useState, Component } from "react";
import Header from "./Header";
import MainBanner from "./Banner";
import CategoryBar from "./CategoryBar";
import PreviewPost from "./PreviewPost";
import Footer from "./Footer";

function Mainpage() {
	const [HeaderState, setHeaderState] = useState(false);
	const [ScrollY, setScrollY] = useState(0);
	const handleFollow  = () => {
		setScrollY(window.pageYOffset);
		if (ScrollY > 650)
			setHeaderState(true);
		else
			setHeaderState(false);
	}
	useEffect(() => {
		const watch = () => {
			window.addEventListener('scroll', handleFollow);
		}
		watch();
		return () => {
			window.removeEventListener('scroll', handleFollow);
		}
	})

	return (
		<SectionC>
			{HeaderState ? <Header/> : null}
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
