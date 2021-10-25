import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";




const App = () => {
	const [File, setFile] = useState([]);

	const fileOnChange = async (e) => {
		const files = e.target.files;
		let fileArr = Array.from(files);
		fileArr.forEach(data => {
			console.log(data);
		})
		fileArr.forEach(data => {
			setFile((file) => {
				return [...file, data];
			});
		});
	}
	const SubmitHandle = async () => {
		let formData = new FormData();
		const config = {
				header: { "content-type": "multipart/form-data" },
			};
		File.forEach((data, index) => {
			formData.append("file", data)
		})
		for (let values of formData.values()) {
			console.log(values, "값");
		}
		 const Food = {
				name: "피자",
				price: 13500,
			};

		var object = {};
		formData.forEach((value, key) => {
			if (!object.hasOwnProperty(key)) {
				object[key] = value;
				return;
			}
			if (!Array.isArray(object[key])) {
				object[key] = [object[key]];
			}
			object[key].Push(value);
		});
		var json = JSON.stringify(object);
		formData.append("stringFood", JSON.stringify(Food));
		let check = {
			item: "zxz",
			price: 1,
		}
		let check2 = new FormData();
		check2.append("file", "file1");
		check2.append("file12", "이론");
		console.log(formData.getAll('file'));
		const res = await axios.post("http://localhost:4000/data", formData, config).then(res => {
			console.log(res,"이거머임");
		});
		console.log(res);
	}

	const testArr = ["/img/a.jpeg", "/img/b.jpeg", "/img/c.jpeg", "/img/d.jpeg",];
	const Test = async () => {
		let Arr = File.map((data) => {
			return data.name;
		});

		console.log(Arr, "Arr 는?");

		//const Data = {
		//	title: "제목",
		//	subtitle: "내용",
		//	likes: 0,
		//	price: 10000,
		//	img: testArr,
		//};
		//await axios.post("http://localhost:4000/comments", Data);
	}



	return (
		<div>
			<SC>

				<label for="getFile">상품이미지</label>
				<input type="file" onChange={fileOnChange} multiple id="getFile" />
				<button type="submit" onClick={SubmitHandle}>제출</button>

				<div></div>
				<button onClick={Test}>눌러봐유</button>
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
