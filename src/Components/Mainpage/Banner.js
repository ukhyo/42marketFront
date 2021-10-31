import React from "react";
import styled from "styled-components";
import pleaseBuy from "../img/pleasebuy.png";
import bannerimg from "../img/mainBanner.png";
import testImg from "../img/test1.jpeg";
import testBanner from "../img/testBanner.png";
import banner from "../img/test123.jpg";
function MainBanner() {
	return (
		<MainC>
			<MainBannerC>
				<div>
					<img alt="img" src={banner} />
				</div>
			</MainBannerC>
		</MainC>
	);
}

const MainC = styled.main`
	display: flex;
	justify-content: center;
`;

const MainBannerC = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	width: 100%;
	height: 480px;
	margin-bottom: 30px;
	& > div {
		width: 100%;
		display: flex;
		justify-content: center;
		position: relative;
		height: 100%;
		& > img:first-child {
			width: 100%;
			height: 100%;
			position: absolute;
		}
		& > img:nth-child(2) {
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
		}
	}
`;

export default MainBanner;
