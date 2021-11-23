import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import "./app.css";
import { Row, Col, Button, Input, Alert } from "reactstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const App = () => {
	const setting = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};
	return (
		<div>
			<Slider {...setting}>
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
				<div>5</div>


			</Slider>

		</div>
	);
}


export default App;
