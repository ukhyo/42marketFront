import React, { useState } from "react";
import axios from "axios";
import InfoList from "./Infolist";
import styled from "styled-components";
import { Route, Link } from "react-router-dom";

function	NaviBar()
{
	return (
		<NaviBarC>
			<BuyListC to="/mypage/buylist">
				<span>구매 목록</span>
			</BuyListC>
			<SellListC to="/mypage/selllist">
				<span>판매 목록</span>
			</SellListC>
			<PickListC to="/mypage/picklist">
				<span>찜한 목록</span>
			</PickListC>
			<CommentsListC to="/mypage/commentslist">
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

	> Link {
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

const		BuyListC = styled(Link)`

`;

const		SellListC = styled(Link)`

`;

const		PickListC = styled(Link)`

`;

const		CommentsListC = styled(Link)`

`;

export default NaviBar;
