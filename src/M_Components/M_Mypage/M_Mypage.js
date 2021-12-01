import React, { useState, useReducer } from "react";
import axios from "axios";
import {Route} from 'react-router-dom';
import styled from "styled-components";
import Header from "../../Components/Mainpage/Header"
import ProfileBar from "./M_Profile";
import NaviBar from "./M_Navibar";
import InfoList from "./M_Infolist";
import Footer from "./M_Footer";

function	MypageMain(props)
{
	const { name } = props;
	const id = props.name.id;
	const url = props.name.url;
	return (
		<MypageMainC>
			<NaviBar name={name}/>
			{
				url === "profile" ?
					<ProfileBar url={name}/> :
					<InfoList id={id} url={url} />
			}
		</MypageMainC>
	);
}

function	M_Mypage({match})
{
	const { params }  = match;
	return (
		<MypageC>
			{/* <Header /> */}
			<MypageMain name={params}/>
			<Footer />
		</MypageC>
	);
};

const		MypageC = styled.div`
	width: 100%;
	margin: 0px auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	max-width: 400px;
`;

const		MypageMainC = styled.div`
	width: 90%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
`;

export default M_Mypage;
