import React, { useState } from "react";
import axios from "axios";
import Nongdam from "../../Images/nongdam.png";
import styled from "styled-components";

function	ProfileImg()
{
	return (
		<ProfileImgC>
			<img src={Nongdam}/>
		</ProfileImgC>
	)
}

function	ProfileName()
{
	return (
		<ProfileNameC>
			<span>hyeolee</span>
		</ProfileNameC>
	)
}

function	ProfileContents()
{
	return (
		<ProfileContentsC>
			<span>선한 영향력을 주는 프론트엔드 개발자</span>
		</ProfileContentsC>
	);
}

function	ProfileLevel()
{
	return (
		<ProfileLevelC>
			<span>Level: 42</span>
			<ProfileLevelBar></ProfileLevelBar>
		</ProfileLevelC>
	)
}

function	ProfileLevelBar()
{
	return (
		<ProfileLevelBarC>
			<span>42%</span>
			<ProgressBarC>
			</ProgressBarC>
		</ProfileLevelBarC>
	)
}


// 전체 긁어오기

function	ProfileBar()
{
	return (
		<ProfileBarC>
			<ProfileImg></ProfileImg>
			<ProfileName></ProfileName>
			<ProfileLevel></ProfileLevel>
			<ProfileContents></ProfileContents>
		</ProfileBarC>
	)
}


const		ProfileContentsC = styled.div`
  	width: 280px;
  	margin: 20px 0px;
  	span {
	  opacity: 0.7;
	  font-size: 15px;
      font-family: "Devanagari Sangam MN";
	}
`;

const		ProfileNameC = styled.div`
	width: 260px;
  	height: 30px;
	margin: 10px 0px;
  span {
    opacity: 0.7;
    font-weight: 600;
    font-size: 30px;
  }
`;

const		ProfileBarC = styled.div`
  width: 280px;
  height: 600px;
`;


const		ProfileImgC = styled.div`
  img {
    width: 280px;
    height: 280px;
	border-radius: 20px;
	border: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const		ProfileLevelC = styled.div`
  	margin: 14px 0px;
	span {
	  font-size: 15px;
	  font-family: "Devanagari Sangam MN";
	  opacity: 0.7;
	}
`;

const		ProfileLevelBarC = styled.div`
  	width: 280px;
  	height: 30px;
  	background-color: rgba(0, 0, 0, 0.1);
  	display: flex;
    position: relative;
  	align-items: center;
  	overflow: hidden;
  	border-radius: 7px;
	span {
		position: absolute;
		left: 50%;
		transform: translate(-50%);
		opacity: 0.5;
		font-family: "TmoneyRoundWindExtraBold";
	}
`;

const		ProgressBarC = styled.div`
  	background-color: rgb(199, 230, 232);
	width: 42%;
  	height: 30px;
`;


export default ProfileBar;
