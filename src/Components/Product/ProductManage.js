import Header from "../Mainpage/Header";
import ProductStateBar from "./Product";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import PostDelete from "../utils/PostDelete";
import InfoList from "../Mypage/Infolist";
function ShowData({ data }) {
	const [showState, setShowState] = useState("판매중");
	const [show, setShow] = useState(false);
	const DropBtn = (e) => {
		setShow(!show);
	}
	useEffect(() => {
		if (data.state === 1) setShowState("판매 완료");
	}, [])
	console.log(data, "체킹");
	const stateSet = async (e, choice, msg) => {
		alert(msg);
		// 이부분 어떻게 수정할지 고민해봐야할것같음.
		const config = {
		  "title": data.title,
		  "subtitle": data.subtitle,
		  "likes": data.likes,
		  "price": data.price,
		  "img": data.img,
		  "date": Date.now(),
		  "location": data.location,
		  "category": data.category,
		  "state" : choice,
		}
		await axios.put(`http://localhost:3001/posts/${data.id}`, config);
		console.log("수정 Clikc!");
		if (choice === 1)
			setShowState("판매 완료");
		else
			setShowState("판매 중");
	}
	return (
		<ShowDataC>
			<InfoList url={"manage"} id={1} />
			<SellImgC>
				<BackImgC url={data.image} />
			</SellImgC>
			<TitlePriceC>
				<div>{data.title}</div>
				<div>{data.price}원</div>
			</TitlePriceC>
			<StateManageC>
				<SellDropBtnC onClick={DropBtn}>
					<div>
						{showState}<img src={process.env.PUBLIC_URL + "/img/DropBtn.png"} />
					{show && (
						<ul>
							<li>
								<button onClick={(e) => {
									stateSet(e, 1, "상품 상태가 변경되었습니다.");
								}}>판매완료</button>
							</li>
							<li>
								<button onClick={(e) => {
									stateSet(e, 0, "상품 상태가 변경되었습니다.");
								}}>판매중</button>
							</li>
							<li>
								<button>
									<Link to={{
											pathname: `/product/edit`,
											state: {
												data: data,
											},
										}}>
										수정
									</Link>
								</button>
							</li>
							<li>
									<button onClick={(e) => {
										PostDelete(e, data.id);
								}}>삭제</button>
							</li>
						</ul>
					)}
					</div>
				</SellDropBtnC>
			</StateManageC>
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
				<MainHeaderC>
					<input type="text" placeholder="상품명을 입력해주세요." />
					<img src={process.env.PUBLIC_URL + "/img/searchIcon.png"} />
				</MainHeaderC>
				{Loading && data.map((data, idx) => {
					return <ShowData key={idx} data={data} />
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

const BackImgC = styled.div`
	width: 160px;
	height: 160px;
	background-image: url("${(props) => props.url}");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	border-radius: 15px;
	margin-right: 30px;
	margin-top: 10px;
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
	width: 74%;
	> div:first-child {
		padding-bottom: 20px;
	}
	> div:last-child {
		font-weight: bold;
	}
`;

const StateManageC = styled.div`
	text-align: right;
	display:flex;
`;

const SellDropBtnC = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	flex-direction:column;
	border: 1px solid rgb(130, 130, 238);
	margin: 0;
	padding: 0;
	> div {
		width: 95px;
		position: relative;
		display: flex;
		align-items: center;
	}
	> div >  ul {
		position:absolute;
		right: -100%;
		width: 98%;
		box-sizing: border-box;
		text-align: left;
		margin: 0;
		padding: 0;
		background-color: #fdfdfd;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: left;
		> li:not(li:first-child) {
			margin-top: 5px;
		}
		> li {
			> button {
				width: 100%;
				background-color: transparent;
				border: 1px solid rgb(130,130, 238);
				&hover {
					color: rgb(130, 130, 238);
				}
			}

		}
	}
`;

const SectionC = styled.div`
	margin: 0 auto;
`;

export default ProductManage;
//{Loading && item.viewList.map((data, index) => {
//	let title;
//	data.title.length > 12 ? title = data.title.slice(0, 12) + "..."
//		: title = data.title;
//				return (
//					<PostItemC key={index}>
//						<LinkC
//							to={{
//								pathname: `/postview/${data.id}`,
//								state: {
//									data: data,
//									itemId: data.id,
//								},
//							}}
//						>
//							{/*<HoverImgC url={data.subThumbnailList[0]}>안녕</HoverImgC>*/}
//							<BackImgC url={subItem[index]}></BackImgC>
//						</LinkC>
//						<div>{title}</div>
//						<div>
//							<div>
//								{data.price}
//								<b>원</b>
//							</div>
//							<div>
//								<p>{data.likes}</p>
//								<IconContext.Provider value={{ color: "rgb(255, 67, 46)" }}>
//									<BsSuitHeartFill size={18} />
//								</IconContext.Provider>
//							</div>
//						</div>
//					</PostItemC>
//				);
//})}
