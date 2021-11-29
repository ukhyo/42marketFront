import React, { useState, useReducer } from "react";
import axios from "axios";
import {Route} from 'react-router-dom';
import styled from "styled-components";
import Header from "../../Components/Mainpage/Header"
import ProfileBar from "./M_Profile";
import NaviBar from "./M_Navibar";
import InfoList from "./M_Infolist";

function	MypageMain(props)
{
	const { name } = props;

	const id = props.name.id;
	const url = props.name.url;
	return (
		<MypageMainC>
			<ProfileBar url={name}/>
			<NaviBar name={name}/>
			<InfoList id={id} url={url} />
		</MypageMainC>
	);
}

function	M_Mypage({match})
{
	const { params }  = match;
	return (
		<MypageC>
			<Header />
			<MypageMain name={params}/>
		</MypageC>
	);
};

const		MypageC = styled.div`
	width: 100%;
	min-width: 500px;
`;

const		MypageMainC = styled.div`
	height: 100%;
	display: flex;
    flex-direction: column;
	justify-content: center;
	align-content: center;
`;

export default M_Mypage;
