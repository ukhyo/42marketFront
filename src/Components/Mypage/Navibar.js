import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

function	NaviBar()
{
	return (
		<NaviBarC>
			<BuyListC>
				<span>구매 목록</span>
			</BuyListC>
			<SellListC>
				<span>판매 목록</span>
			</SellListC>
			<PickListC>
				<span>찜한 목록</span>
			</PickListC>
			<CommentsListC>
				<span>댓글 목록</span>
			</CommentsListC>
		</NaviBarC>
	);
}

const NaviBarC = styled.div`
	height: 70px;
	display: flex;
	justify-content: center;
	align-content: center;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);

	> div {
		width: 130px;
		height: 70px;
		> span {

			font-weight: 600;
			font-size: 16px;
			display: table-cell;
			text-align: left;
			padding: 0px 30px;
			padding-top: 45px;
			color: rgb(50, 232, 230);
			vertical-align: middle;
		}
	}
`;

const		BuyListC = styled.div`

`;

const		SellListC = styled.div`

`;

const		PickListC = styled.div`

`;

const		CommentsListC = styled.div`

`;

export default NaviBar;
