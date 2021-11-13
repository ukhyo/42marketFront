import styled from "styled-components";
import React, { useEffect, useState, Component } from "react";
import Header from "./Header";
import MainBanner from "./Banner";
import CategoryBar from "./CategoryBar";
import PreviewPost from "./PreviewPost";
import Footer from "./Footer";
import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";

function Mainpage() {
	console.log("hi");
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
