import styled from "styled-components";
import React, { Component } from "react";
import Header from "./Header";
import MainBanner from "./Banner";
import Category from "./Category";
import PreviewPost from "./PreviewPost";
import Footer from "./Footer";


function Mainpage() {
	return (
		<SectionC>
			<Header />
			<MainBanner />
			<Category />
			<PreviewPost />
			<Footer />
		</SectionC>
	);
}

const SectionC = styled.section`
	margin: 0 auto;
`;

export default Mainpage;
