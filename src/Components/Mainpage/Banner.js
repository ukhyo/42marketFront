import React, { useState, useEffect } from "react";
import styled from "styled-components";
import pleaseBuy from "../img/pleasebuy.png";
import bannerimg from "../img/mainBanner.png";
import Samyun from "../img/main_page_ver2.png";
import testImg from "../img/test1.jpeg";
import testBanner from "../img/testBanner.png";
import banner from "../img/test123.jpg";
import BannerHeader from "./BannerHeader";
import Header from "./Header";
function MainBanner() {
	// const [text, setText] = useState("");
	// function onChange(e) {
	// 	setText(e.target.value);
	// }
	// const check = (e) => {
	// 	if (e.key == "Enter") {
	// 		imgClick();
	// 	}
	// };
	// function imgClick(e) {
	// 	setText("");
	// }
	// const [Login, setLogin] = useState(false);
	return (
		<MainC>
			<MainBannerC>
					{/* <BannerHeader /> */}
					<img alt="img" src={Samyun} />
					{/* <span>세계 유일 카뎃 중고거래 플랫폼</span>
					<h1>어서오세요, 사면이득입니다</h1> */}
					{/* <HeaderSearchC>
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
						</a>
						<input
							placeholder="검색어를 입력해주세요."
							onChange={onChange}
							onKeyDown={check}
							type="text"
							value={text}
						/>
					</HeaderSearchInputC>
				</HeaderSearchC> */}
			</MainBannerC>
		</MainC>
	);
}

const MainC = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width:100%;
`;

const MainBannerC = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-content: center;
	padding: 0;
	margin: 0 auto;
	width: 1200px;
	height: 500px;
	margin-bottom: 30px;
	& > div {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;
		height: 100%;
		& > img {
			z-index: 1;
			width: 1780px;
			height: 650px;
			position: absolute;
		}
		/* & > img:nth-child(2) {
			position: absolute;
			top: 80px;
			left: -150px;
			width: 70px;
			height: 70px;
		}
		& > img:nth-child(3) {
			position: absolute;
			top: 60px;
			left: 100px;
			width: 60px;
			height: 60px;
		} */
		& > span {
			position: relative;
			display: block;
			color: rgb(49, 52, 64);
			font-weight: 600;
			font-size: 20px;
			padding: 25px;
			z-index: 2;
		}
		& > h1 {
			position: relative;
			display: block;
			text-align: center;
			z-index: 2;
			color: rgb(49, 52, 64);
			font-weight: 700;
			font-size: 35px;
		}
	}
`;

// const HeaderSearchC = styled.div`
// 	width: 650px;
// 	position: relative;
// 	z-index: 2;
// 	top: 100px;

// `;

// const HeaderSearchInputC = styled.fieldset`
// 	height: 80px;
// 	display: flex;
// 	align-items: center;
// 	justify-content: space-between;
// 	border: 2px solid rgba(0,0,0,0.7);
// 	border-radius: 15px;
// 	margin: 0;
// 	padding: 0;
// 	width: 100%;
// 	background-color: #fdfdfd;
// 	& > input::placeholder {
// 		color: rgba(0,0,0,0.2);
// 	}
// 	& > input {
// 		background-color: #fdfdfd;
// 		width: 100%;
// 		font-size: 22px;
// 		border: none;
// 		outline: none;
// 	}
// 	& > input:hover {
// 		width: 100%;
// 		outline: none;
// 	}
// 	& a {
// 		padding: 5px;
// 	}
// 	& img {
// 		padding: 20px;
// 		width: 30px;
// 		height: 30px;
// 	}
// `;


export default MainBanner;
