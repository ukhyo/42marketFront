import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import { BsSuitHeartFill } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { Cookies, useCookies } from "react-cookie";
import GetTime from "../utils/GetTime";

function PostThumbnail({ data, key, subList}) {
	let title;
	data.title.length > 12 ? title = data.title.slice(0, 12) + "..."
		: title = data.title;
	return (
		<PostItemC key={key}>
			<LinkC
				to={{
					pathname: `/postview/${data.id}`,
					state: {
						data: data,
						itemId: data.id,
						subList: subList,
					},
				}}
			>
			<BackImgC url={data.image}></BackImgC>
			</LinkC>
			<div>
				{title}
				<b>{GetTime(data.createdAt)}</b>
			</div>
			<div>
				<div>
					{data.price.toLocaleString()}
					<b>원</b>
				</div>
				<div>
					<p>{data.subscribes}</p>
					{subList.indexOf(`/${data.id}/`) === -1 ?
						<IconContext.Provider value={{ color: "rgb(255, 67, 46)" }}>
							<BsSuitHeart size={18} />
						</IconContext.Provider> :
						<IconContext.Provider value={{ color: "rgb(255, 67, 46)" }}>
							<BsSuitHeartFill size={18} />
						</IconContext.Provider>
					}
				</div>
			</div>
		</PostItemC>
	);
}

function PostViewComp({item, subList, Loading}) {
	return (
		<SectionC>
			<PostViewLineC>
				{
					Loading && item.length > 0 && item.map((data, index) => {
					return (
						<PostThumbnail key={index} data={data} subList={ subList }/>
						);
					})
				}
			</PostViewLineC>
		</SectionC>
	);
}

function PreviewPost() {
	const cookie = new Cookies();
	let { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();

	const [item, setItem] = useState([]);
	const [Loading, setLoading] = useState(false);
	useEffect(() => {
		const ApiGet = async () => {
			setLoading(false);
			if (userId === undefined)
				userId = "0";
			let data = await axios.get(`http://api.4m2d.shop/api/${userId}`).then((response) => {
				console.log("성공?");
				return response.data;
			}).catch((res) => {
				console.log(res, "에러");
			});
			setItem(data);
			setLoading(true);
		};
		ApiGet();
	}, []);
	if (!Loading)
		return <div> Loading...</div>
	return (
		<PostViewC>
			<h2>인기상품!</h2>
			<PostViewComp item={item.subscribeList} subList={item.subList} Loading={ Loading}/>
			<h2>새 상품!</h2>
			<PostViewComp item={item.viewList} subList={item.subList} Loading={ Loading}/>
		</PostViewC>
	);
}

const TitleAndTTimeC = styled.section`
	display:flex;
	justify-content: space-between;
`;

const SectionC = styled.section`
	width: 1200px;
	/*height: 300px;*/
`;

const PostViewC = styled.div`
	width: 1200px;
	margin: 0px auto;
	> h2 {
		font: italic 1em "Fira Sans", serif;
		font-size: 28px;
		font-weight: 600;
		margin-top: 40px;
		margin-bottom: 10px;
	}
	> div:last-child {
		margin-bottom: 50px;
	}
	> div:nth-child(2) {
		height: 100px;
			> h2 {
			/*font-size: 24px;*/
			margin-top: 40px;
			margin-bottom: 10px;
		}
	}
`;



const PostViewLineC = styled.div`
	width: 100%;
	height: 600px;
	margin: 10px auto;
	margin-bottom: 20px;
	display: flex;
	box-sizing: border-box;
	/*justify-content: space-between;*/
	align-items: center;
	flex-wrap: wrap;
	> div:not(:nth-child(5n))
	{
		margin-right: 2.25%;
	}
`;


const BackImgC = styled.div`
	position: static;
	top:0;
	left:0;
	width: 100%;
	height: 200px;
	background-position: center;
	background-size: cover;
	border-radius: 15px;
	box-sizing: border-box;
	background-image: url("${(props) => props.url}");
	&:hover {
		z-index: 0;
		opacity: 0.8;
	}
	`;

const HoverImgC = styled.div`
	position: static;
	top: 0;
	left: 0;
	display: none;
	background-color: #000000;
	width: 100%;
	height: 200px;
	z-index: 5;
	&:hover {
		display:block;
	}
`;

const LinkC = styled(Link)`
	/*position: relative;*/
`;

const PostItemC = styled.div`
	position: relative;
	width: 18%;
	height: 270px;
	border-radius: 15px;
	margin-bottom: 20px;
	border: 1px solid #f0f0f0;
	background-color: #ffffff; // image도 들어감.
	> div { // 이미지
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-top: 13px;
		font-size: 14px;
		padding-left: 10px;
		font-weight: 600;
		> b {
			margin-right: 20px;
			text-align:right;
		}
	}
	> div:nth-child(2) { // 제목
		/*color: red;*/
		color: rgba(0, 0, 0, 0.7);
	}
	> div:last-child { // 나머지
		margin-top: 10px;
		margin-bottom: 5px;
		color: rgba(0, 0, 0, 0.9);
		display: flex;
		justify-content: space-between;
		align-items: center;
		> div:last-child {
			padding-right: 20px;
			display: flex;
			> p {
				margin-right: 5px;
			}
		}
		> div {

		}
	}
	b {
		font-size: 0.8em;
	}
`;

export {PostThumbnail}
export default PreviewPost;
//{/*<HoverImgC url={data.subThumbnailList[0]}>안녕</HoverImgC>*/}
