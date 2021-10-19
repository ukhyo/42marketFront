import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../../Mainpage/Header";
import ProfileBar from "./Profile";
import NaviBar from "./Navibar";
import BuyList from "./Infolist";

function	MypageMain()
{
	return (
		<MypageMainC>
			<ProfileBar></ProfileBar>
			<BuyList></BuyList>
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
