import React, { useEffect, useState } from 'react';
import Header from '../Mainpage/Header';
import styled from 'styled-components';
import Footer from '../Mainpage/Footer';
import axios from 'axios';
import { AiOutlineEye } from "react-icons/ai";
import { BsSuitHeartFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import Coming_soon from "../../Images/coming_soon.jpeg";
import { Cookies } from "react-cookie";
import GetTime from "../utils/GetTime";
function PostDetail(props) {
	const cookie = new Cookies();
	let  { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();
	const { location } = props;
	const { location: { state: { itemId: id } } } = props;
	const { location: { state: { subList: subList } } } = props;
	const [ImgIdx, setImgIdx] = useState(0);
	const [data, setData] = useState([]);
	const [Loading, setLoading] = useState(false);
	if (userId === undefined)
		userId = "0";
	const ClickScribe = () => {
		const headers = {
			//"Authorization": `Bearer ${token}`,
			"withCreadentials": true,
			//'Access-Control-Allow-Origin' : '*',
 			//'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		};
		if (subList.indexOf(`/${data.id}/`) === -1) // 구독 안되있는 상태
		{
			const ApiPost = async () => {
				const config = {
					userId: userId,
					postId: data.id,
				}
				await axios.post("http://api.4m2d.shop/api/carts", config, {headers}).then(res => {
					console.log("구독 성공");
				}).catch(err => {
					console.log(err);
					console.log("구독 실패");
				});
			}
			ApiPost();
		}
		else { //구독 해제
			const ApiDelete = async () => {
				const config = {
					userId: userId,
					postId: data.id,
				};
				await axios.delete(`http://api.4m2d.shop/api/carts`, config, { headers }).then(res => {
					console.log("구독 해제 성공");
				}).catch(err => {
					console.log("구독 해제 실패");
				});
			}
			ApiDelete();
		}
	};
	useEffect(() => {
		if (location.state === undefined) props.history.push('/');
		const ApiGet = async () => {
			setLoading(false);
			const data = await axios.get(`http://api.4m2d.shop/api/posts/${id}`).then(res => {
				return res.data;
			}).catch(err => {
				console.log("상세보기 실패");
			})
			setData(data);
			setLoading(true);
		}
		ApiGet();
	}, [])

	const SelectPicture = (e, flag) => {
		if (flag == 0) {
			if (ImgIdx <= 0)
				return;
			setImgIdx(ImgIdx - 1)
		}
		else {
			if (ImgIdx + 1 >= data.image.length)
				return;
			setImgIdx(ImgIdx + 1);
		}
	};

	return (
		<div>
			<Header />
			<PostDetailC flag={Loading}>
				{Loading && (
					<PostDetailHeaderC>
						<PostDetailMainC>
							<BackImg url={data.image[ImgIdx]} />
							<LeftRightBtnC>
								<div
									onClick={(e) => {
										SelectPicture(e, 0);
									}}
								>
									<img src={process.env.PUBLIC_URL + "/img/LeftArrow.png"} />
								</div>
								<div>
									{ImgIdx + 1}/{data.image.length}
								</div>
								<div
									onClick={(e) => {
										SelectPicture(e, 1);
									}}
								>
									<img src={process.env.PUBLIC_URL + "/img/RightArrow.png"} />
								</div>
							</LeftRightBtnC>
						</PostDetailMainC>
						<PostDetailInfoC>
							<TitleC>
								<div>
									{data.title}
								</div>
								<div>
									<b>
										판매자 &nbsp;
										<Link to={`/mypage/${data.userId}/selllist`}>
											{data.author}
										</Link>
									</b>
								</div>
							</TitleC>
							<PriceAndDateC>
								<div>{data.price.toLocaleString()}<b>원</b></div>
								<DateC>{GetTime(data.createdAt)}</DateC>
							</PriceAndDateC>
							<LocationAndViewsC>
								<LocationArea>
									<AiOutlineEye size={18} /><b>{data.view}</b>
								</LocationArea>
								<LocationArea>
									<IconContext.Provider value={{ color: "rgb(234, 123, 151)" }}>
										<BsSuitHeartFill size={18} /><b>{data.subscribes}</b>
									</IconContext.Provider>
								</LocationArea>
							</LocationAndViewsC>
							<Location>
								<div>
									거래장소 <span>{data.local}</span>
								</div>
							</Location>
							<PostContentsC>
								<ContentC>
									{data.content}
								</ContentC>
							</PostContentsC>
							{userId === "0" ?
								<a href="https://api.intra.42.fr/oauth/authorize?client_id=2b02d6cbfa01cb92c9572fc7f3fbc94895fc108fc55768a7b3f47bc1fb014f01&redirect_uri=http%3A%2F%2Fapi.4m2d.shop%2Flogin%2FgetToken&response_type=code"><SubscribeBtn>로그인</SubscribeBtn></a>
								: (userId === data.userId)
								(subList.indexOf(`/${data.id}/`) === -1 ?
								<SubscribeBtn onClick={e => {
									ClickScribe();
								}}>구독</SubscribeBtn>
									:
								<SubscribeBtn onClick={e => {
									ClickScribe();
									}}>구독해제</SubscribeBtn>

								)}
						</PostDetailInfoC>
					</PostDetailHeaderC>
				)}
				<CommentArea>
					<RegiHeaderC>
						<span>댓글</span>
					</RegiHeaderC>
					<CommentMain>
					<img src={Coming_soon} />
					</CommentMain>
				</CommentArea>
			</PostDetailC>

			<Footer />
		</div>
	);
}


// CSS style ----------------------------------------------------


const PostDetailC = styled.div`
	width: 1200px;
	height: 900px;
	margin: 0 auto;
	margin-top: 80px;
	cursor: ${(props ) => props.flag ? "" : "wait"};
`;

const PostDetailHeaderC = styled.div`
	display: flex;
	/*position: absolute;*/
	margin-bottom: 50px;
	padding-bottom: 30px;
	border-bottom: 1px solid #c0c0c0;
`;
const LeftRightBtnC = styled.div`
	bottom: 0px;
	padding: 0;
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-top: 20px;
	> div {
		cursor: pointer;
	}
`;
const PostDetailMainC = styled.div`

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	align-items: center;
	width: 500px;
	height: 500px;
	position: relative;
`;

const BackImg = styled.div`
	width: 100%;
	height: 500px;
	background-image: url("${(props) => props.url}");
	background-position: center;
	background-size: cover;
	border-radius: 15px;
	box-sizing: border-box;
`;

const PostDetailInfoC = styled.div`
	position: relative;
	width: 60%;
	margin-left: 50px;
	> div:first-child { // 제목
		font-size: 24px;
		margin-bottom: 20px;
	}
	> div:nth-child(2) { // 가격 / 시간
		width: 100%;
		font-size: 30px;
		/*font-weight: bold;*/
		padding-bottom: 15px;
		border-bottom: 1px solid #c0c0c0;
		div > b {
			margin-left: 3px;
			font-size: 20px;
		}
	}
	`;

const Location = styled.ul` // 거래장소
	padding-bottom: 15px;
	padding-top: 15px;
	font-size: 17px;
	border-bottom: 1px solid #c0c0c0;
	list-style: inside;
	> li {
		padding: 10px 0px;
	}
`;

const TitleC = styled.div`
	display: flex;
	justify-content: space-between;
	> div:nth-child(1) {
		color: rgba(0, 0, 0, 0.7);
		font-weight: 700;
	}
	> div > b { // 판매자
		font-size: 18px;
		> b {
			color: rgb(130, 130, 238);
			text-decoration: underline;
			cursor: pointer;
		}
	}
	> div:first-child {
		width: 500px;
	}
`;

const DateC = styled.div`
	font-size: 20px;
`;

const PriceAndDateC = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	> div {
		color: rgba(0, 0, 0, 0.8);
		font-weight: 800;
	}
	/* > div:last-child {
		font-weight: normal;
	} */
`;
const LocationArea = styled.div`
	margin-top: 5px;
	position: relative;
`;

const LocationAndViewsC = styled.div`
	margin-top: 10px;
	display: flex;
	/*justify-content: space-between;*/
	align-items: center;
	> ${LocationArea}:first-child {
		width: 50px;
		height: 20px;
		position: static;
		> b {
			position: relative;
			top: -3.5px;
			left: 4px;
		}
	}
	> ${LocationArea}:last-child {
		margin-left : 5px;
		width: 50px;
		height: 20px;
		position: static;
		> b {
			position: relative;
			top: -3.5px;
			left: 5px;
		}
	}
`;

const PostContentsC = styled.div`
	display: flex;
	margin-top: 15px;
	line-height: 24px;
	font-size: 18px;
`;

const ContentC = styled.div`
	width: 80%;
`;


const SubscribeBtn = styled.button`
	position: absolute;
	width: 160px;
	height: 50px;
	bottom: 0px;
	border: none;
	background-color: rgb(255, 67, 46);
	color :white;
	border-radius: 10px;
`;

// 하단부

const CommentArea = styled.div`
	width: 1200px;

`;

const RegiHeaderC = styled.div`
	width: 100%;
	margin: 0 auto;
	height: 65px;
	> span:first-child {
		font-size: 30px;
		margin-right: 50px;
	}
`;

const CommentMain = styled.div`
	/*width: 100%;*/
	/*height: 500px;*/
	/*background-color: white;*/
`;

export default PostDetail;
