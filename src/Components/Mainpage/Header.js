import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//import logoimg from "../img/logo.png";
//import logoimg from "../img/noname.png";



function Header() {
	const [text, setText] = useState("");
	console.log(`%c${text} + red`, "color:red");
	function onChange(e) {
		setText(e.target.value);
		console.log(e.target.name);
	}

	const check = (e) => {
		if (e.key == "Enter") {
			imgClick();
		}
	};

	function imgClick(e) {
		setText("");
	}

	return (
		<HeaderC>
			<HeaderLineC>
				<HeaderLogoC>
					<Link to="/">
						<HeaderLogoImgC src={process.env.PUBLIC_URL + "/img/logoTest2.png" } />
					</Link>
				</HeaderLogoC>
				<HeaderSearchC>
					<HeaderSearchInputC>
						<a href="#">
							<img
								onClick={imgClick}
								className="header_search_img"
								src={process.env.PUBLIC_URL + "/img/searchIcon.png"}
								alt="img"
							/>
						</a>
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
					<span>
						<LinkC to="/product/regi">
							<i className="fas fa-won-sign fa-1.5x"></i>판매하기
						</LinkC>
					</span>
					<span>
						<LinkC to="/">
							<i className="far fa-bell fa-1.5x"></i>알림
						</LinkC>
					</span>
					<span>
						<i className="far fa-user fa-1.5x"></i>
						<LinkC to={"/mypage"}>내정보</LinkC>
					</span>
				</HeaderInfoC>
			</HeaderLineC>
		</HeaderC>
	);
}

// Header style
const HeaderC = styled.header`
	width: 100%;
	height: 100px;
	position: sticky;
	top: 0;
	z-index: 1;
	display: flex;
	justify-content: center;
	background-color: #fdfdfd;
	border-bottom: 1px solid #c0c0c0;
`;

const HeaderLineC = styled.div`
	width: 1200px;
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const HeaderLogoC = styled.div`
	width: 150px;
`;

const HeaderLogoImgC = styled.img`
	width: 100%;
	height: 80%;
	/*height: 50%;*/
`;

const HeaderSearchC = styled.div`
	width: 540px;
`;

const HeaderSearchInputC = styled.fieldset`
	display: flex;
	justify-content: space-between;
	margin: 0;
	padding: 0;
	width: 100%;
	border-bottom: 1.5px solid rgba(0,0,0, 0.7);
	/*border-top: none;*/
	/*border-left: none;*/
	/*border-right: none;*/
	/*background-color: #fcfcfc;*/
	/*border-color: rgb(178, 236, 238);*/
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
		width: 30px;
		height: 20px;
	}
`;

const HeaderInfoC = styled.div`
	display: flex;
	justify-content: right;
	width: 300px;
	font-size: 16px;
	& i {
		margin-right: 5px;
	}
	& > span {
		padding: 0 15px;
	}
	& > span:last-child {
		padding-right: 0;
	}
	& > span:not(span:first-child) {
		border-left: 1px solid rgb(0, 0, 0, 0.1);
	}
`;

const LinkC = styled(Link)`
	text-decoration: none;
	color: black;
`;

export default Header;
