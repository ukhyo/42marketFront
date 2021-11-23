import React, { useState, useEffect } from "react";
import axios from "axios";
import Coming_soon from "../../Images/coming_soon.jpeg";
import useAsync from "./useAsync";
import styled from "styled-components";
import Badge from "./Badge";
import { FaImage } from 'react-icons/fa';
import { timeout } from "q";
import { useSelector } from "react-redux";

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
			setIsLoading(true);
			await axios.patch(`http://api.4m2d.shop/api/users/${userId}`, data).then(res => {
				console.log("성공");
				setTimeout(() => {
					window.location.reload();
				}, 500)
				// window.location.reload();
			}).catch(err => {
				console.log("실패");
			});
			setIsLoading(false);
		}
		pushData();
	}
	if (error) return <div>Error occured</div>;
	if (!profile) return null;
	if (userId === id)
		return (
			<ProfileBarC Loading={isLoading}>
				<ProfileImgC Loading={isLoading}>
					<img src={ profile.userImage }/>
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
					<span>{profile.userIntra}</span>
				</ProfileNameC>
				<ProfileLevelC>
					<span>Level: {profile.userLevel}</span>
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
				<Badge profile={profile}/>
			</ProfileBarC>
		);

	if (userId !== id)
		return (
			<ProfileBarC Loading={isLoading}>
				<ProfileImgC Loading={isLoading}>
					<img src={profile.userImage}/>
					{/* <label for="ChangeImg">
						<ProfileImgModifyC>
								<FaImage />
						</ProfileImgModifyC>
					</label> */}
					{/* <input type="file"
							id="ChangeImg"
							onChange={onChangeImg}/> */}
				</ProfileImgC>
				<ProfileNameC>
					<span>{profile.userIntra}</span>
				</ProfileNameC>
				<ProfileLevelC>
					<span>Level: {profile.userLevel}</span>
					<ProfileLevelBarC>
						<span>{profile.userExperience}%</span>
						<ProgressBarC percent={profile.userExperience}>
						</ProgressBarC>
					</ProfileLevelBarC>
				</ProfileLevelC>
				<ProfileContentsC>
					<span>{profile.introduce}</span>
				</ProfileContentsC>
				{/* { onButton === false ? <ProfileModifyBtnC onClick={onButtonClick}>
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
				} */}
				<Badge />
			</ProfileBarC>
		);
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
	margin-right: 50px;
	cursor: ${props => (props.Loading ? 'wait' : '')};
`;


const		ProfileImgC = styled.div`
	display: flex;
	position: relative;
	cursor: ${props => (props.Loading ? 'wait' : '')};
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
  	background-color: rgb(103, 157, 125);
	width: ${({ percent }) => percent}%;
  	height: 500px;
`;


export default ProfileBar;
