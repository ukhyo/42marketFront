import Header from "../Mainpage/Header";
import ProductStateBar from "./Product";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

function ShowData(props) {
	console.log(props);
	return (
		<ShowDataC>
			<SellImgC>
				<img src={ props.img }/>
			</SellImgC>
			<TitlePriceC>
				<div>{props.title}</div>
				<div>{props.price}원</div>
			</TitlePriceC>
		</ShowDataC>
	);
}

function ProductManage() {
	const [PostList, setPostList] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const { data } = await axios.get("http://localhost:4000/posts/");
			setPostList(data);
		}
		getData();
	}, [])
	return (
		<SectionC>
			<MainC>
				<MainHeaderC>
					<input type="text" placeholder="상품명을 입력해주세요." />
					<img src={process.env.PUBLIC_URL + "/img/searchIcon.png"} />
				</MainHeaderC>
				{PostList.map((data, index) => {
					return <ShowData img={data.img} title={data.title} price={data.price} content={data.subtitle} id={data.id} />;
				})}
			</MainC>
		</SectionC>
	);
}

const MainC = styled.div`
	width: 1000px;
	margin: 0 auto;
`;

const MainHeaderC = styled.fieldset`
	width: 400px;
	display: flex;
	align-items: center;
	border: 1px solid black;
	height: 50px;
	margin-top: 35px;
	> input {
		outline: none;
		border:none;
		background-color: #fdfdfd;
		width: 400px;
		height: 40px;
	}
	img {
		padding-right: 10px;
		width: 30px;
		height: 20px;
	}
	margin-bottom: 20px;
`;

const ShowDataC = styled.div`
	width: 1000px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	padding-bottom: 10px;
	border-bottom: 1px solid #c0c0c0;
`;

const SellImgC = styled.div`
	width: 16%;
	> img {
		width: 160px;
		height: 160px;
	}
`;

const TitlePriceC = styled.div`
	margin-left: 20px;
	> div:first-child {
		padding-bottom: 20px;
	}
	> div:last-child {
		font-weight: bold;
	}
`;
const SectionC = styled.div`
	margin: 0 auto;
`;

export default ProductManage;
