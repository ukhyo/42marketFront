import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import axios from "axios";
import { Iot } from 'aws-sdk';
import { Cookies } from "react-cookie";
const DropdownMenu = (props) => {
	const cookie = new Cookies()
	let { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();
	const dropdownRef = useRef(null);
	const [status, setStatus] = useState(props.status);
	const statusArr = ["판매중", "판매완료", "삭제중"];
	const [isActive, setIsActive] = useState(false);
	const onClick = () => setIsActive(!isActive);
	const statusChange = (e, idx) => {
		console.log("here?");
		const PostPatch = async () => {
			console.log(idx, "삭제가되니?");
			const headers = {
				"Authorization": `Bearer ${token}`,
			};
			const config = {
				status: idx,
			};
			setStatus(idx);
			await axios.patch(`http://api.4m2d.shop/api/posts/${props.id}`, config, {headers}).then(res => {
				alert("상태변경에 성공했습니다.");
				if (idx === 2)
				window.location.reload();
			}).catch(err => {
				console.log(err, "실패");
			});
		}
		if (idx === 2)
		{
			if (window.confirm("해당 상품을 삭제하시겠습니까?") === true)
				PostPatch();
			else
				return;
		}
		PostPatch();
	}

	return (
	  <MenuContainerC>
		<MenuTriggerC onClick={onClick} >
		  <span>{statusArr[status]}</span>
		</MenuTriggerC>
		<MenuC ref={dropdownRef} active={isActive}>
		  <ul>
			<li onClick={(e) => {
						setIsActive(!isActive);
						statusChange(e, 0);
			}}><span>판매중</span></li>
			<li onClick={(e) => {
				statusChange(e, 1);
				setIsActive(!isActive);
				}}><span>판매완료</span></li>
			<li onClick={(e) => {
				setIsActive(!isActive);
					}}>
					<LinkC to={{
						pathname: `/product/edit`,
						state: {
							id: props.id,
						},
					}}>
					수정
					</LinkC>
			</li>
			<li onClick={(e) => {
				statusChange(e, 2);
				setIsActive(!isActive);
				}}><span>삭제</span></li>
		  </ul>
		</MenuC>
	  </MenuContainerC>
	);
};

const MenuContainerC = styled.div`
	position: relative;
	cursor: pointer;
`;

const LinkC = styled(Link)`
	text-decoration: none;
	color: rgba(0, 0, 0, 0.7);
	padding: 10px 15px;
	display: block;
`;

const MenuC = styled.nav`
	z-index: 5;
	background: #ffffff;
	border-radius: 8px;
	position: absolute;
	top: 30px;
	right: 0;
	width: 100px;
	box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
	opacity: ${props => (props.active ? '1' : '0')};
	visibility: ${props => (props.active ? 'visible' : 'hidden')};
	transform: ${props => (props.active ? 'translateY(0)' : 'translateY(-20px)')};
	transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
	> ul {
		list-style: none;
		padding: 0;
		margin: 0;
		> li {
			border-bottom: 1px solid #dddddd;
			> span {
				text-decoration: none;
				color: rgba(0, 0, 0, 0.7);
				padding: 10px 15px;
				display: block;
			}
		}
	}
`;

const MenuTriggerC = styled.button`
	background: #ffffff;
	border-radius: 90px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 4px 6px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	border: none;
	vertical-align: middle;
	transition: box-shadow 0.4s ease;
	> span {
		font-weight: 700;
		vertical-align: middle;
		font-size: 14px;
		color: rgba(0, 0, 0, 0.7);
		margin: 0 10px;
	}
`;



export default DropdownMenu;
