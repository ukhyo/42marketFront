import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

function PostViewComp({ idx }) {
	let [item, setItem] = useState([]);
	useEffect(() => {
		const getImg = async () => {
			const { data } = await axios.get("http://localhost:4000/posts/");
			setItem(data);
		};
		getImg();
	}, []);
	return (
			<PostViewLineC>
			{item.map((data, index) => {
				let title;
				if (data.title.length > 12)
					title = data.title.slice(0, 12) + "...";
				else
					title = data.title;
						if (index < idx || index > (idx + 4)) return;
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
										<img src={data.img} />
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

const PostItemC = styled.div`
	width: 18%;
	height: 270px;
	border-radius: 15px;
	margin-bottom: 20px;
	border: 1px solid #f0f0f0;
	/*background-color: rgb(178, 236, 238);*/
	background-color: #ffffff;
	& img {
		margin: 0;
		box-sizing: border-box;
		/*border: 1px solid rgb(178, 236, 238);*/
		/*border: 1px solid #f0f0f0;*/
		/*border-radius: 15px;*/
		border-top-right-radius: 15px;
		border-top-left-radius: 15px;
		width: 100%;
		height: 190px;
	}
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
