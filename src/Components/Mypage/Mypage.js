import React, { useState, useReducer } from "react";
import axios from "axios";
import {Route} from 'react-router-dom'; 
import styled from "styled-components";
import Header from "../Mainpage/Header"
import ProfileBar from "./Profile";
import NaviBar from "./Navibar";
import InfoList from "./Infolist";

function	MypageMain()
{

	return (
		<MypageMainC>
			<ProfileBar />
			<Route
				path="/mypage"
				exact
				render={() => <InfoList />}
			/>
			<Route path="/mypage/:tags" component={ InfoList }/>
		</MypageMainC>
	)
}

function	Mypage()
{
	return (
		<div>
			<Header></Header>
			<NaviBar></NaviBar>
			<MypageMain></MypageMain>
		</div>
	);
};


const		MypageMainC = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

export default Mypage;
