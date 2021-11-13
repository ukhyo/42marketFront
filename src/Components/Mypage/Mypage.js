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
			<InfoList url={props.name}/>
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
	display: flex;
	justify-content: center;
	align-content: center;

`;

export default Mypage;
