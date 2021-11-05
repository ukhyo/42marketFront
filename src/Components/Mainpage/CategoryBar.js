import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


function CategoryBar() {
	return (
		<CategoryC>
			<CategoryItemsC>
				<LinkC to="/category/0">
					<img src={process.env.PUBLIC_URL + "/img/alignIcon.png"}></img>
					<span>전체</span>
				</LinkC>
				<LinkC to="/category/1">
					<img src={process.env.PUBLIC_URL + "/img/itIcon.png"}></img>
					<span>전자기기</span>
				</LinkC>
				<LinkC to="/category/2">
					<img src={process.env.PUBLIC_URL + "/img/mouseIcon.png"}></img>
					<span>주변기기</span>
				</LinkC>
				<LinkC to="/category/3">
					<img src={process.env.PUBLIC_URL + "/img/clothIcon.png"}></img>
					<span>의류</span>
				</LinkC>
				<LinkC to="/category/4">
					<img src={process.env.PUBLIC_URL + "/img/bookIcon.png"}></img>
					<span>책</span>
				</LinkC>
				<LinkC to="/category/share">
					<img src={process.env.PUBLIC_URL + "/img/shareIcon.png"}></img>
					<span>나눔</span>
				</LinkC>
			</CategoryItemsC>
		</CategoryC>
	);
}

// Category Style

const CategoryC = styled.div`
	width: 1200px;
	margin: 20px auto;
	padding-bottom: 20px;
	border-bottom: 1px solid #c0c0c0;
`;

const LinkC = styled(Link)`
	text-decoration: none;
	color: black;
`;

const CategoryItemsC = styled.div`
	display: flex;
	width: 800px;
	margin: 0 auto;
	justify-content: space-between;
	> ${LinkC} {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		span {
			margin: 15px 0;
			font-size: 18px;
			box-sizing: border-box;
		}
		span:hover {
			color: rgb(130, 130, 238);
			border-bottom: 1px solid rgb(130, 130, 238);
			box-sizing: border-box;
		}
	}
`;

export default CategoryBar;
