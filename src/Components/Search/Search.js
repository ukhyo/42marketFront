import React, { useEffect, useState } from "react";
import Header from "../Mainpage/Header";
import Footer from "../Mainpage/Footer";
import CategoryBar from "../Mainpage/CategoryBar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostThumbnail } from "../Mainpage/PreviewPost";
import axios from "axios";
import { Cookies } from "react-cookie";
function Searc(props) {
	const cookie = new Cookies();
	let { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();
	const [item, setItem] = useState([]);
	const [Loading, setLoading] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [timeFlag, setTimeFlag] = useState(true);
	const [priceFlag, setPriceFlag] = useState(true);
	const onClick = () => setIsActive(!isActive);
	let word = props.match.params.word;
	const AlignBtn = (e, idx) => {
		let url = "";
		if (idx === 1) // 오래된 구독 순
			url = "subscribes";
		else if (idx === 2) // 최신인기순 조회수
			url = "view";
		else if (idx === 3) // 최신
			url = "asc";
		else if (idx === 4) // 오래된
			url = "desc";
		else if (idx === 5) // 낮은가격순
			url = "priceasc";
		else if (idx === 6) // 높은가격순
			url = "pricedesc";
		else
			return;
		const alignGet = async () => {
			setLoading(false);
			const { data: data } = await axios.get(`http://api.4m2d.shop/api/posts/search/${userId}/${word}/${url}`);
			setItem(data);
			setLoading(true);
		};
		alignGet();
	}
	if (userId === undefined)
		userId = "0";
	useEffect(() => {
		const ApiGet = async () => {
			setLoading(false);
			const { data: data } = await axios.get(`http://api.4m2d.shop/api/posts/search/${userId}/${word}`);
			setItem(data);
			setLoading(true);
		}
		ApiGet();
	}, [word])
	if (!Loading)
		return <div>Loading!</div>;
	return (
		<SectionC>
			<Header />
			<CategoryBar />
			<NameAndSortC>
				<CateNameC>검색결과</CateNameC>
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
						{timeFlag ? (
							<li onClick={(e) => {
								AlignBtn(e, 3);
								setIsActive(!isActive);
								setTimeFlag(!timeFlag);
							}}><span>오래된글</span></li>
						) :
							<li onClick={(e) => {
								AlignBtn(e, 4);
								setIsActive(!isActive);
								setTimeFlag(!timeFlag);
							}}><span>최신글</span></li>}
						{priceFlag ? (
							<li onClick={(e) => {
							AlignBtn(e, 5);
								setIsActive(!isActive);
								setPriceFlag(!priceFlag);
							}}><span>낮은가격순</span></li>
						) : (
							<li onClick={(e) => {
								AlignBtn(e, 6);
									setIsActive(!isActive);
									setPriceFlag(!priceFlag);
								}}><span>높은가격순</span></li>
						) }
					  </ul>
				</MenuC>
			</NameAndSortC>
			<PostViewC>
				{item.postsThumbnailResponseDtoList.length !== 0 && item.postsThumbnailResponseDtoList.map((data, index) => {
					return (
						<PostThumbnail key={index} data={data} subList={ item.subList}/>
					);
				})
			}
			</PostViewC>
			{item.postsThumbnailResponseDtoList.length === 0 &&
				<NotFoundC>
					검색결과가 없습니다!
				</NotFoundC>

			}
			<Footer />
		</SectionC>
	);
}
const CateNameC = styled.div`
	margin-top: 30px;
	margin-bottom: 20px;
	font-size: 2em;
`;

const MenuTriggerC = styled.button`
	position: absolute;
	top: 35px;
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
	width: 110px;
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

const NameAndSortC = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	position:relative;
`;

const SectionC = styled.section`
	width: 1200px;
	margin: 0 auto;
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

const NotFoundC = styled.div`
	width: 1200px;
	margin: 0 auto;
	font-size: 40px;
	text-align: center;
	margin-top: 100px;
	margin-bottom: 200px;
`;

export default Searc;
