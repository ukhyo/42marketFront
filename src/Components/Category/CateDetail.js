import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CategoryBar from "../Mainpage/CategoryBar";

function CateDetail(props) {
	const [item, setItem] = useState([]);
	console.log(props,"네네 선장님");
	let { undefined: cate } = props.match.params;
	const catename = ["전체", "전자기기", "주변기기", "의류", "책", "나눔"];
	console.log(catename[Number(cate)]);
	useEffect(() => {
		const getData = async () => {
			const { data: data } = await axios.get(`http://api.4m2d.shop/api/posts/category/${cate}`);
			console.log(data, "데이터 0 아닐때");
			setItem(data);
		};
		const getData2 = async () => {
			const { data: data } = await axios.get(`http://api.4m2d.shop/api/posts/`);
			console.log(data, "전체게시글");
			setItem(data);
		};
		if (cate !== "0")
		getData();
		else
		getData2();
	}, [cate]);
	return (
		<SectionC>
			<CategoryBar />
			<NameAndSortC>
				<CateNameC>{catename[Number(cate)]}</CateNameC>
			</NameAndSortC>
			<PostViewC>
			{item.map((data, idx) => {
				return (
					<PostItemC key={idx}>
						<Link
							to={{
								pathname: `/postview/${data.id}`,
								state: {
									data: data,
									itemId: data.id,
								},
							}}
							>
							<BackImgC url={data.image} />
						</Link>
						<div>{data.title}</div>
						<div>{data.price} 원</div>
					</PostItemC>
				);
			})}
			</PostViewC>
		</SectionC>
	);
}

const SectionC = styled.section`
	width: 1200px;
	margin: 0 auto;
`;

const NameAndSortC = styled.div`
	width: 100%;
`;

const CateSortC = styled.div`

`;

const CateNameC = styled.div`
	margin-top: 10px;
	margin-bottom: 20px;
	font-size: 2em;
`;

const PostViewC = styled.div`
	width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	> div:not(div:nth-child(5n)) {
		margin-right: 10px;
	}
`;

const BackImgC = styled.div`
	background-image: url("${(props) => props.url}");
`;

const PostItemC = styled.div`
	width: 19%;
	height: 270px;
	border-radius: 15px;
	margin-bottom: 20px;
	border: 1px solid #f0f0f0;
	/*background-color: rgb(178, 236, 238);*/
	background-color: #ffffff;
	${BackImgC} {
		width: 100%px;
		height: 200px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		border-radius: 15px;
		box-sizing: border-box;
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

export default CateDetail;
