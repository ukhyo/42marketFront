import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

function PreviewPost() {
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
		<PostViewC>
			{console.log()}
			<h3>인기게시글</h3>
			<PostViewLineC>
				{Loading ? console.log("wait") : item.map((data, index) => {
							return (
								<PostItemC>
									<Link
										to={{
											pathname: "/post/detail",
											state: {
												item: item,
												itemId: data.id,
											},
										}}>
										<img onClick={() => (imgClick(index))} src={data.img} />
									</Link>
								</PostItemC>
							);
					  })}
			</PostViewLineC>
		</PostViewC>
	);
}

const PostViewC = styled.div`
	width: 1000px;
	margin: 0px auto;
`;

const PostViewLineC = styled.div`
	width: 100%;
	height: 900px;
	margin-bottom: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
`;

const PostItemC = styled.div`
	width: 18%;
	height: 200px;
	border-radius: 10px;
	background-color: #f5f5f5;
	margin-bottom: 20px;
	& img {
		border-radius: 10px;
		width: 180px;
		height: 200px;
	}
`;

export default PreviewPost;
