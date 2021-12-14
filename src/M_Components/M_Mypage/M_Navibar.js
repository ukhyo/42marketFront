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
			<ItemC current={name.url === "profile"}>
				<ListC to={`/mypage/${name.id}/profile`} current={name.url === "profile"}>프로필</ListC>
			</ItemC>
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
	width: 100%;
	height: 60 px;
	display: flex;
	text-align: center;
	justify-content: center;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const		ItemC = styled.li`
	width: 100%;
	height: 50px;
	padding: 1rem;
	border-bottom: 4px solid
		${props => (props.current ? "rgb(99, 178, 225);" : "transparent")};
	transition: border-bottom 0.5s ease-in-out;
`;

const		ListC = styled(Link)`
	font-weight: 600;
	font-size: 1em;
	text-align: center;
	text-decoration-line: none;
	color : ${props => (props.current ? "rgb(99, 178, 225);" : "rgba(0, 0, 0, 0.2)")};

`;

export default NaviBar;
