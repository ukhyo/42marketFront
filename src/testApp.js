import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import "./app.css";
import { Row, Col, Button, Input, Alert } from "reactstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from 'react-responsive'
import Slider from "react-slick";

const App = () => {
	const DesktopOrLaptop = useMediaQuery(
		{ minDeviceWidth: 1200 },
	)
	return (
		<TestC>
			{DesktopOrLaptop ?
				<div>안녕하세요</div> :
			<TestC>반갑습니다.</TestC>}

		</TestC>
	);
}


const TestC = styled.div`
	color: red;
	@media screen and (max-width: 720px) {
		color :blue;
	}
`;

export default App;
