import React, { useEffect, useState } from 'react';
import Header from '../Mainpage/Header';
import styled from 'styled-components';
import Footer from '../Mainpage/Footer';
import axios from 'axios';
function PostDetail(props) {
	const { location } = props;
	const { location: { state: { data: data } } } = props;
	const [ImgIdx, setImgIdx] = useState(0);
	useEffect(() => {
// props가 비었을경우 메인으로 보내주는역할 Link를 통해서
// 데이터를 주고받기때문에 해당링크가아닌 url에 직접 입력하고
// 들어오는 방식은 막아줘야한다. Router의 장점은 못살린다고 하는거같은데 해결방법을 찾아봐야함.
		if (location.state === undefined) props.history.push('/');
		const putFunc = async () => {
// dataForm안에 모든 양식을 넣어줘서 put으로 수정해야하는건 비효율적.
// 이부분은 백엔드에서 Likes만 바꾸는걸 판단하는순간 코드가 줄어들것같음.
			const dataForm = {
				title: data.title,
				subtitle: data.subtitle,
				likes: data.likes+1,
				price: data.price,
				img: data.img,
				date: data.date,
				location: data.location,
				category: data.category,
				state: data.state
			};
			await axios.put(`http://localhost:3001/posts/` + `${data.id}`, dataForm);
		}
		putFunc();
	}, []);

	const SelectPicture = (e, flag) => {
		if (flag == 0) {
			if (ImgIdx <= 0)
				return;
			setImgIdx(ImgIdx - 1)
		}
		else {
			if (ImgIdx + 1 >= data.img.length)
				return;
			setImgIdx(ImgIdx + 1);
		}
	}

	// 이부분 간단한 로직을 구현하는게 나아보임 생성시간 받는순간 고칠예정.
	return (
		<div>
			<Header />
			<PostDetailC>
				<PostDetailHeaderC>
					<PostDetailMainC>
						<BackImg url={data.img[ImgIdx]} />
						<LeftRightBtnC>
							<div
								onClick={(e) => {
									SelectPicture(e, 0);
								}}
							>
								<img src={process.env.PUBLIC_URL + "/img/LeftArrow.png"} />
							</div>
							<div>
								{ImgIdx + 1}/{data.img.length}
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
						<TitleC>{data.title}</TitleC>
						<PriceAndDateC>
							<div>{data.price} 원</div>
							<div>{data.date}</div>
						</PriceAndDateC>
						<LocationAndViewsC>
							<div>거래장소 : {data.location}</div>
							<div>조회수 : {data.likes}</div>
						</LocationAndViewsC>
						<div>{data.subtitle}</div>
					</PostDetailInfoC>
				</PostDetailHeaderC>
			</PostDetailC>
			<Footer />
		</div>
	);
}


// CSS style ----------------------------------------------------


const PostDetailC = styled.div`
	width: 1200px;
	height: 800px;
	margin: 0 auto;
	margin-top: 30px;
`;

const PostDetailHeaderC = styled.div`
	display: flex;
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
	width: 400px;
	height: 400px;
	position: relative;
`;

const BackImg = styled.div`
	width: 100%;
	height: 400px;
	background-image: url("${(props) => props.url}");
	background-position: center;
	background-size: cover;
	border-radius: 15px;
	box-sizing: border-box;
`;

const PostDetailInfoC = styled.div`
	width: 60%;
	margin-left: 50px;
	> div:first-child {
		font-size: 30px;
		margin-bottom: 20px;
	}
	> div:nth-child(2) {
		width: 100%;
		font-size: 20px;
		font-weight: bold;
		padding-bottom: 20px;
		border-bottom: 1px solid #c0c0c0;
	}
	> div:nth-child(4) {
		font-size: 20px;
		margin-top: 16px;
		line-height: 30px;
		width: 100%;
	}
`;

const TitleC = styled.div`

`;

const PriceAndDateC = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	> div:last-child {
		font-weight: normal;
	}
`;

const LocationAndViewsC = styled.div`
	margin-top: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export default PostDetail;
