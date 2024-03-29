import React, { useEffect, useState } from 'react';
import Header from '../../Components/Mainpage/Header';
import styled from 'styled-components';
import Footer from '../../Components/Mainpage/Footer';
import axios from 'axios';
import { AiOutlineEye } from "react-icons/ai";
import { BsSuitHeartFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import Coming_soon from "../../Images/coming_soon.jpeg";
import { Cookies } from "react-cookie";
import GetTime from "../../Components/utils/GetTime";
import Comments from "./M_Comments";
import { HiOutlineClock } from 'react-icons/hi';
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import M_Header from "../M_Mainpage/M_Header";

function M_PostDetail(props) {
	const cookie = new Cookies();
	const statusName = ["판매중", "판매완료"];
	let { userId: userId, Authorization: token, view: view } = cookie.getAll();
	const { location } = props;
	const { location: { state: { itemId: id } } } = props;
	const { location: { state: { subList: subList } } } = props;
	let [ImgIdx, setImgIdx] = useState(0);
	const [data, setData] = useState([]);
	const [Loading, setLoading] = useState(false);
	const [reLoad, setReLoad] = useState(false);
	if (userId === undefined)
		userId = "0";
	const [Error, setError] = useState(null);
	const [Comment, setComment] = useState([]);
	const ClickScribe = () => {
		const headers = {
			"Authorization": `Bearer ${token}`,
			// "withCreadentials": true,
			"Content-Type": "application/json",
		};
		const config = {
			userId: userId,
			postId: data.id,
		}
		if (data.subList.indexOf(`/${data.id}/`) === -1) // 구독 안되있는 상태
		{
			const ApiPost = async () => {
				await axios.post("http://api.4m2d.site/api/carts", config, {headers}).then(res => {
					console.log("구독 성공");
				}).catch(err => {
					console.log("구독 실패");
				});
				setReLoad(!reLoad);
			}
			ApiPost();
		}
		else { //구독 해제
			console.log(userId, "구독 유저ID");
			console.log(data.id, "구독 상품ID");
			const ApiDelete = async () => {
				await axios.delete(`http://api.4m2d.site/api/carts/${userId}/${data.id}`,{ headers }).then(res => {
					console.log("구독 해제 성공");
				}).catch(err => {
					console.log("구독 해제 실패");
				});
				setReLoad(!reLoad);
			}
			ApiDelete();
		}
	};
	useEffect(() => {

		if (location.state === undefined) props.history.push('/');
		const ApiGet = async () => {
			setLoading(false);
			let flag = "";
			if (view !== undefined)
			{
				if (view.indexOf(`/${id}/`) === -1) // 못찾음.
				{
					const temp = view;
					cookie.remove("view");
					cookie.set("view", temp + `/${id}/`);
					flag = "1";
				}
				else
					flag = "0";
			}
			else
			{
				cookie.set("view", `/${id}/`);
				flag = "1";
			}
			const { data: data } = await axios.get(`http://api.4m2d.site/api/posts/${id}/${userId}/${flag}`).then(res => {
				return res;
			}).catch(error => {
				console.log("err? ", error);
			})
			console.log(data, "data here?");
			setData(data);
			setComment(data.commentsList);
			setLoading(true);
		};
		ApiGet();
	}, [reLoad])

	const refreshFunction = (newComment) => {
		console.log("refreshFunction");
		console.log(newComment, "newComment");
		setComment(Comment.concat(newComment));
		setReLoad(!reLoad);
	};

	const SelectPicture = (flag) => {
		setImgIdx(flag);
	};
	console.log(data, "data");
	if (!Loading)
		<div>error</div>

	// if (Error) return <div>error occured</div>
	return (
		<div>
			<M_Header />
			<PostDetailC flag={Loading}>
				{Loading &&
					<PostDetailHeaderC>
						<PostDetailMainC>
							<BackImg url={data.image[ImgIdx]} />
							<LeftRightBtnC>
								<div>

									<BsArrowLeftShort size={25} onClick={() => {
										if (ImgIdx === 0)
										ImgIdx = 1;
										SelectPicture(ImgIdx - 1);
									}} />
								</div>
								{data.image.map((data, idx) => {
									console.log("hi");
									return (<ChangeBtnC flag={idx === ImgIdx }onClick={() => {
											SelectPicture(idx);
										}}></ChangeBtnC>)
								})}
								<div>
									<BsArrowRightShort size={25} onClick={() => {
										if (ImgIdx >= data.image.length - 1) {
											ImgIdx = data.image.length - 1;
											SelectPicture(ImgIdx);
										}
										else
											SelectPicture(ImgIdx + 1)
									} }/>
								</div>
							</LeftRightBtnC>
						</PostDetailMainC>
						<PostDetailInfoC>
							<TitleC>
								<div>
									{data.title}
								</div>
								{/* <div>
									<b>
										판매자 &nbsp;
										<Link to={`/mypage/${data.userId}/selllist`}>
											{data.author}
										</Link>
									</b>
								</div> */}
							</TitleC>
							<PriceAndDateC>
								<div>{data.price.toLocaleString()}<b>원</b></div>
								<DateC><HiOutlineClock />  <span>{GetTime(data.updatedAt)}</span></DateC>
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
								<li>판매자 &nbsp; &nbsp; &nbsp; &nbsp;<Link to={`/mypage/${data.userId}/selllist`}>{data.author}</Link></li>
								<li>거래장소 &nbsp; &nbsp;<span>{data.local}</span></li>
								<li>판매상태 &nbsp; &nbsp;<span>{statusName[data.status]}</span></li>
								<li>카테고리 &nbsp; &nbsp;<span>{data.category_name}</span></li>
							</Location>
							{userId === "0" ?
							(<a href="https://api.intra.42.fr/oauth/authorize?client_id=2b02d6cbfa01cb92c9572fc7f3fbc94895fc108fc55768a7b3f47bc1fb014f01&redirect_uri=http%3A%2F%2Fapi.4m2d.site%2Flogin%2FgetToken&response_type=code"><SubscribeBtn>로그인</SubscribeBtn></a>)
							:
							(data.subList.indexOf(`/${data.id}/`) === -1 ?
								<SubscribeBtn onClick={e => {
									ClickScribe();
								}}>찜</SubscribeBtn>
								:
								<SubscribeBtn onClick={e => {
									ClickScribe();
								}}>찜 해제</SubscribeBtn>

							)}
							{/* <PostContentsC>
								<ContentC>
									{data.content}
								</ContentC>
							</PostContentsC> */}
						</PostDetailInfoC>
					</PostDetailHeaderC>}
				<PostContentsC>
					<PostContentsInfoC>상품정보</PostContentsInfoC>
					<ContentC>
						{data.content}
					</ContentC>
				</PostContentsC>
				<CommentArea>
					<Comments userId={userId}
						postId={data.id}
						token={token}
						commentsList={Comment}
						refreshFunction={refreshFunction}>
					</Comments>
				</CommentArea>
			</PostDetailC>
			<Footer />
		</div>
	);
}


// CSS style ----------------------------------------------------

const StatusBar = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 250px;
	margin-top: 125px;
	margin-bottom: 125px;
	background-color: rgba(0,0,0, 0.5);
`;

const PostContentsInfoC = styled.div`
	font-size: 18px;
	padding: 10px 0px 10px;
	border-bottom: 1px solid rgb(238, 238, 238);
`;

const PostDetailC = styled.div`
	width: 100%;
	height: 100%;
	max-width: 400px;
	margin: 0 auto;
	margin-top: 3rem;
	cursor: ${(props ) => props.flag ? "" : "wait"};
`;

const PostDetailHeaderC = styled.div`
	display: flex;
	flex-direction: column;
	/*position: absolute;*/
	padding-bottom: 30px;
`;

const ChangeBtnC = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 10px;
	margin-right: 10px;
	border: 1px solid #c0c0c0;
	cursor: pointer;
	background-color: ${(props) => props.flag ? "rgba(0,0,0,0.1)" : "white"};
`;

const LeftRightBtnC = styled.div`
	margin: 0 auto;
	bottom: 0px;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-top: 20px;
	> div:not(${ChangeBtnC}) {
		margin-right: 10px;
		cursor: pointer;
	}
`;

const PostDetailMainC = styled.div`
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const BackImg = styled.div`
	width: 19rem;
	height: 19rem;
	background-image: url("${(props) => props.url}");
	background-position: center;
	background-size: cover;
	border-radius: 15px;
	box-sizing: border-box;
`;

const PostDetailInfoC = styled.div`
	width: 90%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	> div:first-child { // 제목
		font-size: 1em;
		margin-bottom: 20px;
	}
	> div:nth-child(2) { // 가격 / 시간
		width: 100%;
		font-size: 30px;
		/*font-weight: bold;*/
		padding-bottom: 15px;
		border-bottom: 1px solid rgb(238, 238, 238);
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
	border-bottom: 1px solid rgb(238, 238, 238);
	list-style: inside;
	> li {
		display: block;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		padding: 10px 0px;
		color: rgb(153, 153, 153);
		> span {
			color: rgba(0, 0, 0, 0.8);
		}
	}
`;

const TitleC = styled.div`
	color: rgba(0, 0, 0, 0.7);
	font-weight: 700;
	margin: 1rem 0rem;
`;

const DateC = styled.div`
	display: flex;
	justify-content: space-between;
	align-content: center;
	font-size: 15px;
	color: rgba(0, 0, 0, 0.5);
	> span {
		display: inline-block;
		margin: 0px 5px;
	}
`;

const PriceAndDateC = styled.div`
	display: flex;
	margin-top: 1rem;
	justify-content: space-between;
	align-items: center;
	> div:nth-child(1) {
		color: rgba(0, 0, 0, 0.8);
		font-weight: 700;
		font-size: 1rem;
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
	width: 90%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	line-height: 24px;
`;

const ContentC = styled.div`
	margin: 30px 0px;
	padding: 0px 0px;
	white-space: pre-wrap;
`;


const SubscribeBtn = styled.button`
	position: relative;
	width: 10rem;
	height: 50px;
	top: 10px;
	border: none;
	background-color: rgb(255, 67, 46);
	color :white;
	border-radius: 10px;
`;

// 하단부

const CommentArea = styled.div`
	width: 90%;
	margin: 0 auto;

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

export default M_PostDetail;
