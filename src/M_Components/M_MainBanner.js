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
import image1 from "../img/ban.png";
import image2 from "../img/ban2.png";
import image3 from "../img/ban3.png";
const M_MainBanner = () => {
	return (
		<MainC>

		</MainC>
	)
}


const DivC = styled.div`
	width: 100%;
	max-width: 400px;
	height: 133px;
`;

const ImageC = styled.div`
	width: 1200px;
	height: 700px;
	background-image: url("${(props) => props.url}");
	transition: background-image 1s ease-out;
	background-position: center;
	background-size: cover;
`;

const ImagesC = styled.div`
	display:flex;
	width: 1200px;
	height: 700px;
	overflow: hidden;
	> div {
		width: 1200px;
		height: 700px;

		/*transition: 1s ease-in-out;*/
		}
	}
`;

const MainC = styled.main`
	display: flex;
	/*overflow: hidden;*/
	margin: 0 auto;
	width: 1200px;
	height: 700px;
`;

export default M_MainBanner;
