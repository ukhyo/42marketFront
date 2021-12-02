import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
//import InfoList from "../Mypage/Infolist";
import { Cookies } from "react-cookie";
import theme from "../../Styles/theme";
import InfoList from "../M_Mypage/M_Infolist";
function ShowData() {
	const cookie = new Cookies()
	let { userId: userId } = cookie.getAll();
	if (userId === undefined)
		userId = 1;
	return (
		<ShowDataC theme={theme}>
			<InfoList url={"manage"} id={userId} />
		</ShowDataC>
	);
}

function ProductManage() {
	return (
		<SectionC theme={theme}>
			<MainC theme={theme}>
			<RegiHeaderC theme={theme}>
				<span>상품관리</span>
			</RegiHeaderC>
			<ShowData />
			</MainC>
		</SectionC>
	);
}

const MainC = styled.div`
	width: ${({ theme }) => theme.widthSize.margin};
	margin: 0 auto;

`;

const RegiHeaderC = styled.div`
	width: ${({theme}) => theme.widthSize.full};
	margin: 0 auto;
	height: 30px;
	> span:first-child {
		font-size: 1.5rem;
	}
	border-bottom: 1px solid black;
`;

const ShowDataC = styled.div`
	width: ${({theme}) => theme.widthSize.full};
	margin: 0 auto;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	padding-bottom: 10px;
	/*border-bottom: 1px solid #c0c0c0;*/
`;

const SectionC = styled.div`
	width: ${({theme}) => theme.widthSize.full};
	max-width: ${({theme}) => theme.widthSize.max};
	margin: 0 auto;
`;

export default ProductManage;
