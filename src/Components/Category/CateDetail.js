import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CategoryBar from "../Mainpage/CategoryBar";
function CateDetail(props) {
	const [item, setItem] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const { data } = await axios.get("http://localhost:3001/posts/");
			setItem(data);
		};
		getData();
	}, []);
	let { undefined: cate } = props.match.params;
	cate = Number(cate);
	return (
		<SectionC>
			<CategoryBar />
			<NameAndSortC>
				<CateNameC>카테고리네임 디비에서 가져올 예정</CateNameC>
			</NameAndSortC>
			<PostViewC>
			{item.map((data, idx) => {
				if (data.category != cate && cate != 0) return;
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
							<BackImgC url={data.img[0]} />
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
