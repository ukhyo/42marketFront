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
						<span>전자기기</span>
					</div>
				</LinkC>
				<LinkC to="/category/2">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/SubItIcon.png"}></img>
						<span>주변기기</span>
					</div>
				</LinkC>
				<LinkC to="/category/3">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/clothIcon.png"}></img>
						<span>의류</span>
					</div>
				</LinkC>
				<LinkC to="/category/4">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/bookIcon.png"}></img>
						<span>책</span>
					</div>
				</LinkC>
				<LinkC to="/category/5">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/handShake.png"}></img>
						<span>나눔</span>
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
	width: 80px;
	text-decoration: none;
	color: rgba(0, 0, 0, 0.8);
`;

const CategoryItemsC = styled.div`

	display: flex;
	width: 600px;
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
