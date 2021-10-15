import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

function PostViewComp({ idx }) {

	let [item, setItem] = useState([]);
	let [Loading, setLoading] = useState(true);
	useEffect(() => {
		const getImg = async () => {
			const { data } = await axios.get("http://localhost:8000/ukwon/");
			setItem(data);
			setLoading(!Loading);
		};
		getImg();
	}, []);
	function imgClick(idx) {
		let temp = [...item];
		temp[idx].likes += 1;
		setItem(temp);
	}
	return (
			<PostViewLineC>
				{Loading
					? console.log("wait")
					: item.map((data, index) => {
						console.log(idx, ": idx");
							if (index < idx || index > (idx + 4)) return;
							let title = "";
							console.log(data.title.length);
							if (data.title.length >= 10) title = data.title.slice(0, 10) + "...";
							else title = data.title.slice(0, 8);
							return (
								<PostItemC>
									<Link
										to={{
											pathname: "/post/detail",
											state: {
												item: item,
												itemId: data.id,
											},
										}}
									>
										<img onClick={() => imgClick(index)} src={data.img} />
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
	let [Loading, setLoading] = useState(true);

	useEffect(() => {
			setLoading(!Loading);
	}, []);

	return (
		<PostViewC>
			{console.log()}
			<h3>인기게시글</h3>
			<PostViewLineC>{Loading ? "" : <PostViewComp idx={0} />}</PostViewLineC>
			<PostViewLineC>{Loading ? "" : <PostViewComp idx={5} />}</PostViewLineC>
			<h3>추천게시글</h3>
			<PostViewLineC>{Loading ? "" : <PostViewComp idx={10} />}</PostViewLineC>
			<PostViewLineC>{Loading ? "" : <PostViewComp idx={15} />}</PostViewLineC>
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
	width: 15%;
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
	> div:last-child {
		margin-top: 10px;
		margin-bottom: 5px;
		color: rgba(0, 0, 0, 0.9);
	}
	> div:nth-child(2) {
		color: rgba(0, 0, 0, 0.6);
	}
`;

export default PreviewPost;
