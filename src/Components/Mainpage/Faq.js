import React, { useState } from 'react'
import axios from "axios"
import Header from "./Header"
import Footer from "./Footer"
import styled from "styled-components"
import { Cookies } from "react-cookie";

function Faq() {
	const cookie = new Cookies();
	let { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const onClick = () => {
		const pushData = async () => {
			let data = {
				title: title,
				content: content,
				userId: userId
			};
			const headers = {
				"Authorization": `Bearer ${token}`,
				"Content-Type": `multipart/form-data`,
			};
			await axios.post(`http://api.4m2d.site/mail/{userId}`, data, {headers})
		}
		pushData();
	}

	const onChangeTitle = (e) => {
		setTitle(e.target.value);
	}

	const onChangeContent = (e) => {
		setContent(e.target.value);
	}

	return (
		<div>
			<Header />
			<FaqC>
				<h1>문의 등록</h1>
				<span>문의를 보내주세요! 어떠한 문의라도 받고 있습니다.</span>
				<MainC>
					<DetailC>
						<span>상세정보</span>
					</DetailC>
					<FormC>
						<div>
							<label for="title">제목</label>
							<input onChange={onChangeTitle} type="text" id="title" value={title} maxLength="150" required placeholder="제목을 입력하세요."></input>
						</div>
						<div>
							<label for="info">내용</label>
							<textarea onChange={onChangeContent} type="text" id="info" cols="50" rows="6" value={content} required placeholder="내용을 입력하세요."></textarea>
						</div>
						<SubmitC>
							<input type="submit" onClick={onClick}></input>
						</SubmitC>
					</FormC>
				</MainC>
			</FaqC>
			<Footer />
		</div>
	)
}

const FaqC = styled.div`
	width: 1200px;
	height: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	> h1 {
		font-size: 2em;
		font-weight: 600;
		margin: 2rem 0rem 1.2rem 0rem;
	}
	> span {
		font-size: 1em;
		margin-bottom: 2rem;
	}
`
const FormC = styled.form`
	width: 80%;
	box-sizing: border-box;
	margin: 0 auto;
	> div {
		margin-bottom: 1.5rem;
		> label {
			margin-bottom: 5px;
			font-size: 10px;
			font-weight: 600;
			line-height: 26px;
			letter-spacing:1.2px;
			display: inline-block;
			max-width: 100%;
		}
		> input {
			border: 2px solid rgba(0, 0, 0, 0.1);
			width: 100%;
			display: block;
			padding: 12px 30px;
			height: 50px;
			font-size: 14px;
			font-weight: 600;
			letter-spacing: 1.2px;
		}
		> textarea {
			border: 2px solid rgba(0, 0, 0, 0.1);
			width: 100%;
			padding: 12px 30px;
			display: block;
			font-size: 14px;
			font-weight: 600;
			letter-spacing: 1.2px;
		}
	}
`

const MainC = styled.div`
	width: 80%;
	box-sizing: border-box;
`

const DetailC = styled.div`
	width: 100%;
	margin-bottom: 1.2rem;
	padding: 10px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	font-size: 0.5em;

`

const SubmitC = styled.div`
	width: 20%;
	margin: 0 auto;
	> input {
		display: block;
		color: rgba(0, 0, 0, 0.7);
		padding: 12px, 70px;
		font-weight: 700;
		cursor: pointer;
		font-size: 10px;
	}
`

export default Faq
