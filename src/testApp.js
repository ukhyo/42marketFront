
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
const App = () => {
	const [data, setData] = useState([]);
	const [previewImg, setPreviewImg] = useState([]);
	const [allimg, setallimg] = useState([]);
	const [imgFile, setFile] = useState(null);
	const [imgUrl, setImgUrl] = useState(null);
	const [Loading, setLoading] = useState(true);
	const setImageFromFile = (e) => {
		let reader = new FileReader();
		let file = e.target.files[0];
		setFile(e.target.files[0]);
		console.log("비교하기전", e.target.files[0]);
		reader.onload = (e) => {
			setPreviewImg([...previewImg, e.target.result]);
			setallimg([...allimg, e.target.result]);
			console.log("비교하기후", e.target.result);
			setImgUrl(e.target.result);
		};
		reader.readAsDataURL(file);
	};
	const Click = async () => {
		const formData = new FormData();
		formData.append('file', imgFile);
		//console.log(formData.get("file"), "뭐라고나오려나");
		//console.log("%chere", "color:blue");
		console.log(allimg, "전체이미지");
		setLoading(!Loading);
		const res = await axios.post("http://localhost:8000/static/", formData);
		console.log("%c 확인용", "color: red", res);
	}

	data.map((check) => {
		console.log("%c Check here!", "color: red");
		console.log(check);
	})
	console.log(data, "data here");
	console.log(previewImg, "프리뷰이미지엔 뭐가담겨있을까요?");
	return (
		<div>
			<SC>
				<label for="test12">상품이미지</label>
				<input
					accept="image/*"
					type="file"
					id="test12"
					multiple
					onChange={(e) => {
						setFile(e.target.files[0]);
						setImageFromFile(e);
					}}
				></input>
				{previewImg.map((img) => {
					return <img src={img} alt="what?" />;
				})}
			</SC>
			<button onClick={Click}>클릭해봐</button>
			{Loading ? "" : allimg.map((file) => {
				console.log(file, "파일안에 뭐가들었지");
				console.log(file[0], "파일 포문돌렸을때");
				return <img src={file} alt="real?"></img>
			})}
		</div>
	);
}

const SC = styled.div`
	img {
		width: 200px;
		height: 200px;
	}
`;

export default App;
