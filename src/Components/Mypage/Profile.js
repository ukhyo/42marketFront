import React, { useState, useEffect } from "react";
import axios from "axios";
import Nongdam from "../../Images/nongdam.png";
import useAsync from "./useAsync";
import styled from "styled-components";
import jsonData from "../../secret.json";
import { FaImage } from 'react-icons/fa';
import AWS from "aws-sdk";
import { timeout } from "q";
async function getProfile()
{
	const response = await axios.get(
		'http://localhost:3001/profile'
	);
	return response.data;
}

function	ProfileBar()
{
	const ACCESS_KEY = jsonData.accesskey;
	const SECRET_ACCESS_KEY = jsonData.secretkey;
	const REGION = jsonData.awsregion;
	const S3_BUCKET_NAME = jsonData.s3burket;

	const [state] = useAsync(getProfile, ["profile"]);
	const [files, setFiles] = useState("");
	const { loading, data: profile, error }  = state;

	AWS.config.update({
		accessKeyId: ACCESS_KEY,
		secretAccessKey: SECRET_ACCESS_KEY,
	});

	const myBucket = new AWS.S3({
		params: { Bucket: S3_BUCKET_NAME },
		region: REGION,
	});
	const onChangeImg = (e) => {
		const file = e.target.files[0];
		const getData = async () => {
			const params = {
				ACL: "public-read",
				Body: file,
				Bucket: S3_BUCKET_NAME,
				Key: "user/1",
			};
			await myBucket
				.putObject(params)
				.send((err) => {
					if (err) console.log(err);
				});
		}
		getData();
		setTimeout(()=> {
			console.log("finish");
			setFiles("hhh");
		}, 5000);
		setFiles("h");
	};
	useEffect(()=> {
		console.log("here?!!!");
	},[files])

	if (loading) return <div>loading...</div>;
	if (error) return <div>Error occured</div>;
	if (!profile) return null;

	return (
		<ProfileBarC>
			<ProfileImgC>
				<img src="https://42trademarket.s3.ap-northeast-2.amazonaws.com/user/1"/>
				<label for="ChangeImg">
					<ProfileImgModifyC>
							<FaImage />
					</ProfileImgModifyC>
				</label>
				<input type="file"
						id="ChangeImg"
						onChange={onChangeImg}/>
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

const		ProfileImgModifyC = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	width: 30px;
	height: 30px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	background-color: #fdfdfd;
	border-radius: 15px;
	left: 230px;
	top: 220px;
	> label {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

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
	display: flex;
	position: relative;
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
