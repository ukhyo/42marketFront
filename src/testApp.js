import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";




const App = () => {
	let testarr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	let temparr = []

	let t = testarr.map(data => {
		if (data % 2 == 0)
			temparr = [...temparr, data];
		return 1;
	})
	console.log(temparr, "test");
	console.log(t, "t");



	//return;
	const [File, setFile] = useState([]);
	const fileOnChange = async (e) => {
		const files = e.target.files;
		let fileArr = Array.from(files);
		console.log(files);
		fileArr.forEach(data => {
			console.log(data);
		})
		fileArr.forEach(data => {
			setFile((qq, idx) => {

				console.log(qq, `File` + idx);
				return [...File, data];
			});
		});
	}
	const SubmitHandle = async () => {
		const formData = new FormData();
		File.forEach((data, index) => {
			formData.append(`안녕${index}`, data)
		})
		let test = {};
		console.log(formData);
		//console.log(formData.getAll("file"), "get All");
		const res = await axios.post("http://localhost:4000/data", formData);
		//console.log(File, "In File");
		//formData.append(
		//	"myfile",
		//	File,
		//);
		//axios.post("http://localhost:4000/comments", formData);
		console.log(res, "결과");
	}
	console.log(File, "In File");
	return (
		<div>
			<SC>
				<label for="getFile">상품이미지</label>
				<input type="file" onChange={fileOnChange} multiple id="getFile" />
				<div>
					<button onClick={SubmitHandle}>제출</button>
				</div>
			</SC>
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
