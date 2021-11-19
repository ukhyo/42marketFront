import React, { useState } from "react";
import axios from "axios";
import InfoList from "./Infolist";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { setUserId } from "../../modules/User";
import { Link, withRoute } from "react-router-dom";

const NaviBar = (props) =>
{
	const { name } = props;
	console.log ("nav", name.tabs);
	return (
		<NaviBarC>
			<ItemC current={name.tabs2 === "selllist"}>
				<ListC to={`/mypage/${name.tabs}/selllist`} current={name.tabs2 === "selllist"}>판매 목록</ListC>
			</ItemC>
			<ItemC current={name.tabs2 === "picklist"}>
				<ListC to={`/mypage/${name.tabs}/picklist`} current={name.tabs2 === "picklist"}>찜한 목록</ListC>
			</ItemC>
		</NaviBarC>
	);
};

const NaviBarC = styled.ul `
	width: 100%;
	height: 70px;
	display: flex;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const		ItemC = styled.li`
	width: 130px;
	height: 70px;
	position: relative;
	right: -623px;
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
	padding-top: 45px;
	vertical-align: middle;
	text-decoration-line: none;
	color : ${props => (props.current ? "rgb(99, 178, 225);" : "rgba(0, 0, 0, 0.2)")};
	
`;

export default NaviBar;
