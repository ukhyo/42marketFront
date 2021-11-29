import React, { useState } from "react";
import axios from "axios";
import InfoList from "./M_Infolist";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { setUserId } from "../../modules/User";
import { Link, withRoute } from "react-router-dom";

const NaviBar = (props) =>
{
	const { name } = props;
	return (
		<NaviBarC>
			<ItemC current={name.url === "selllist"}>
				<ListC to={`/mypage/${name.id}/selllist`} current={name.url === "selllist"}>판매 목록</ListC>
			</ItemC>
			<ItemC current={name.url === "picklist"}>
				<ListC to={`/mypage/${name.id}/picklist`} current={name.url === "picklist"}>찜한 목록</ListC>
			</ItemC>
		</NaviBarC>
	);
};

const NaviBarC = styled.ul `
	height: 60 px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-content: center;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const		ItemC = styled.li`
	width: 100%;
	height: 50px;
	border-bottom: 4px solid
		${props => (props.current ? "rgb(99, 178, 225);" : "transparent")};
	transition: border-bottom 0.5s ease-in-out;
`;

const		ListC = styled(Link)`
	font-weight: 600;
	font-size: 16px;
	display: table-cell;
	text-align: left;
	padding: 0px 30px;
	padding-top: 20px;
	vertical-align: middle;
	text-decoration-line: none;
	color : ${props => (props.current ? "rgb(99, 178, 225);" : "rgba(0, 0, 0, 0.2)")};

`;

export default NaviBar;
