import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import jsonData from "./secret.json";
import "./app.css";
import AWS from "aws-sdk";
import { Row, Col, Button, Input, Alert } from "reactstrap";
import uuid from "react-uuid";
import Resizer from "react-image-file-resizer";
import imageCompression from "browser-image-compression";

const App = () => {
	const [test, setTest] = useState("");
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

	const resize_image = (image) => {
		let canvas = document.createElement("canvas"), max_size = 600
			, width = image.width, height = image.height;
		if (width > height) {
			if (width > max_size) {
				height *= max_size / width;
				width = max_size;
			}
		}
		else if (height > width) {
			if (height > max_size) {
				width *= max_size / height;
				height = max_size;
			}
		}
		canvas.width = width;
		canvas.height = height;
		const test = canvas.getContext("2d").drawImage(image, 0, 0, width, height);
		const dataUrl = canvas.toDataURL("image/jpeg");
		console.log(canvas, "canvas blob");
		console.log(image, "image");
		console.log(dataUrlToBlob(dataUrl), "데이터가 어떻게된다는거야?");
		let check = new FileReader();
		check.onload = (e) => {
			console.log(e.target.result, "이러면 되는건가?");

		}
		console.log(dataUrlToBlob(dataUrl), "뭐라는거야");

		canvas.toBlob("",)
		console.log(canvas.toBlob(dataUrlToBlob(dataUrl))," 과연?");
		//check.readAsDataURL(dataUrlToBlob);
	}

	const dataUrlToBlob = dataUrl => {
		const BASE64_MARKER = ";base64,";
		if (dataUrl.indexOf(BASE64_MARKER) === -1) {
			const parts = dataUrl.split(",");
			const contentType = parts[0].split(":")[1];
			const raw = parts[1];
			console.log("here?");
			return new Blob([raw], {
				type: contentType
			});
		}
		const parts = dataUrl.split(BASE64_MARKER);
		const contentType = parts[0].split(":")[1];
		const raw = window.atob(parts[1]);
		// atob()는 Base64를 디코딩하는 메서드
		const rawLength = raw.length;
		// 부호 없는 1byte 정수 배열을 생성
		const uInt8Array = new Uint8Array(rawLength); // 길이만 지정된 배열
		let i = 0;
		 while (i < rawLength) {
				uInt8Array[i] = raw.charCodeAt(i);
				i++;
			}
			return new Blob([uInt8Array], {
				type: contentType,
			});
	}

	const handleFileInput = async (e) => {
		const file = e.target.files[0];
		console.log(file.name.split(".").pop(), "이름");
		const fileExt = file.name.split(".").pop();
		setProgress(0);
		//setSelectedFile(e.target.files[0]);
		const reader = new FileReader();
		console.log(file, "file check");
		reader.onload = e => {

		}
		const resizeFile = (file) =>
			new Promise((resolve) => {
				Resizer.imageFileResizer(
					file,
					300,
					300,
					"PNG",
					100,
					0,
					(uri) => {
						setTest(uri);
						console.log(uri, "uri??");
						resolve(uri);
					},
					"base64"
				);
			});
		let ttttt;
		const resizerImg = async () => {
			await resizeFile(file);
		}
		//resizerImg();
		const options = {
			maxSizeMB: 2,
			maxWidthOrHeight: 600,
		};

		const compressedFile = await imageCompression(file, options);

		setSelectedFile(file);
		reader.readAsDataURL(file);
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
			.send((err) => {
				if (err) console.log(err);
			});
};
	return (
		<div className="App">
			<img src={test} />
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
