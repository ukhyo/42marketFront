import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import jsonData from "./secret.json";
import "./app.css";
import AWS from "aws-sdk";
import { Row, Col, Button, Input, Alert } from "reactstrap";
import uuid from "react-uuid";
const App = () => {

	console.log(uuid());
	const [progress, setProgress] = useState(0);
	const [selectedFile, setSelectedFile] = useState(null);
	const [showAlert, setShowAlert] = useState(false);

	const ACCESS_KEY = jsonData.accesskey;
	const SECRET_ACCESS_KEY = jsonData.secretkey;
	const REGION = jsonData.awsregion;
	const S3_BUCKET = jsonData.s3burket;

	AWS.config.update({
		accessKeyId: ACCESS_KEY,
		secretAccessKey: SECRET_ACCESS_KEY,
	});

	const myBucket = new AWS.S3({
		params: { Bucket: S3_BUCKET },
		region: REGION,
	});

	const handleFileInput = (e) => {
		const file = e.target.files[0];
		console.log(file.name.split(".").pop(), "이름");
		const fileExt = file.name.split(".").pop();
		setProgress(0);
		setSelectedFile(e.target.files[0]);
	};

	const uploadFile = (file) => {
		const params = {
			ACL: "public-read",
			Body: file,
			Bucket: S3_BUCKET,
			Key: "upload/" + file.name,
		};

		myBucket
			.putObject(params)
			.on("httpUploadProgress", (evt) => {
				console.log(evt, "확인");
				setProgress(Math.round((evt.loaded / evt.total) * 100));
				setShowAlert(true);
				setTimeout(() => {
					setShowAlert(false);
					setSelectedFile(null);
				}, 3000);
			})
			.send((err) => {
				if (err) console.log(err);
			});
};
	return (
		<div className="App">
			<img src="https://42trademarket.s3.ap-northeast-2.amazonaws.com/upload/5.jpg" />
			<div className="App-header">
				<Row>
					<Col>
						<h1>File Upload</h1>
					</Col>
				</Row>
			</div>
			<div className="App-body">
				<Row>
					<Col>
						{showAlert ? (
							<Alert color="primary">업로드 진행률 : {progress}%</Alert>
						) : (
							<Alert color="primary">파일을 선택해 주세요.</Alert>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						<Input color="primary" type="file" onChange={handleFileInput} />
						{selectedFile ? (
							<Button color="primary" onClick={() => uploadFile(selectedFile)}>
								{" "}
								Upload to S3
							</Button>
						) : null}
					</Col>
				</Row>
			</div>
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
