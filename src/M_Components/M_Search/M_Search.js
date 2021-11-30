import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { M_PostThumbnail } from "../M_Mainpage/M_PreviewPost";
import { Cookies } from "react-cookie";
import { M_PostViewComp } from "../M_Mainpage/M_PreviewPost";

import M_CategoryBar from "../M_Mainpage/M_CategoryBar";
import theme from "../../Styles/theme";
import M_Header from "../M_Mainpage/M_Header";
function M_Search(props) {
	const cookie = new Cookies()
	let { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();
	const [item, setItem] = useState([]);
	const [Loading, setLoading] = useState(false);

	let word = props.match.params.word;
	if (userId === undefined)
		userId = "0";
	let { undefined: cate } = props.match.params;
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
		return <div>Loading..</div>
	return (
		<SectionC theme={theme}>
			<M_Header />
			<M_CategoryBar />
			<CateNameC>
				검색결과
			</CateNameC>
			<PostViewC theme={theme}>
				{item.postsThumbnailResponseDtoList.length !== 0 &&
					<M_PostViewComp item={item.postsThumbnailResponseDtoList} subList={item.subList} Loading={Loading} flag={true} />
				}

			</PostViewC>
			{item.postsThumbnailResponseDtoList.length === 0 &&
				<div>검색결과가 없습니다!</div>
			}
		</SectionC>
	);
}

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

const CateNameC = styled.div`
	width: 90%;
	margin: 0 auto;
	margin-top: 40px;
	font-size: 1.2rem;
	height: 30px;
	line-height: 36px;
	font-weight: 600;
`;

const SectionC = styled.section`
	width: ${({ theme }) => theme.widthSize.full};
	max-width: 400px;
	margin: 0 auto;
	> div:last-child {
		width: ${({ theme }) => theme.widthSize.margin};
		font-size: 2rem;
		height: 100px;
		margin: 0 auto;
		text-align: center;
	}
`;

export default M_Search;
