import React, { useState, useEffect } from "react";
import axios from "axios";
import Coming_soon from "../../Images/coming_soon.jpeg";
import useAsync from "./useAsync";
import styled from "styled-components";
import awsData from "../../secret.json";
import { FaImage } from 'react-icons/fa';
import AWS from "aws-sdk";
import { timeout } from "q";
import S3 from "react-aws-s3";

async function getProfile()
{
	const response = await axios.get(
		'http://localhost:3001/profile'
	);
	return response.data;
}

function	ProfileBar(props)
{
	console.log(props);
	const ACCESS_KEY = awsData.accesskey;
	const SECRET_ACCESS_KEY = awsData.secretkey;
	const REGION = awsData.awsregion;
	const S3_BUCKET_NAME = awsData.s3burket;

	const s3_config = {
		bucketName: S3_BUCKET_NAME,
		region: REGION,
		accessKeyId: ACCESS_KEY,
		secretAccessKey: SECRET_ACCESS_KEY,
		dirName: "user",
	};

	const ReactS3 = new S3(s3_config);

	const [state] = useAsync(getProfile, ["profile"]);
	const [onButton, setOnButton] = useState(false);
	const [intro, setIntro] = useState("");
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
		const params = {
			ACL: "public-read",
			Body: file,
			Bucket: S3_BUCKET_NAME,
			Key: "user/1",
		};
		myBucket
			.putObject(params)
			.send((err) => {
				if (err) console.log(err);
			});
		setTimeout(() => {
			window.location.reload();
		}, 1000)
	};

	const onButtonClick = () => {
		setOnButton(true);
	};
	const inputIntro = (e) => {
		setIntro(e.target.value);
	};
	const submitHandler = (e) => {
		const pushData = async () => {
			let data = {
				name: profile.name,
				level: profile.level,
				intro: intro
			};
			await axios.put("http://localhost:3001/profile/", data);
		}
		pushData();
		setOnButton(false);
		setTimeout(() => {
			window.location.reload();
		}, 1000)
	}
	if (loading) return <div>loading...</div>;
	if (error) return <div>Error occured</div>;
	if (!profile) return null;

	return (
		<ProfileBarC>
			<ProfileImgC>
				<img src="https://42trademarket.s3.ap-northeast-2.amazonaws.com/user/1.jpeg"/>
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
			{ onButton === false ? <ProfileModifyBtnC onClick={onButtonClick}>
				<span>Edit introduce</span>
			</ProfileModifyBtnC> :
			<ModifyIntroC>
				<textarea
					type="text"
					cols="32"
					rows="10"
					value={intro}
					onChange={inputIntro}
				/>
				<button  onClick={submitHandler}>등록</button>
			</ModifyIntroC>
			}
			<BadgeC>
				<img src={Coming_soon} />
			</BadgeC>
		</ProfileBarC>
	)
}

const		ModifyIntroC = styled.div`
    margin: 3px 0px;
	> textarea {
		width: 100%;
		height: 200px;
		outline: none;
		border-radius: 7px;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
	> button {
		width: 50px;
		height: 30px;
		outline: none;
		border-radius: 7px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		background-color: rgba(205, 229, 231, 0.7);
		&:hover {
			background-color: rgba(205, 229, 231);
			transition: background-color 0.3s ease-in-out;
        }
	}
`;

const		BadgeC = styled.div`
	width: 100%;
	height: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	> img {
		position: relative;
		bottom: -50px;
	}
`;

const		ProfileModifyBtnC = styled.button`
	width: 280px;
	height: 45px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 15px;
	margin-top: 50px;
	margin-bottom: 10px;
	> span {
		font-weight: 600;
		font-size: 15px;
		color: rgb(76, 76, 76);
	}
`;

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
		top: 30px;
		justify-content: center;
		align-items: center;
	}
`;

const		ProfileContentsC = styled.div`
  	width: 270px;
  	margin: 20px 5px;
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
	margin-top: 5px;
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
  	height: 500px;
`;


export default ProfileBar;
