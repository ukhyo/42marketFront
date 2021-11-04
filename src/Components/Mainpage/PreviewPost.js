import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

function PostViewComp({ idx }) {
	let [item, setItem] = useState([]);
	useEffect(() => {
		const ApiGet = async () => {
			// Aws EC2

			//const { data } = await axios.get("http://52.79.76.165/login").then((response) => {
			//	console.log(response, "test");
			//	return response;
			//});

			// local data
			const { data } = await axios.get("http://localhost:3001/posts").then((response) => {
				console.log(response, "test");
				return response;
			});
			console.log(data);
			let tempArr = [];
			let i = 0;
			if (data.length < idx + 5) {
				alert("error");
				return;
			}
			else {
				console.log(data.length);
			}
			const limit = idx + 5;
			for (idx; idx < limit; idx++) {
				tempArr[i] = data[idx];
				i++;
			}
			setItem(tempArr);
		};
		ApiGet();
	}, []);

	return (
			<PostViewLineC>
			{item.map((data, index) => {
				let title;
				data.title.length > 12 ? title = data.title.slice(0, 12) + "..."
					: title = data.title;
							return (
								<PostItemC key={index}>
									<Link
										to={{
											pathname: `/postview/${data.id}`,
											state: {
												data: data,
												itemId: data.id,
											},
										}}
									>
										<BackImgC url={data.img[0]} />
									</Link>
									<div>{title}</div>
									<div>{data.price} 원</div>
								</PostItemC>
							);
					  })}
			</PostViewLineC>
	);
}

function PreviewPost() {
	return (
		<PostViewC>
			{console.log()}
			<h3>인기게시글</h3>
			<PostViewLineC><PostViewComp idx={5} /></PostViewLineC>
			<PostViewLineC><PostViewComp idx={0} /></PostViewLineC>
			<h3>추천게시글</h3>
			<PostViewLineC><PostViewComp idx={10} /></PostViewLineC>
			<PostViewLineC><PostViewComp idx={15} /></PostViewLineC>
		</PostViewC>
	);
}


const PostViewC = styled.div`
	width: 1200px;
	margin: 0px auto;
	> h3 {
		font-size: 20px;
		margin-top: 40px;
		margin-bottom: 10px;
	}
	> div:last-child {
		margin-bottom: 50px;
	}
`;

const PostViewLineC = styled.div`
	width: 100%;
	height: 270px;

	margin: 10px auto;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
`;

const BackImgC = styled.div`
	width: 100%;
	height: 200px;
	background-position: center;
	background-size: cover;
	border-radius: 15px;
	box-sizing: border-box;
	background-image: url("${(props) => props.url}");
`;


const PostItemC = styled.div`
	width: 18%;
	height: 270px;
	border-radius: 15px;
	margin-bottom: 20px;
	border: 1px solid #f0f0f0;
	background-color: #ffffff;
	> div {
		width: 100%;
		margin-top: 10px;
		font-size: 16px;
		padding-left: 10px;
	}
	> div:nth-child(2) {
		color: rgba(0, 0, 0, 0.6);
	}
	> div:last-child {
		margin-top: 10px;
		margin-bottom: 5px;
		color: rgba(0, 0, 0, 0.9);
	}
`;

export default PreviewPost;
