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
	return (
		<MypageMainC>
			<ProfileBar />
			<InfoList url={props.name} id={1}/>
		</MypageMainC>
	);
}

function	Mypage({ match })
{
	const { tabs } = match.params;
	return (
		<div>
			<Header />
			<NaviBar name={tabs}/>
			<MypageMain name={tabs}/>
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
