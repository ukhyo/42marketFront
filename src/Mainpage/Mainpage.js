import styled from "styled-components";
import React, {Component} from "react";
import Header from "./Header";
import MainBanner from "./Banner";
import Category from "./Category";
import PreviewPost from "./PreviewPost";

function Mainpage() {
	return (
		<SectionC>
			<Header />
			<MainBanner />
			<Category />
		</SectionC>
	);
}

const SectionC = styled.section``;

export default Mainpage;
