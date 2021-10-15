import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


function Category() {
	return (
		<CategoryC>
			<CategoryItemsC>
				<div>
					<img src={process.env.PUBLIC_URL + "/img/alignIcon.png"}></img>
					<span>더보기</span>
				</div>
				<div>
					<img src={process.env.PUBLIC_URL + "/img/itIcon.png"}></img>
					<span>전자기기</span>
				</div>
				<div>
					<img src={process.env.PUBLIC_URL + "/img/mouseIcon.png"}></img>
					<span>주변기기</span>
				</div>
				<div>
					<img src={process.env.PUBLIC_URL + "/img/clothIcon.png"}></img>
					<span>의류</span>
				</div>
				<div>
					<img src={process.env.PUBLIC_URL + "/img/bookIcon.png"}></img>
					<span>책</span>
				</div>
				<div>
					<img src={process.env.PUBLIC_URL + "/img/personIcon.png"}></img>
					<span>공동구매</span>
				</div>
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

const CategoryItemsC = styled.div`
	display: flex;
	width: 800px;
	margin: 0 auto;
	justify-content: space-between;
	> div {
		display: flex;
		flex-direction: column;
		justify-content:center;
		align-items: center;
		span {
			margin: 15px 0;
			font-size: 18px;
		}
	}
`;

export default Category;
