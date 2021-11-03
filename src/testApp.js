import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import jsonData from "./secret.json";
import "./app.css";
import { Row, Col, Button, Input, Alert } from "reactstrap";
import uuid from "react-uuid";
import S3 from "react-aws-s3";

const App = () => {

	//const [progress, setProgress] = useState(0);
	//const [selectedFile, setSelectedFile] = useState(null);

	//const ACCESS_KEY = jsonData.accesskey;
	//const SECRET_ACCESS_KEY = jsonData.secretkey;
	//const REGION = jsonData.awsregion;
	//const S3_BUCKET = jsonData.s3burket;

	//const s3_config = {
	//	bucketName: S3_BUCKET,
	//	region: REGION,
	//	accessKeyId: ACCESS_KEY,
	//	secretAccessKey: SECRET_ACCESS_KEY,
	//	dirName: "test"
	//};

	//const ReactS3 = new S3(s3_config);

	//const handleFileInput = async (e) => {
	//	const file = e.target.files[0];
	//	setProgress(0);
	//	setSelectedFile(file);
	//};

	//const uploadFile = async (file) => {
	//	const filename = "1.jpeg";
	//	await ReactS3.uploadFile(file, filename)
	//		.then((data) => {
	//			console.log(data, "성공");
	//			window.location.reload();
	//		})
	//		.catch((err) => console.error(err, "에러"));
	//};
	const [data, setData] = useState("");
	const arr = [1, 2, 3, 4, 5, 6];
	const test = async () => {
		return "1234"
	}
	let name;
	test().then((res) => {
		setData(res);
		console.log(res, "?qweqwe");
	})
	setTimeout(() => {
		console.log(name, "? ");
	}, 2000);
	console.log(data, "? ");


	return (
		<div>
			<button onClick={() => {
				setData("1");
			}}></button>
		</div>
	);

	//return (
	//	<div className="App">
	//		<img src="https://42trademarket.s3.ap-northeast-2.amazonaws.com/test/1.jpeg" />
	//		<div className="App-header">
	//			<Row>
	//				<Col>
	//					<h1>File Upload</h1>
	//				</Col>
	//			</Row>
	//		</div>
	//		<div className="App-body">
	//			<Row>
	//			</Row>
	//			<Row>
	//				<Col>
	//					<Input color="primary" type="file" onChange={handleFileInput} />
	//					{selectedFile ? (
	//						<Button color="primary" onClick={() => uploadFile(selectedFile)}>
	//							{" "}
	//							Upload to S3
	//						</Button>
	//					) : null}
	//				</Col>
	//			</Row>
	//		</div>
	//	</div>
	//);
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
