import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useCookies, Cookies } from "react-cookie";
import { useSelector } from "react-redux";
import { setUserId } from "../modules/User";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import theme from "../Styles/theme";
function M_Header() {
	const cookie = new Cookies()
	let { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();
	const [Loading, setLoading] = useState(true);
	const history = useHistory();
	const [text, setText] = useState("");
	if (userId === undefined)
		userId = "0";
	function onChange(e) {
		setText(e.target.value);
	}
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
	}
	return (
		<HeaderC>
			<HeaderLineC>
				<HeaderLogoC>
					<a href="http://www.4m2d.shop/" onClick={() => {
						setLoading(!Loading);
						window.scrollTo({
							top: 0,
						})
					}}>
						<HeaderLogoImgC src={process.env.PUBLIC_URL + "/img/logoDefault.png"} />
					</a>
				</HeaderLogoC>
				{/*<HeaderInfoC>
					{token ?
						<LinkC to="/product/regi">
							<img src={process.env.PUBLIC_URL + "/img/wonIcon.png"} />
							<div>판매하기</div>
						</LinkC>
						:
						<AC onClick={() => {
							alert("로그인이 필요합니다.");
						}} href="https://api.intra.42.fr/oauth/authorize?client_id=2b02d6cbfa01cb92c9572fc7f3fbc94895fc108fc55768a7b3f47bc1fb014f01&redirect_uri=http%3A%2F%2Fapi.4m2d.shop%2Flogin%2FgetToken&response_type=code">
							<img src={process.env.PUBLIC_URL + "/img/wonIcon.png"} />
							<div>판매하기</div>
						</AC>
					}
					{token ?
					<LinkC to={`/mypage/${userId}/selllist`}>
						<img src={process.env.PUBLIC_URL + "/img/userIcon.png"} />
						<div>내정보</div>
					</LinkC>
						:
						<AC href="https://api.intra.42.fr/oauth/authorize?client_id=2b02d6cbfa01cb92c9572fc7f3fbc94895fc108fc55768a7b3f47bc1fb014f01&redirect_uri=http%3A%2F%2Fapi.4m2d.shop%2Flogin%2FgetToken&response_type=code" onClick={() => {
							alert("로그인이 필요합니다.")
						}}>
							<img src={process.env.PUBLIC_URL + "/img/userIcon.png"} />
						<div>내정보</div>
					</AC>
				}
					{token ?
						<LinkC onClick={() => {
							const LogOut = async () => {
								cookie.remove('Authorization', {
									path: '/',
									domain: '.4m2d.shop',
								});
								cookie.remove('userId', {
									path: '/',
									domain: '.4m2d.shop',
								});
								window.location.reload();
							}
							LogOut();
					}}>
						<img src={process.env.PUBLIC_URL + "/img/logoutIcon.png"} />
						<div>로그아웃</div>
					</LinkC>
						:
					<AC href="https://api.intra.42.fr/oauth/authorize?client_id=2b02d6cbfa01cb92c9572fc7f3fbc94895fc108fc55768a7b3f47bc1fb014f01&redirect_uri=http%3A%2F%2Fapi.4m2d.shop%2Flogin%2FgetToken&response_type=code">
						<img src={process.env.PUBLIC_URL + "/img/loginIcon.png"} />
						<div>로그인</div>
					</AC>
					}
				</HeaderInfoC>*/}
			</HeaderLineC>
			<HeaderSearchC>
					<HeaderSearchInputC theme={theme}>
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

		</HeaderC>
	);
}

// Header style
const HeaderC = styled.header`
	width: 100%;
	max-width: 400px;
	/*position: sticky;*/
	margin: 0 auto;
	/*top: 0;*/
	z-index: 10;
	background-color: var(--BackColor);
`;

const HeaderLineC = styled.div`
	width: 80%;
	height: 80px;
	display: flex;
	align-items: center;
	`;

const HeaderLogoC = styled.div`
	/*width: 25%;*/
	margin: 0 auto;
	width: 80%;
	height: 100%;
`;

const HeaderLogoImgC = styled.img`
	width: 30%;
	height: 100px;
	`;

const AC = styled.a`
	display: flex;
	align-items: center;
	text-decoration: none;
	color: black;
	> div:hover {
		border-bottom: 1px solid rgb(130, 130, 238);
	}
`;

const LinkC = styled(Link)`
	display: flex;
	align-items: center;
	text-decoration: none;
	color: black;
	> div:hover {
		border-bottom: 1px solid rgb(130, 130, 238);
	}
`;

const HeaderInfoC = styled.div`
	position: relative;
	top: 15px;
	right:0;
	display: flex;
	justify-content: right;
	/*width: 75%;*/
	font-size: 1rem;
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



const HeaderSearchC = styled.div`
	margin: 0 auto;
	width: 100%;
	`;

const HeaderSearchInputC = styled.fieldset`
	margin: 0 auto;
	margin-top: 30px;
	height: 40px;
	display: flex;
	align-items: center;
	padding: 0;
	width: 80%;
	border-radius: 15px;
	border: 1.5px solid ${({ theme }) => theme.color.mintColor};
	color: var(--color-hover, "red");
	font-size: 2rem;
	background-color: #fdfdfd;
	& > input::placeholder {
		color: ${({theme}) => theme.color.placeHolder};
	}
	& > input {
		background-color: #fdfdfd;
		width: 80%;
		font-size: 1rem;
		border: none;
		outline: none;
	}
	& > input:hover {
		width: 80%;
		outline: none;
	}
	& a {
		padding: 5px;
	}
	& img {
		margin: 0 8px;
		width: 20px;
		height: 20px;
	}
	`;


export default M_Header;
