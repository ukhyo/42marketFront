import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import logoimg from "../img/logo.png";

function Header() {
	const [text, setText] = useState('');

	function onChange(e) {
		setText(e.target.value);
	}

	const check = (e) => {
		if (e.key == "Enter") {
			imgClick();
		}
	}

	function imgClick(e) {
		setText('');
	}

	return (
		<HeaderC>
			<HeaderLineC>
				<HeaderLogoC>
					<Link to="/"><img src={logoimg} /></Link>
				</HeaderLogoC>
				<HeaderSearchC>
					<HeaderSearchInputC>
						<input onChange={onChange} onKeyDown={check} type="text" value={text}/>
						<a href="#"><img  onClick={imgClick} className="header_search_img" src={process.env.PUBLIC_URL + '/img/search.png' }  alt="img" /></a>
					</HeaderSearchInputC>
				</HeaderSearchC>
				<HeaderInfoC>
					<span><i className="fas fa-won-sign fa-1.5x"></i>판매하기</span>
					<span><i className="far fa-bell fa-1.5x"></i>알림</span>
					<span><i className="far fa-user fa-1.5x"></i><a href="mypage.html">내정보</a></span>
				</HeaderInfoC>
			</HeaderLineC>
		</HeaderC>
	);
}

// Header style

const HeaderC = styled.header`
	width: 100%;
	height: 100px;
	position:sticky;
	top: 0;
	background-color: white;
	z-index: 20;
	display: flex;
	justify-content: center;
	border-bottom: 1px solid gray;
`;

const HeaderLineC = styled.div`
	width: 1000px;
	height: 100px;
	display: flex;
	background-color: white;
	justify-content: space-between;
	align-items: center;
	z-index: 10;
	border-bottom: 1px solid gray;
`;

const HeaderLogoC = styled.div`
	width: 15%;
	height: 110px;
	line-height: 130px;
`;

const HeaderSearchC = styled.div`
	width: 45%;
`;

const HeaderSearchInputC = styled.fieldset`
	display: flex;
	justify-content: space-between;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 50px;
	border-color: rgb(178, 236, 238);
	& > input {
		width: 400px;
		font-size: 18px;
		border: none;
		outline: none;
	}

	& > input:hover {
		width: 400px;
		outline: none;
	}

	&  img {
		width: 50px;
	}
`;

const HeaderInfoC = styled.div`
	display: flex;
	justify-content: right;
	width: 30%;

	& i {
		margin-right: 5px;
	}
	& > span {
		padding: 0 15px;
	}

	& > span::last-child {
		padding-right: 0;
	}

	& > span::not(span::first-child) {
		border-left: 1px solid rgb(0,0,0, 0.1);
	}
`;

export default Header;
