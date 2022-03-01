import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CategoryBar from "../Mainpage/CategoryBar";
import { PostThumbnail } from "../Mainpage/PreviewPost";
import { Cookies } from "react-cookie";
import { PostViewComp } from "../Mainpage/PreviewPost";
import Footer from "../Mainpage/Footer";
function CateDetail(props) {
	const cookie = new Cookies()
	let { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();
	const [isActive, setIsActive] = useState(false);
	const [item, setItem] = useState([]);
	const [Loading, setLoading] = useState(false);
	const [timeFlag, setTimeFlag] = useState(true);
	const [priceFlag, setPriceFlag] = useState(true);
	const onClick = () => setIsActive(!isActive);

	if (userId === undefined)
		userId = "0";
	let { undefined: cate } = props.match.params;
	const catename = ["전체", "전자", "생활", "레저", "패션", "음악/악기", "뷰티", "도서", "나눔", "기타"];
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
			const { data: data } = await axios.get(`http://api.4m2d.site/api/posts/category/${cate}/${url}/${userId}`);
			setItem(data);
		};
		alignGet();
	}
	useEffect(() => {
		const getData = async () => {
			setLoading(false);
			const { data: data } = await axios.get(`http://api.4m2d.site/api/posts/category/${cate}/${userId}`);
			setItem(data);
			setLoading(true);
		};
		getData();
	}, [cate]);
	return (
		<SectionC>
			<CategoryBar />
			<NameAndSortC>
				<CateNameC>{catename[Number(cate)]}</CateNameC>
				<MenuTriggerC onClick={onClick} >
					<span>정렬</span>
					{/*<img src={process.env.PUBLIC_URL + "/img/alignBtn.png"} />*/}
				</MenuTriggerC>
				<MenuC active={isActive}>
					  <ul>
						<li onClick={(e) => {
							AlignBtn(e, 1);
							setIsActive(!isActive);
						}}><span>좋아요순</span></li>
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
				{Loading && item.postsThumbnailResponseDtoList.length >= 1 ?
					<PostViewComp item={item.postsThumbnailResponseDtoList} subList={item.subList} Loading={Loading} flag={true} />
					:
					<NotFoundC>
						해당 카테고리 상품이 없습니다!
					</NotFoundC>
				}
			</PostViewC>
		</SectionC>
	);
}


const NotFoundC = styled.div`
	width: 1200px;
	margin: 0 auto;
	font-size: 40px;
	text-align: center;
	margin-top: 100px;
	margin-bottom: 200px;
`;


const MenuTriggerC = styled.button`
	position: absolute;
	top: -12px;
	right: 20px;
	cursor: pointer;
	background-color: transparent;
	/*border:none;*/
	background: #ffffff;
	border-radius: 90px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 4px 6px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	border: none;
	vertical-align: middle;
	transition: box-shadow 0.4s ease;
	text-align: center;
	> span {
		width: 80px;
		height: 30px;
		line-height:30px;
		font-weight: 700;
		vertical-align: middle;
		font-size: 14px;
		color: rgba(0, 0, 0, 0.7);
		margin: 0 10px;
		text-align: center;
	}
`;

const MenuC = styled.nav`
	z-index: 5;
	background: #ffffff;
	border-radius: 8px;
	position: absolute;
	top: 55px;
	right: -20px;
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
	margin-bottom: 20px;
	margin-top: 65px;
`;
const SectionC = styled.section`
	width: 1200px;
	margin: 0 auto;
`;

const CateNameC = styled.div`
	/*margin-top: 30px;*/
	/*margin-bottom: 20px;*/
	font-size: 24px;
	line-height: 10px;
	font-weight: 600;
`;

const PostViewC = styled.div`
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	> div:not(:nth-child(5n))
	{
		margin-right: 2.25%;
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
