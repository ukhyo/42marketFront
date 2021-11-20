import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CategoryBar from "../Mainpage/CategoryBar";
import { PostThumbnail } from "../Mainpage/PreviewPost";
function CateDetail(props) {
	const [isActive, setIsActive] = useState(false);
	const [item, setItem] = useState([]);
	const onClick = () => setIsActive(!isActive);
	let { undefined: cate } = props.match.params;
	const catename = ["전체", "전자기기", "주변기기", "의류", "책", "나눔"];
	const AlignBtn = (e, idx) => {
		let url = "";
		if (idx === 1) // 오래된 구독 순
			url = "subscribes";
		else if (idx === 2) // 최신인기순 조회수
			url = "view";
		else if (idx === 3) // 최신
			url = "desc";
		else if (idx === 4) // 오래된
			url = "asc";
		const alignGet = async () => {
			const { data: data } = await axios.get(`http://api.4m2d.shop/api/posts/category/${cate}/${url}`);
			setItem(data);
		};
		alignGet();
	}

	useEffect(() => {
		const getData = async () => {
			const { data: data } = await axios.get(`http://api.4m2d.shop/api/posts/category/${cate}`);
			setItem(data);
		};
		getData();
	}, [cate]);
	return (
		<SectionC>
			<CategoryBar />
			<NameAndSortC>
				<CateNameC>{catename[Number(cate)]}</CateNameC>
				<MenuTriggerC onClick={onClick} >
					<img src={process.env.PUBLIC_URL + "/img/alignBtn.png"} />
				</MenuTriggerC>
				<MenuC active={isActive}>
					  <ul>
						<li onClick={(e) => {
							AlignBtn(e, 1);
							setIsActive(!isActive);
						}}><span>구독순</span></li>
						<li onClick={(e) => {
							AlignBtn(e, 2);
							setIsActive(!isActive);
							}}><span>조회순</span></li>
						<li onClick={(e) => {
							AlignBtn(e, 3);
							setIsActive(!isActive);
						}}><span>최신글</span></li>
						<li onClick={(e) => {
							AlignBtn(e, 4);
							setIsActive(!isActive);
							}}><span>오래된글</span></li>
					  </ul>
				</MenuC>
			</NameAndSortC>
			<PostViewC>
			{item.map((data, idx) => {
				return (
					<PostThumbnail data={data} key={idx} />
				);
			})}
			</PostViewC>
		</SectionC>
	);
}

const MenuContainerC = styled.div`
	position: relative;
	cursor: pointer;
`;

const MenuTriggerC = styled.button`
	position: absolute;
	top: 15px;
	right: 20px;
	cursor: pointer;
	background-color: transparent;
	border:none;
`;

const MenuC = styled.nav`
	z-index: 5;
	background: #ffffff;
	border-radius: 8px;
	position: absolute;
	top: 55px;
	right: -40px;
	width: 100px;
	box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
	opacity: ${props => (props.active ? '1' : '0')};
	visibility: ${props => (props.active ? 'visible' : 'hidden')};
	transform: ${props => (props.active ? 'translateY(0)' : 'translateY(-20px)')};
	transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
	> ul {
		list-style: none;
		padding: 0;
		margin: 0;
		> li {
			border-bottom: 1px solid #dddddd;
			> span {
				text-decoration: none;
				color: rgba(0, 0, 0, 0.7);
				padding: 10px 15px;
				display: block;
			}
		}
	}
`;

const SectionC = styled.section`
	width: 1200px;
	margin: 0 auto;
`;

const NameAndSortC = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	position:relative;
`;

const CateSortC = styled.div`

`;

const CateNameC = styled.div`
	margin-top: 10px;
	margin-bottom: 20px;
	font-size: 2em;
`;

const PostViewC = styled.div`
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	> div:not(:nth-child(5n))
	{
		margin-right: 2%;
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
