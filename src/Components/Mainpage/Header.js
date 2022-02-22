import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useCookies, Cookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Notification";
import { setSocket } from '../../modules/Socket';
import { setUserId } from "../../modules/User";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

function Header() {
	const cookie = new Cookies()
	let { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();
	const [Loading, setLoading] = useState(true);
	const history = useHistory();
	const [text, setText] = useState("");

	if (userId === undefined)
		userId = "0";
	// const onSetSocket = (socket, stompClient) => {
	// 	dispatch(setSocket(socket, stompClient));
	// };
	function onChange(e) {
		setText(e.target.value);
	};
	const check = (e) => {
		if (e.key == "Enter") {
			imgClick();
		}
	};
	function imgClick(e) {
		if (text === "")
		{
			alert("검색어를 입력해주세요!");
			return ;
		}
		else {
			history.push(
			{
				pathname: `/search/${userId}/${text}`,
			});
		}
		setText("");
	};

	// function connectNoti() {
	// 	stompClient.connect({}, ()=>{
	// 		stompClient.subscribe(`/sub/all`, (data) => {
	// 			console.log(data);
	// 		})
	// 	});
	// }
	const headers = {
		"Authorization": `Bearer ${token}`,
		"withCreadentials": true,
		"Content-Type": "application/json",
	};

	return (
		<HeaderC>
			<HeaderLineC>
				<HeaderLogoC>
					<a href="http://www.4m2d.site/" onClick={() => {
						setLoading(!Loading);
						window.scrollTo({
							top: 0,
						})
					}}>
						<HeaderLogoImgC src={process.env.PUBLIC_URL + "/img/Logo1.png"} />
					</a>
				</HeaderLogoC>
				<HeaderSearchC>
					<HeaderSearchInputC>
						<img
							onClick={imgClick}
							className="header_search_img"
							src={process.env.PUBLIC_URL + "/img/searchIcon.png"}
							alt="img"
						/>
						<input
							placeholder="검색어를 입력해주세요."
							onChange={onChange}
							onKeyDown={check}
							type="text"
							value={text}
						/>
					</HeaderSearchInputC>
				</HeaderSearchC>
				<HeaderInfoC>
					{token ?
						<LinkC to="/product/regi">
							<img src={process.env.PUBLIC_URL + "/img/wonIcon.png"} />
							<div>판매하기</div>
						</LinkC>
						:
						null
						// <AC onClick={() => {
						// 	alert("로그인이 필요합니다.");
						// }} href="https://api.intra.42.fr/oauth/authorize?client_id=2b02d6cbfa01cb92c9572fc7f3fbc94895fc108fc55768a7b3f47bc1fb014f01&redirect_uri=http%3A%2F%2Fapi.%2Flogin%2FgetToken&response_type=code">
						// 	<img src={process.env.PUBLIC_URL + "/img/wonIcon.png"} />
						// 	<div>판매하기</div>
						// </AC>
					}
					{token ?
					<LinkC to={`/mypage/${userId}/selllist`}>
						<img src={process.env.PUBLIC_URL + "/img/userIcon.png"} />
						<div>내정보</div>
					</LinkC>
						:
						null
						// <AC href="https://api.intra.42.fr/oauth/authorize?client_id=2b02d6cbfa01cb92c9572fc7f3fbc94895fc108fc55768a7b3f47bc1fb014f01&redirect_uri=http%3A%2F%2Fapi.4m2d.shop%2Flogin%2FgetToken&response_type=code" onClick={() => {
						// 	alert("로그인이 필요합니다.")
						// }}>
						// 	<img src={process.env.PUBLIC_URL + "/img/userIcon.png"} />
						// <div>내정보</div>
					// </AC>
					}
					{/* {
						// token ?
						<Notification/>
						//  : null
					} */}
					{token ?
						<LinkC onClick={() => {
							const LogOut = () => {
								cookie.remove('Authorization', {
									path: '/',
									domain: '.4m2d.site',
								});
								cookie.remove('userId', {
									path: '/',
									domain: '.4m2d.site',
								});
								window.location.reload();
							}
							LogOut();
					}} to={`/`}>
						<img src={process.env.PUBLIC_URL + "/img/logoutIcon.png"} />
						<div>로그아웃</div>
					</LinkC>
						:
					<AC href="https://api.intra.42.fr/oauth/authorize?client_id=2b02d6cbfa01cb92c9572fc7f3fbc94895fc108fc55768a7b3f47bc1fb014f01&redirect_uri=http%3A%2F%2Fapi.4m2d.site%2Flogin%2FgetToken&response_type=code">
						<img src={process.env.PUBLIC_URL + "/img/loginIcon.png"} />
						<div>로그인</div>
					</AC>
					}
				</HeaderInfoC>
			</HeaderLineC>
		</HeaderC>
	);
}

// Header style
const HeaderC = styled.header`
	width: 100%;
	min-width: 1200px;
	position: sticky;
	top: 0;
	z-index: 10;
	display: flex;
	justify-content: center;
	background-color: #fdfdfd;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const HeaderLineC = styled.div`
	position: relative;
	width: 1200px;
	height: 100px;
	display: flex;
	/*justify-content: space-between;*/
	align-items: center;
`;

const HeaderLogoC = styled.div`
	width: 180px;
`;

const HeaderLogoImgC = styled.img`
	width: 100%;
	height: 80%;
`;

const HeaderSearchC = styled.div`
	margin-left: 30px;
	width: 650px;
	padding-left: 25px;
	padding-right: 25px;
	height: 0;
`;

const HeaderSearchInputC = styled.fieldset`
	display: flex;
	justify-content: space-between;
	margin: 0;
	padding: 0;
	width: 100%;
	border-bottom: 1.5px solid rgba(0,0,0, 0.7);
	background-color: #fdfdfd;
	& > input::placeholder {
		color: rgba(0,0,0,0.2);
	}
	& > input {
		background-color: #fdfdfd;
		width: 100%;
		font-size: 18px;
		border: none;
		outline: none;
	}
	& > input:hover {
		width: 100%;
		outline: none;
	}
	& a {
		padding: 5px;
	}
	& img {
		/*border:none;
		outline:none;*/
		margin-right: 8px;
		width: 20px;
		height: 20px;
	}
`;

const AC = styled.a`
	display: flex;
	align-items: center;
	text-decoration: none;
	color: black;
	> div:hover {
		border-bottom: 2px solid rgb(100,130, 238);
	}
`;

const LinkC = styled(Link)`
	display: flex;
	align-items: center;
	text-decoration: none;
	color: black;
	> div:hover {
		border-bottom: 2px solid rgb(100,130, 238);
	}
`;

const HeaderInfoC = styled.div`
	position: relative;
	top: 15px;
	right:0;
	display: flex;
	justify-content: right;
	width: 350px;
	font-size: 16px;
	& ${LinkC}, & ${AC} {
		padding: 0 15px;
	}
	& ${LinkC}:last-child, & ${AC}:last-child {
		padding-right: 0;
	}
	& > ${LinkC}:not(${LinkC}:first-child) {
		border-left: 1px solid rgb(0, 0, 0, 0.1);
	}
	& > ${AC}:not(${AC}:first-child) {
		border-left: 1px solid rgb(0, 0, 0, 0.1);
	}
	& div {
		margin-left: 10px;
	}
`;


export default Header;
