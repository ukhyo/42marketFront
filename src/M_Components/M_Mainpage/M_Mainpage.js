import styled from "styled-components";
import React, { useEffect, useState, Component } from "react";
import { Cookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import M_Header from "./M_Header";
import M_CategoryBar from "./M_CategoryBar";
import M_PreviewPost from "./M_PreviewPost";
import M_Banner from "./M_Banner";
function M_Mainpage() {
	return (
		<SectionC>
			<M_Header />
			<M_Banner />
			<M_CategoryBar />
			<M_PreviewPost />
			{/*<M_Footer />*/}
		</SectionC>
	);
}


const SectionC = styled.section`
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
`;

const CheckC = styled.div`
	color: red;
	margin: 0 auto;
	height: 1000px;
	width: 100%;
`;

export default M_Mainpage;
