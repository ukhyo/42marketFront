import Header from "../Mainpage/Header";
import ProductStateBar from "./Product";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import PostDelete from "../utils/PostDelete";
import InfoList from "../Mypage/Infolist";

function ShowData() {
	return (
		<ShowDataC>
			<InfoList url={"manage"} id={1} />
		</ShowDataC>
	);
}

function ProductManage() {
	const [data, setData] = useState([]);
	const [Loading, setLoading] = useState(false);
	useEffect(() => {
		const getData = async () => {
			const { data } = await axios.get("http://api.4m2d.shop/api/posts/user/1");
			console.log(data, "체크");
			setData(data);
			setLoading(!Loading);
		}
		getData();
	}, [])
	return (
		<SectionC>
			<MainC>
			<RegiHeaderC>
				<span>상품관리</span>
			</RegiHeaderC>
			<ShowData />
			</MainC>
		</SectionC>
	);
}

const MainC = styled.div`
	width: 1000px;
	margin: 0 auto;

`;

const RegiHeaderC = styled.div`
	width: 1000px;
	margin: 0 auto;
	height: 65px;
	> span:first-child {
		font-size: 30px;
		margin-right: 50px;
	}

	border-bottom: 1px solid black;
`;

const ShowDataC = styled.div`
	width: 1000px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	padding-bottom: 10px;
	/*border-bottom: 1px solid #c0c0c0;*/
`;

const SectionC = styled.div`
	margin: 0 auto;
`;

export default ProductManage;
