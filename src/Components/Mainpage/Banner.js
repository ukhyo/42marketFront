import React, { useState, useEffect } from "react";
import styled from "styled-components";
import image1 from "../img/002.png";
import image2 from "../img/003.png";
import image3 from "../img/004.png";
import {Carousel} from '3d-react-carousal';
// import image3 from "../img/ban3.png";
//import image4 from "../img/ban.png";

function MainBanner() {
	function onClick(e) {
		console.log(e);
		window.location.href = "/intro"
	}

	let sliders = [
		<img  src={image1} onClick={onClick} alt="1" />,
    <img  src={image3} onClick={onClick} alt="2" />  ,
    <img  src={image2} onClick={onClick} alt="3" />  , 
	];
	return (
		<MainC>
			<Carousel slides={sliders} arrows={false} autoplay={true} interval={4000}/>
		</MainC>
	);
}

const PrevPhotoC = styled.img`
	width: 200px;
	box-sizing: border-box;
`

const NextPhotoC = styled.img`
	width: 200px;
	box-sizing: border-box;
`

const DivC = styled.div`
	width: 1200px;
	height: 700px;
`;

const ImageC = styled.div`
	cursor:pointer;
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
	}
`;

const MainC = styled.main`
	height:70vh;
	margin: 40px 0px;
`;




export default MainBanner;
