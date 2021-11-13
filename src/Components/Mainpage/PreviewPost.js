import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import { BsSuitHeartFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { Cookies } from "react-cookie";
function PostViewComp({ idx }) {
	const cookie = new Cookies();
	console.log(cookie.getAll());
	const { userId: id, Authorization: token, subscribes: sub } = cookie.getAll();
	console.log(token, "토큰임");

	let [item, setItem] = useState([]);
	useEffect(() => {
		const ApiGet = async () => {
			// Aws EC2

			//const { data } = await axios.get("http://52.79.76.165/login").then((response) => {
			//	console.log(response, "test");
			//	return response;
			//});
	//		const headers = {
    //    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1a3dvbiIsInVzZXJBc…YMZQhHgRQNFNmhp7470sko62kwFK1UFn4-52LGb0tb4myk6yQ`,
    //  };

			let { data } = await axios.get("http://api.4m2d.shop/api/posts").then((response) => {
				console.log(response, "test");
				return response;
			});

			console.log(data, "뭐야");
			//let tempArr = [];
			//let i = 0;
			//if (data.length < idx + 5) {
			//	alert("error");
			//	return;
			//}
			//else {
			//	console.log(data.length);
			//}
			//const limit = idx + 5;
			//for (idx; idx < limit; idx++) {
			//	tempArr[i] = data[idx];
			//	i++;
			//}
			//setItem(tempArr);
		};
		ApiGet();
	}, []);

	return (
			<PostViewLineC>
			{/*{item.map((data, index) => {
				let title;
				data.title.length > 12 ? title = data.title.slice(0, 12) + "..."
					: title = data.title;
							return (
								<PostItemC key={index}>
									<LinkC
										to={{
											pathname: `/postview/${data.id}`,
											state: {
												data: data,
												itemId: data.id,
											},
										}}
									>
										<HoverImgC url={data.img[0]}>안녕</HoverImgC>
										<BackImgC url={data.img[0]}></BackImgC>
									</LinkC>
									<div>{title}</div>
									<div>
										<div>
											{data.price}
											<b>원</b>
										</div>
										<div>
											<p>{data.likes}</p>
											<IconContext.Provider value={{ color: "rgb(255, 67, 46)" }}>
												<BsSuitHeartFill size={18} />
											</IconContext.Provider>
										</div>
									</div>
								</PostItemC>
							);
					  })}*/}
			</PostViewLineC>
	);
}

function PreviewPost() {
	return (
		<PostViewC>
			{console.log()}
			<h3>인기게시글</h3>
			<PostViewLineC><PostViewComp idx={5} /></PostViewLineC>
			<PostViewLineC><PostViewComp idx={0} /></PostViewLineC>
			<h3>추천게시글</h3>
			<PostViewLineC><PostViewComp idx={10} /></PostViewLineC>
			<PostViewLineC><PostViewComp idx={15} /></PostViewLineC>
		</PostViewC>
	);
}


const PostViewC = styled.div`
	width: 1200px;
	margin: 0px auto;
	> h3 {
		font-size: 20px;
		margin-top: 40px;
		margin-bottom: 10px;
	}
	> div:last-child {
		margin-bottom: 50px;
	}
`;

const PostViewLineC = styled.div`
	width: 100%;
	height: 270px;

	margin: 10px auto;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
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
	background-color: #ffffff;
	> div {
		width: 100%;
		margin-top: 10px;
		font-size: 14px;
		padding-left: 10px;
		font-weight: 600;
	}
	> div:nth-child(2) {
		/*color: red;*/
		color: rgba(0, 0, 0, 0.7);
	}
	> div:last-child {
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
	}
	b {
		font-size: 0.8em;
	}
`;

export default PreviewPost;
