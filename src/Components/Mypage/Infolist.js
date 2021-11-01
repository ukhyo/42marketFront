import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";
import useAsync from "./useAsync";
import styled from "styled-components";

async function getList(list)
{
	const response = await axios.get(
		`http://localhost:3001/${list}`
	);
	return response.data;
}

function InfoList(props, {match})
{
	console.log(props);
	let { location: { state: test } } = props;
	const [data, setData] = useState([]);
	useEffect(() => {
		const getData = async () => {
			let test = await axios.get(`http://localhost:3001/${match}`);
			console.log(test);
		}
		getData();
	}, [])
	//const { tags } = match.params;
	//const [state] = useAsync(() => getList(tags), [tags]);
	//const { loading, data: list, error } = state;
	//console.log(list, "리스트안에는?");
	//if (loading) return <div>Loading...</div>;
	//if (error) return <div>Error occured</div>;
	//if (!list) return null;
	return (
		<InfoListC>
			{/*{list.map((posts,index) => {
				return (
					<PostListC key={index}>
						<PostImgC>
							<img src={posts.img} />
						</PostImgC>
						<PostInfosC>
							<PostInfos__TitleC>
								<h2>{posts.title}</h2>
							</PostInfos__TitleC>
							<PostInfos__PriceC>
								<span>{posts.price}</span>
							</PostInfos__PriceC>
							<PostInfos__IntroC>
								<span>{posts.subtitle}</span>
							</PostInfos__IntroC>
						</PostInfosC>
						<PostLogsC>
						</PostLogsC>
					</PostListC>
				);
			})}*/}
		</InfoListC>
	);
}

const PostListC = styled.div`
	width: 880px;
	height: 160px;
	margin: 0px 20px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const PostImgC = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		border: 1px solid rgba(0,0,0,1);
		width: 140px;
		height: 140px;
	}
`;

const PostInfosC = styled.div`
	width: 60%;
	height: 90%;
	align-items: center;
`;

const PostLogsC = styled.div`

`;

const PostInfos__TitleC = styled.div`
	h2 {
		font-weight: 600;
		font-size: 20px;
	}
`;

const PostInfos__IntroC = styled.div`

`;

const PostInfos__PriceC = styled.div`

`;

const InfoListC = styled.div`
	width: 910px;
	height: auto;
`;

export default InfoList;
