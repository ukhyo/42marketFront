import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useCookies, Cookies } from "react-cookie";
import { useSelector } from "react-redux";
import { setUserId } from "../../modules/User";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import theme from "../../Styles/theme";

const M_HeaderInfo = (cookie) => {
	const [isActive, setIsActive] = useState(false);
	return (
		<div>
			<InfoAreaC>
						<InfoNameC onClick={() => {
								setIsActive(!isActive);
						}} >
							<span>Icon? UserId</span>
						</InfoNameC>
						<MenuC active={isActive}>
							  <ul>
								<li onClick={(e) => {
									setIsActive(!isActive);
								}}><Link to={"/product/regi"}>
									<div>판매하기</div>
									</Link>
								</li>
								<li onClick={(e) => {
									setIsActive(!isActive);
								}}><Link onClick={() => {
									const LogOut = () => {
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
									<div>로그아웃</div>
									</Link>
								</li>
							  </ul>
						</MenuC>
					</InfoAreaC>
		</div>
	)
}

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
				<HeaderLogoC theme={theme}>
					<div>
						<a href="http://www.4m2d.shop/" onClick={() => {
							setLoading(!Loading);
							window.scrollTo({
								top: 0,
							})
						}}>
							<HeaderLogoImgC src={process.env.PUBLIC_URL + "/img/logoText.png"} />
						</a>
					</div>
					<HeaderInfoC>
					{!token ?
							<M_HeaderInfo cookie={cookie}/>
						:
						<InfoAreaC>
						<AC href="https://api.intra.42.fr/oauth/authorize?client_id=2b02d6cbfa01cb92c9572fc7f3fbc94895fc108fc55768a7b3f47bc1fb014f01&redirect_uri=http%3A%2F%2Fapi.4m2d.shop%2Flogin%2FgetToken&response_type=code">
							<InfoNameC>로그인</InfoNameC>
						</AC>
					</InfoAreaC>
				}
				</HeaderInfoC>
				</HeaderLogoC>
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
	margin: 0 auto;
	margin-top: 20px;
	z-index: 10;
	background-color: var(--BackColor);
`;

const HeaderLineC = styled.div`
	width: 100%;
	height: 40px;
	`;

const HeaderLogoC = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
	width: ${({ theme }) => theme.widthSize.margin};
	> div:first-child() {
	}
`;

const HeaderLogoImgC = styled.img`
	`;

const HeaderInfoC = styled.div`
	/*width: 13%;*/
`;

const AC = styled.a`
	display: flex;
	align-items: center;
	text-decoration: none;
	color: black;
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


const InfoAreaC = styled.div`
	width: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	position:relative;
`;


const InfoNameC = styled.button`
	height: 40px;
	/*border-radius: 30px;*/
	cursor: pointer;
	background: transparent;
	cursor: pointer;
	display: flex;
	align-items: center;
	border: none;
	text-align: right;
	font-weight: 700;
		font-size: 1rem;
	> span {
		font-size: 1rem;

	}
	> a > div {
		width: 80px;
		height: 30px;
		border-radius: 90px;
		line-height:30px;
		font-weight: 700;
		font-size: 1rem;
		color: rgba(0, 0, 0, 0.7);
	}
`;

const MenuC = styled.nav`
	z-index: 5;
	background: #ffffff;
	border-radius: 8px;
	position: absolute;
	top: 35px;
	right: 0;
	width: 80px;
	box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
	opacity: ${props => (props.active ? '1' : '0')};
	visibility: ${props => (props.active ? 'visible' : 'hidden')};
	transform: ${props => (props.active ? 'translateY(0)' : 'translateY(-20px)')};
	transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
	> ul {
		list-style: none;
		padding: 0;
		margin: 0;
		> li {
			border-bottom: 1px solid #dddddd;
			margin-top: 10px;
			height: 20px;
			padding-left: 8px;
			> div {
				text-decoration: none;
				color: rgba(0, 0, 0, 0.7);
				padding: 10px 15px;
				display: block;
			}
		}
	}
`;

const HeaderSearchC = styled.div`
	margin: 0 auto;
	width: 100%;
	`;

const HeaderSearchInputC = styled.fieldset`
	margin: 0 auto;
	margin-top: 15px;
	height: 40px;
	display: flex;
	align-items: center;
	padding: 0;
	width: ${({theme}) => theme.widthSize.margin};
	border: 1.5px solid ${({theme}) => theme.color.black};
	color: ${({ theme }) => theme.color.black};
	box-shadow: 1.5px 1.5px 0 rgba(0, 0, 0, 0.3);
	font-size: 2rem;
	background-color: #fdfdfd;
	& > input::placeholder {
		color: ${({theme}) => theme.color.placeHolder};
	}
	& > input {
		background-color: #fdfdfd;
		width: ${({theme}) => theme.widthSize.margin};
		font-size: 1rem;
		border: none;
		outline: none;
	}
	& > input:hover {
		width: ${({theme}) => theme.widthSize.margin};
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
