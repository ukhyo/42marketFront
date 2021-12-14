import React, { useState, useEffect } from "react";
import axios from "axios";
import Coming_soon from "../../Images/coming_soon.jpeg";
import useAsync from "./M_useAsync";
import styled from "styled-components";
import Badge from "./M_Badge";
import { FaImage } from 'react-icons/fa';
import { timeout } from "q";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";

async function getProfile(id)
{
	const response = await axios.get(
		`http://api.4m2d.shop/api/users/${id}`
	);
	return response.data;
}

function	ProfileBar({ url })
{
	const { id: id } = url;
	const cookie = new Cookies();
	let { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();
	const [state] = useAsync(() => getProfile(id), [id]);
	const [onButton, setOnButton] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [intro, setIntro] = useState("");
	const { loading, data: profile, error }  = state;

	const onChangeImg = (e) => {
		if (isLoading)
			return ;
		const file = e.target.files[0];
		let fileList = new FormData();
		fileList.append("image", file);
		// 수정 필요함 id 유저아이디로.
		const ApiPost = async () => {
			const headers = {
				"Authorization": `Bearer ${token}`,
				"Content-Type": `multipart/form-data`,
			};
			setIsLoading(true);
			await axios.post(`http://api.4m2d.shop/api/users/${userId}`, fileList, {headers})
			.then(res => { //아이디 수정해야함
				console.log("성공");
				window.location.reload();
			}).catch(err => {
				console.log("실패");
			});
			setIsLoading(false);
		};
		ApiPost();
	};
	if (userId === undefined)
		userId = "0";
	console.log('experience', profile);
	const onButtonClick = () => {
		setOnButton(true);
	};
	const inputIntro = (e) => {
		setIntro(e.target.value);
	};
	const submitHandler = (e) => {
		if (isLoading)
			return;
		const pushData = async () => {
			let data = {
				introduce: intro
			};
			const headers = {
				"Authorization": `Bearer ${token}`,
			};
			setIsLoading(true);
			await axios.patch(`http://api.4m2d.shop/api/users/${userId}`, data, {headers}).then(res => {
				console.log("성공");
				setTimeout(() => {
					window.location.reload();
				}, 500)
			}).catch(err => {
				console.log("실패");
			});
			setIsLoading(false);
		}
		pushData();
	}
	console.log(profile, "profile");
	if (error) return <div>Error occured</div>;
	if (!profile) return null;
	if (userId === id)
		return (
			<ProfileBarC Loading={isLoading}>
				<ProfileInfoC>
					<ProfileImgC Loading={isLoading}>
						<div>
							<img src={ profile.userImage }/>
							<label for="ChangeImg">
								<ProfileImgModifyC>
										<FaImage />
								</ProfileImgModifyC>
							</label>
							<input type="file"
									id="ChangeImg"
									onChange={onChangeImg}/>
						</div>
					</ProfileImgC>
					<ProfileNameC>
						<h1>{profile.userIntra}</h1>
						<span>Level: {profile.userLevel}</span>
					</ProfileNameC>
				</ProfileInfoC>
				<ProfileLevelC>
					<ProfileLevelBarC>
						<span>{profile.userExperience}%</span>
						<ProgressBarC percent={profile.userExperience}>
						</ProgressBarC>
					</ProfileLevelBarC>
				</ProfileLevelC>
				<ProfileContentsC>
					<span>{profile.introduce}</span>
				</ProfileContentsC>
				{ onButton === false ? <ProfileModifyBtnC onClick={onButtonClick}>
					<span>Edit introduce</span>
				</ProfileModifyBtnC> :
				<ModifyIntroC >
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
				{
					profile &&
						<Badge profile={profile}/>
				}

			</ProfileBarC>
		);
	else
		return (
			<ProfileBarC Loading={isLoading}>
				<ProfileInfoC>
					<ProfileImgC Loading={isLoading}>
						<div>
							<img src={profile.userImage}/>
						</div>
					</ProfileImgC>
					<ProfileNameC>
						<h1>{profile.userIntra}</h1>
						<span>Level: {profile.userLevel}</span>
					</ProfileNameC>
				</ProfileInfoC>
				<ProfileLevelC>
					<ProfileLevelBarC>
						<span>{profile.userExperience}%</span>
						<ProgressBarC percent={profile.userExperience}>
						</ProgressBarC>
					</ProfileLevelBarC>
				</ProfileLevelC>
				<ProfileContentsC>
					<span>{profile.introduce}</span>
				</ProfileContentsC>
				{
					profile &&
						<Badge profile={profile}/>
				}
			</ProfileBarC>
		);
}

const		ProfileInfoC = styled.div`
	margin: 20px 0px;
	display: flex;
	flex-direction: column;
	span {
		padding: 5px 0px;
		display: inline-block;
		font-size: 15px;
		font-family: "Devanagari Sangam MN";
		opacity: 0.7;
	}
`;

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


const		ProfileModifyBtnC = styled.button`
	width: 93%;
	height: 45px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 15px;
	margin: 10px 0px;
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
	left: 190px;
	top: 190px;
	> label {
		display: flex;
		top: 30px;
		justify-content: center;
		align-items: center;
	}
`;

const		ProfileContentsC = styled.div`
  	width: 90%;
  	margin: 20px 5px;
  	span {
		white-space: pre-wrap;
		opacity: 0.9;
		font-size: 17px;
		font-family: "Devanagari Sangam MN";
	}
`;


const		ProfileNameC = styled.div`
	margin: 10px 30px;
	justify-content: center;
	align-content: center;
	text-align: center;
  	h1 {
	  opacity: 0.9;
	  font-weight: 600;
	  font-size: 30px;
	}
	span {
	  opacity: 0.7;
	  font-size: 1.3em;
      font-family: "Devanagari Sangam MN";
	}
`;

const		ProfileBarC = styled.div`
	width: 100%;
	cursor: ${props => (props.Loading ? 'wait' : '')};
`;


const		ProfileImgC = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
	cursor: ${props => (props.Loading ? 'wait' : '')};
	> div {
		position: relative;
		img {
			box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
			width: 15rem;
			height: 15rem;
			border-radius: 10rem;
			border: 1px solid rgba(0, 0, 0, 0.2);
		}
		> input {
			display: none;
		}
	}
`;

const		ProfileLevelC = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-content: center;
	margin: 10px 0px;
`;

const		ProfileLevelBarC = styled.div`
  	width: 100%;
  	height: 30px;
  	background-color: rgba(0, 0, 0, 0.1);
  	display: flex;
  	align-items: center;
  	overflow: hidden;
  	border-radius: 15px;
	span {
		position: absolute;
		left: 80%;
		transform: translate(-50%);
		opacity: 0.5;
		font-family: "TmoneyRoundWindExtraBold";
	}
`;

const		ProgressBarC = styled.div`
  	background-color: rgb(103, 157, 125);
	width: ${({ percent }) => percent}%;
  	height: 20px;
	margin: 0px 5px;
	border-radius: 10px;
`;


export default ProfileBar;
