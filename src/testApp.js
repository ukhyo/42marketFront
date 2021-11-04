import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import jsonData from "./secret.json";
import "./app.css";
import { Row, Col, Button, Input, Alert } from "reactstrap";
import uuid from "react-uuid";
import S3 from "react-aws-s3";
import useAxios from "./useAxios";

const App = () => {
	const { loading, data, reGet } = useAxios({ url: "http://localhost:3001/posts" });
	console.log(loading, "<- 로딩", "데이터 ->", data);
	return (
		<div>
			{loading && <div>loading</div>}
			{data && (
				data.data.map((data) => {
					return <div>{data.id}</div>
				})
			)}
			<button onClick={reGet}>다시 받아보자</button>
		</div>
	);
}

const SC = styled.div`
	width: 1000px;
	height: 500px;
	img {
		width: 200px;
		height: 200px;
	}
	> label {
		display: inline-block;
		width: 200px;
		height: 200px;
		text-align: center;
		line-height: 200px;
		background-color: #f0f0f0;
	}
	> input {
		display: none;
	}
	button {
		margin-top: 20px;
		width: 200px;
		height: 50px;
	}
`;

export default App;
