import React, { useEffect, useState } from "react";
import Header from "../Mainpage/Header";
import Footer from "../Mainpage/Footer";
import CategoryBar from "../Mainpage/CategoryBar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostViewComp } from "../Mainpage/PreviewPost";
import axios from "axios";
import { Cookies } from "react-cookie";
function Searc(props) {
	const cookie = new Cookies();
	let { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();
	const [item, setItem] = useState([]);
	const [Loading, setLoading] = useState(false);
	let word = props.match.params.word;
	if (userId === undefined)
		userId = "0";
	useEffect(() => {
		const ApiGet = async () => {
			setLoading(false);
			const { data: data } = await axios.get(`http://api.4m2d.site/api/posts/search/${userId}/${word}`);
			setItem(data);
			setLoading(true);
		}
		ApiGet();
	}, [word])
	if (!Loading)
		return <div>Loading!</div>;
	return (
		<SectionC>
			<Header />
			<CategoryBar />
			<NameAndSortC>
				<CateNameC>검색결과</CateNameC>
			</NameAndSortC>
			<PostViewC>
				{item.postsThumbnailResponseDtoList.length !== 0 &&
					<PostViewComp item={item.postsThumbnailResponseDtoList} subList={item.subList} Loading={Loading} flag={true} />
			}
			</PostViewC>
			{item.postsThumbnailResponseDtoList.length === 0 &&
				<NotFoundC>
					검색결과가 없습니다!
				</NotFoundC>

			}
			<Footer />
		</SectionC>
	);
}
const CateNameC = styled.div`
	/*margin-top: 30px;*/
	margin-bottom: 20px;
	font-size: 24px;
	line-height: 10px;
	font-weight: 600;
`;

const NameAndSortC = styled.div`
	width: 1200px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	position:relative;
	margin-top: 65px;
`;

const SectionC = styled.section`
	width: 100%;
	margin: 0 auto;
`;

const PostViewC = styled.div`
	width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	> div:not(:nth-child(5n))
	{
		margin-right: 2%;
	}
`;

const NotFoundC = styled.div`
	width: 1200px;
	margin: 0 auto;
	font-size: 40px;
	text-align: center;
	margin-top: 100px;
	margin-bottom: 200px;
`;

export default Searc;
