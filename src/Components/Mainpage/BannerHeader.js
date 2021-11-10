import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//import logoimg from "../img/logo.png";
//import logoimg from "../img/noname.png";



function BannerHeader() {
	const [text, setText] = useState("");
	function onChange(e) {
		setText(e.target.value);
	}
	const check = (e) => {
		if (e.key == "Enter") {
			imgClick();
		}
	};
	function imgClick(e) {
		setText("");
	}
	const [Login, setLogin] = useState(false);

	return (
		<HeaderC>
			<HeaderLineC>
				<HeaderLogoC>
					<Link to="/">
						<HeaderLogoImgC src={process.env.PUBLIC_URL + "/img/test22.png"} />
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
					<LinkC to="/product/regi">
						<img src={process.env.PUBLIC_URL + "/img/wonIcon.png"} />
						<div>판매하기</div>
					</LinkC>
					<LinkC to="/product/regi">
						<img src={process.env.PUBLIC_URL + "/img/bellIcon2.png"} />
						<div>알림</div>
					</LinkC>
					<LinkC to="/mypage/selllist">
						<img src={process.env.PUBLIC_URL + "/img/userIcon.png"} />
						<div>내정보</div>
					</LinkC>
				</HeaderInfoC>
			</HeaderLineC>
		</HeaderC>
	);
}

// Header style
const HeaderC = styled.header`
	width: 100%;
	top: 0;
	z-index: 10;
	display: flex;
    position: absolute;
	justify-content: center;
	background-color: transparent;
`;

const HeaderLineC = styled.div`
	width: 1200px;
	max-width: 1200px;
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const HeaderSearchC = styled.div`
	width: 600px;
`;

const HeaderSearchInputC = styled.fieldset`
	display: flex;
	justify-content: space-between;
	margin: 0;
	padding: 0;
	width: 100%;
	border-bottom: 1.5px solid rgba(0,0,0, 0.7);
	background-color: transparent;
	& > input::placeholder {
		color: rgba(0,0,0,0.2);
	}
	& > input {
		background-color: transparent;
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
		width: 20px;
		height: 20px;
	}
`;

const HeaderLogoC = styled.div`
	width: 180px;
`;

const HeaderLogoImgC = styled.img`
	width: 100%;
	height: 80%;
	/*height: 50%;*/
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
	display: flex;
	justify-content: right;
	width: 350px;
	font-size: 16px;

	& i {
		margin-right: 5px;
	}
	& ${LinkC} {
		padding: 0 15px;
	}
	& ${LinkC}:last-child {
		padding-right: 0;
	}
	& > ${LinkC}:not(${LinkC}:first-child) {
		border-left: 1px solid rgb(0, 0, 0, 0.1);
	}
	& div {
		height: 16px;
		margin-left: 10px;
	}
`;


export default BannerHeader;
