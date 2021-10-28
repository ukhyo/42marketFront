import React, { useState } from "react";
import axios from "axios";
import Nongdam from "../../Images/nongdam.png";
import useAsync from "./useAsync";
import styled from "styled-components";

async function getProfile()
{
	const response = await axios.get(
		'http://localhost:3001/profile'
	);
	return response.data;
}

function	ProfileBar()
{
	const [state, refetch] = useAsync(getProfile, []);
	const { loading, data: profile, error }  = state;

	if (loading) return <div>loading...</div>;
	if (error) return <div>Error occured</div>;
	if (!profile) return null;

	return (
		<ProfileBarC>
			<ProfileImgC>
				<img src={Nongdam}/>
			</ProfileImgC>
			<ProfileNameC>
				<span>{profile.name}</span>
			</ProfileNameC>
			<ProfileLevelC>
				<span>Level: {profile.level}</span>
				<ProfileLevelBarC>
					<span>{profile.level}%</span>
					<ProgressBarC percent={profile.level}>
					</ProgressBarC>
				</ProfileLevelBarC>
			</ProfileLevelC>
			<ProfileContentsC>
				<span>{profile.intro}</span>
			</ProfileContentsC>
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
  margin-top: 30px;
`;


const		ProfileImgC = styled.div`
  img {
    width: 280px;
    height: 280px;
	border-radius: 150px;
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
	width: ${({ percent }) => percent}%;
  	height: 30px;
`;


export default ProfileBar;
