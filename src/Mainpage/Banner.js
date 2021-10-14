import React from "react";
import styled from "styled-components";
import pleaseBuy from "../img/pleasebuy.png";
import bannerimg from "../img/mainBanner.png";
import testImg from "../img/banner2.jpeg";
function MainBanner() {
	return (
		<MainC>
			<MainBannerC>
				<div>
					<img alt="img" src={testImg} />
					{/*<img className="buy_img1" alt="img" src={pleaseBuy} />
					<img className="buy_img2" alt="img" src={pleaseBuy} />*/}
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
	width: 1000px;
	height: 200px;
	margin-bottom: 30px;
	/*background-color: rgb(178, 236, 238);*/
	& > div {
		width: 100%;
		display: flex;
		justify-content: center;
		position: relative;
		height: 100%;
		& > img:first-child {
			width: 100%;
			height: 250px;
			position: absolute;
			bottom: -10px;
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
