import React, { useEffect, useState } from 'react';
import Header from '../Mainpage/Header';
import styled from 'styled-components';
function PostDetail(state) {
	const [propsData, setData] = useState(state);
	console.log(propsData, 'propData', typeof propsData);
	const { location, history } = state;
	useEffect(() => {
		if (location.state === undefined) propsData.history.push('/');
	});
	const {
		location: { state: data },
	} = state;
	const test = data.item.find((src) => {
		if (src.id == data.itemId) return src;
	});
	return (
		<div>
			<Header />
			<PostDetailC>
				<PostDetailHeaderC>
					<PostDetailMainC>
						<img src={test.img} />
					</PostDetailMainC>
					<PostDetailInfoC>
						<div className="info_title">제목: {test.title}</div>
						<PostDetailPriceC>가격: {test.price} 원</PostDetailPriceC>
					</PostDetailInfoC>
				</PostDetailHeaderC>
				<PostDetailMainInfoC>
					<PostInfomationC>
						<PostInfoTextTitleC>상품정보</PostInfoTextTitleC>
						<PostInfoTextContentsC>{test.subtitle}</PostInfoTextContentsC>
					</PostInfomationC>
					<PostSellerInfoC>
						<PostSellerTextTitleC>상점정보</PostSellerTextTitleC>
					</PostSellerInfoC>
				</PostDetailMainInfoC>
			</PostDetailC>
		</div>
	);
}

const PostDetailC = styled.div`
	width: 1000px;
	height: 800px;
	margin: 0 auto;
	margin-top: 30px;
`;

const PostDetailHeaderC = styled.div`
	display: flex;
	margin-bottom: 50px;
`;

const PostDetailMainC = styled.div`
	> img {
		width: 400px;
		height: 300px;
		margin-right: 30px;
	}
`;

const PostDetailInfoC = styled.div`
	width: 60%;
	> div:first-child {
		margin-bottom: 20px;
	}
	> div:nth-child(2) {
		width: 100%;
		padding-bottom: 10px;
		border-bottom: 1px solid rgb(0, 0, 0, 0.1);
	}
`;

const PostDetailMainInfoC = styled.div`
	padding-top: 50px;
	border-top: 1px solid rgb(0, 0, 0, 0.1);
	display: flex;
	border-right: 1px solid rgb(0, 0, 0, 0.1);
	justify-content: space-between;
`;

const PostInfomationC = styled.div`
	display: flex;
	width: 70%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const PostInfoTextTitleC = styled.div`
	width: 100%;
	font-weight: bold;
	font-size: 28px;
	box-sizing: border-box;
	border-right: 1px solid gray;
	border-bottom: 1px solid gray;
`;

const PostDetailPriceC = styled.div``;

const PostInfoTextContentsC = styled.div`
	width: 100%;
	height: 300px;
	box-sizing: border-box;
	padding-right: 30px;
	border-right: 1px solid gray;
	border-bottom: 1px solid gray;
`;

const PostSellerInfoC = styled.div`
	width: 28%;
`;

const PostSellerTextTitleC = styled.div`
	width: 100%;
	font-weight: bold;
	border-bottom: 1px solid gray;
	font-size: 28px;
`;

export default PostDetail;
