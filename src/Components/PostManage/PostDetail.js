import React, { useEffect, useState } from 'react';
import Header from '../Mainpage/Header';
import styled from 'styled-components';
import Footer from '../Mainpage/Footer';
import axios from 'axios';
import { AiOutlineEye } from "react-icons/ai";
import { BsSuitHeartFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import Coming_soon from "../../Images/coming_soon.jpeg";
function PostDetail(props) {

	const { location } = props;
	const { location: { state: { itemId: id} } } = props;
	const [ImgIdx, setImgIdx] = useState(0);
	const [data, setData] = useState([]);
	const [Loading, setLoading] = useState(false);
//	useEffect(() => {
//// props가 비었을경우 메인으로 보내주는역할 Link를 통해서
//// 데이터를 주고받기때문에 해당링크가아닌 url에 직접 입력하고
//// 들어오는 방식은 막아줘야한다. Router의 장점은 못살린다고 하는거같은데 해결방법을 찾아봐야함.
//		if (location.state === undefined) props.history.push('/');
//		const putFunc = async () => {
//// dataForm안에 모든 양식을 넣어줘서 put으로 수정해야하는건 비효율적.
//// 이부분은 백엔드에서 Likes만 바꾸는걸 판단하는순간 코드가 줄어들것같음.
//			const dataForm = {
//				title: data.title,
//				subtitle: data.subtitle,
//				likes: data.likes+1,
//				price: data.price,
//				img: data.img,
//				date: data.date,
//				location: data.location,
//				category: data.category,
//				state: data.state
//			};
//			await axios.put(`http://localhost:3001/posts/` + `${data.id}`, dataForm);
//		}
//		putFunc();
//	}, []);

	useEffect(() => {
		if (location.state === undefined) props.history.push('/');
		const ApiGet = async () => {
			const { data: data } = await axios.get(`http://api.4m2d.shop/api/posts/${id}`)
			console.log(data, "포스트");
			setData(data);
			setLoading(!Loading);
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

	// 이부분 간단한 로직을 구현하는게 나아보임 생성시간 받는순간 고칠예정.
	return (
		<div>
			<Header />
			<PostDetailC>
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
										<b>
											{data.author}
										</b>
									</b>
								</div>
							</TitleC>
							<PriceAndDateC>
								<div>{data.price.toLocaleString()}<b>원</b></div>
								<DateC>{data.updatedAt}</DateC>
							</PriceAndDateC>
							<LocationAndViewsC>
								<LocationArea>
									<AiOutlineEye size={18}/><b>12</b>
								</LocationArea>
								<LocationArea>
									<IconContext.Provider value={{ color: "rgb(234, 123, 151)" }}>
										<BsSuitHeartFill size={18} /><b>{data.subscribes}</b>
									</IconContext.Provider>
								</LocationArea>
							</LocationAndViewsC>
							<Location>
								거래장소 {data.local}
							</Location>
							<PostContentsC>{data.content}</PostContentsC>
							<SubscribeBtn>구독</SubscribeBtn>
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

const Location = styled.div` // 거래장소
	padding-bottom: 15px;
	padding-top: 15px;
	font-size: 17px;
	border-bottom: 1px solid #c0c0c0;
`;

const TitleC = styled.div`
	display: flex;
	justify-content: space-between;
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
	> div:last-child {
		font-weight: normal;
	}
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
	margin-top: 15px;
	line-height: 24px;
	font-size: 18px;
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
