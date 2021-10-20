import React, { useEffect, useState } from 'react';
import Header from '../Mainpage/Header';
import styled from 'styled-components';
import Footer from '../Mainpage/Footer';

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
						<div>{test.title}</div>
						<div>{test.price} 원</div>
						<div>
							{test.subtitle}
							{/*울려댔어 사이렌 텅 빈 길거린엔 도망치다 흘린 칼자루와 피가 흥건해 우리 그때 어릴땐 뭘 몰랐었지 Man
							그냥 힘쎈 형이 제일로 멋졌었지 그땐 그래 우린 살아나왔어 지옥 이제 어딜가든 다 비옥 수도 없이 맛본
							치욕 어릴때부터 입에 붙은 쌍욕 절대 할 수 없었지 신고 할 수 있는게 오직 기도 어떻게 느끼겠어 피곤 붉게
							물들지 않을려 내 흰옷 아무 방법이 없어 No way 돈만 준다면 해 노예 내 믿음이 바뀌기 전에 주변이 다
							바뀌길 원해 아직 죽지마 Ma bro 달려왔어 짓밟고 상처투성이된 몸 씻기엔 피가 물든 손 빈속에 피워대기엔
							뻑뻑해*/}
						</div>
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

const PostDetailMainC = styled.div`
	> img {
		width: 400px;
		height: 400px;
		border-radius: 15px;
		margin-right: 30px;
	}
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
	> div:nth-child(3) {
		font-size: 20px;
		margin-top: 16px;
		line-height: 30px;
		width: 100%;
	}
`;


export default PostDetail;
