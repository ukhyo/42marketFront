import React, { useState, useReducer } from "react";
import axios from "axios";
import {Route} from 'react-router-dom';
import styled from "styled-components";
import Header from "../Mainpage/Header"
import ProfileBar from "./Profile";
import NaviBar from "./Navibar";
import InfoList from "./Infolist";

function	MypageMain(props)
{
	const { name } = props;
	console.log ("MypageMain", name);
	return (
		<MypageMainC>
			<ProfileBar url={name}/>
			<InfoList url={name}/>
		</MypageMainC>
	);
}

function	Mypage({match})
{
	const { params }  = match;
	return (
		<div>
			<Header />
			<NaviBar name={params}/>
			<MypageMain name={params}/>
		</div>
	);
};

const		MypageMainC = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: center;
	align-content: center;
`;

export default Mypage;
