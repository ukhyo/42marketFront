import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

function CategoryBar({history}) {
	return (
		<CategoryC>
			<CategoryItemsC onClick={(e) => {
			}}>
				<LinkC to="/category/0">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/allIcon.png"}></img>
						<span>전체보기</span>
					</div>
				</LinkC>
				<LinkC to="/category/1">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/itIcon.png"}></img>
						<span>전자</span>
					</div>
				</LinkC>
				<LinkC to="/category/2">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/lifeIcon.png"}></img>
						<span>생활</span>
					</div>
				</LinkC>
				<LinkC to="/category/3">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/why.png"}></img>
						<span>레저</span>
					</div>
				</LinkC>
				<LinkC to="/category/4">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/clothIcon.png"}></img>
						<span>패션</span>
					</div>
				</LinkC>
				<LinkC to="/category/5">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/musicIcon.png"}></img>
						<span>음악/악기</span>
					</div>
				</LinkC>
				<LinkC to="/category/6">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/beautyIcon.png"}></img>
						<span>뷰티</span>
					</div>
				</LinkC>
				<LinkC to="/category/7">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/bookIcon.png"}></img>
						<span>도서</span>
					</div>
				</LinkC>
				<LinkC to="/category/8">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/handShake.png"}></img>
						<span>나눔</span>
					</div>
				</LinkC>
				<LinkC to="/category/9">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/etcIcon.png"}></img>
						<span>기타</span>
					</div>
				</LinkC>

			</CategoryItemsC>
		</CategoryC>
	);
}

// Category Style

const CategoryC = styled.div`
	width: 1200px;

	margin: auto;
	margin-top: 60px;
	/*padding-bottom: 20px;*/
`;

const LinkC = styled(Link)`
	width: 150px;
	text-decoration: none;
	color: rgba(0, 0, 0, 0.8);
`;

const CategoryItemsC = styled.div`

	display: flex;
	width: 1200px;
	height: 50px;
	margin: 0 auto;
	justify-content: space-between;
	> ${LinkC} > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		&:hover {
			color: rgb(130, 130, 238);
		}
		img {
			width: 25px;
			height: 25px;
			color: rgba(0, 0, 0, 0.7);
		}
		img:hover {
			width: 30px;
			height: 30px;
			transition-duration: 0.2s;
			color: rgb(187, 220, 238);
		}
		span {
			margin: 15px 0;
			font-size: 14px;
			box-sizing: border-box;
		}
	}
`;

export default CategoryBar;
