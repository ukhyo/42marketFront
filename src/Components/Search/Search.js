import React, { useEffect, useState } from "react";
import Header from "../Mainpage/Header";
import Footer from "../Mainpage/Footer";
import CategoryBar from "../Mainpage/CategoryBar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostThumbnail } from "../Mainpage/PreviewPost";
import axios from "axios";
function Searc(props) {
	const [item, setItem] = useState([]);
	const [Loading, setLoading] = useState(false);
	let word = props.match.params.word;
	useEffect(() => {
		const ApiGet = async () => {
			setLoading(false);
			const { data: data } = await axios.get(`http://api.4m2d.shop/api/posts/search/${word}`);
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
			<PostViewC>
				{item.length !== 0 && item.map((data, index) => {
					return (
						<PostThumbnail key={index} data={data} />
					);
				})
			}
			</PostViewC>
			{item.length === 0 &&
				<NotFoundC>
					검색결과가 없습니다!
				</NotFoundC>

			}
			<Footer />
		</SectionC>
	);
}


const SectionC = styled.section`
	width: 1200px;
	margin: 0 auto;
`;

const PostViewC = styled.div`
	width: 100%;
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
