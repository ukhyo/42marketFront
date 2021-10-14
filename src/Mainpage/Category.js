import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Category() {
	return (
		<CategoryC>
			<CategoryItemsC>
				<div>
					<i className="fas fa-list fa-2x"></i>
					<span>More</span>
				</div>
				<div>
					<i className="fas fa-desktop fa-2x"></i>
					<span>전자기기</span>
				</div>
				<div>
					<i className="fas fa-mouse fa-2x"></i>
					<span>주변기기</span>
				</div>
				<div>
					<i className="fas fa-tshirt fa-2x"></i>
					<span>의류</span>
				</div>
				<div>
					<i className="fas fa-book fa-2x"></i>
					<span>책</span>
				</div>
				<div>
					<i className="fas fa-people-arrows fa-2x"></i>
					<span>공동구매</span>
				</div>
			</CategoryItemsC>
		</CategoryC>
	);
}

// Category Style

const CategoryC = styled.div`
	width: 1000px;
	margin: 20px auto;
`;

const CategoryItemsC = styled.div`
	display: flex;
	justify-content: space-between;
	> div {
		/*width: 80px;*/
		display: flex;
		align-items: center;
		flex-direction: column;
		span {
			font-size: 12px;
			line-height: 20px;
		}
	}
`;

export default Category;
