import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import M_CategoryBar from "../M_Mainpage/M_CategoryBar";
import { M_PostThumbnail } from "../M_Mainpage/M_PreviewPost";
import { Cookies } from "react-cookie";
import { M_PostViewComp } from "../M_Mainpage/M_PreviewPost";
import theme from "../../Styles/theme";
function M_CateDetail(props) {
	const cookie = new Cookies()
	let { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();
	const [isActive, setIsActive] = useState(false);
	const [item, setItem] = useState([]);
	const [Loading, setLoading] = useState(false);
	const [timeFlag, setTimeFlag] = useState(true);
	const [priceFlag, setPriceFlag] = useState(true);
	const onClick = () => setIsActive(!isActive);

	console.log(userId, "d");
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
			const { data: data } = await axios.get(`http://api.4m2d.shop/api/posts/category/${cate}/${url}/${userId}`);
			setItem(data);
		};
		alignGet();
	}
	useEffect(() => {
		const getData = async () => {
			setLoading(false);
			const { data: data } = await axios.get(`http://api.4m2d.shop/api/posts/category/${cate}/${userId}`);
			console.log(data, "변경된 url");
			setItem(data);
			setLoading(true);
		};
		getData();
	}, [cate]);
	return (
		<SectionC theme={theme}>
			<div>
				<M_CategoryBar />
			</div>
			<NameAndSortC theme={theme}>
				<CateNameC>{catename[Number(cate)]}</CateNameC>
				<MenuTriggerC onClick={onClick} >
					<div>정렬</div>
					<MenuC theme={theme} active={isActive}>
						  <ul>
							<li onClick={(e) => {
								AlignBtn(e, 1);
								setIsActive(!isActive);
							}}><div>좋아요순</div></li>
							<li onClick={(e) => {
								AlignBtn(e, 2);
								setIsActive(!isActive);
							}}><div>조회순</div></li>
							{timeFlag ? (
								<li onClick={(e) => {
									AlignBtn(e, 3);
									setIsActive(!isActive);
									setTimeFlag(!timeFlag);
								}}><div>오래된글</div></li>
							) :
								<li onClick={(e) => {
									AlignBtn(e, 4);
									setIsActive(!isActive);
									setTimeFlag(!timeFlag);
								}}><div>최신글</div></li>}
							{priceFlag ? (
								<li onClick={(e) => {
								AlignBtn(e, 5);
									setIsActive(!isActive);
									setPriceFlag(!priceFlag);
								}}><div>낮은가격순</div></li>
							) : (
								<li onClick={(e) => {
									AlignBtn(e, 6);
										setIsActive(!isActive);
										setPriceFlag(!priceFlag);
									}}><div>높은가격순</div></li>
							) }
						  </ul>
					</MenuC>
				</MenuTriggerC>
			</NameAndSortC>
			<PostViewC theme={theme}>
				{Loading && item.postsThumbnailResponseDtoList.length >= 1 ?
					<M_PostViewComp item={item.postsThumbnailResponseDtoList} subList={item.subList} Loading={Loading} flag={true} />
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
	position: relative;
	cursor: pointer;
	background-color: transparent;
	background: #ffffff;
	border-radius: 20px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	border: none;
	vertical-align: middle;
	transition: box-shadow 0.4s ease;
	text-align: center;
	width: 80px;
	height: 30px;
	> div {
		width: 80px;
		height: 30px;
		line-height:30px;
		font-weight: 600;
		font-size: 14px;
		color: rgba(0, 0, 0, 0.7);
	}
`;

const MenuC = styled.nav`
	z-index: 20;
	background: #ffffff;
	border-radius: 8px;
	position: absolute;
	top: 35px;
	width: 100px;
	box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
	opacity: ${props => (props.active ? '1' : '0')};
	visibility: ${props => (props.active ? 'visible' : 'hidden')};
	transform: ${props => (props.active ? 'translateY(0)' : 'translateY(-20px)')};
	transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
	> ul {
		list-style: none;
		border-radius: 15px;
		background-color: ${({theme}) => theme.color.backColor};
		padding: 0;
		margin: 0;
		> li {
			height: 20px;
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
	width: ${({theme}) => theme.widthSize.margin};
	display: flex;
	justify-content: space-between;
	position:relative;
	margin: 0 auto;
	margin-top: 40px;
`;


const CateNameC = styled.div`
	font-size: 1.2rem;
	height: 30px;
	line-height: 36px;
	font-weight: 600;
`;

const PostViewC = styled.div`
	width: ${({ theme }) => theme.widthSize.margin};
	box-sizing: border-box;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	> div:not(:nth-child(2n))
	{
		margin-left: 5%;
	}
`;

const BackImgC = styled.div`
	background-image: url("${(props) => props.url}");
`;

const SectionC = styled.section`
	width: ${({theme}) => theme.widthSize.full};
	margin: 0 auto;
	> div:first-child {
		width: ${({theme}) => theme.widthSize.full};
	}
`;

export default M_CateDetail;
