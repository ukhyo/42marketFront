import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
function M_CategoryBar(props) {
	const [isActive, setIsActive] = useState(false);
	return (
		<CategoryC>
			<NameAndSortC>
				<CateNameC onClick={() => {
						setIsActive(!isActive);
				}} >
					<div>카테고리</div>
				</CateNameC>
				<MenuC active={isActive}>
					  <ul>
						<li onClick={(e) => {
							setIsActive(!isActive);
						}}><Link to={"/category/0"}>
							<div>전체</div>
							</Link>
						</li>
						<li onClick={(e) => {
							setIsActive(!isActive);
						}}><Link to={"/category/1"}>
							<div>전자</div>
							</Link>
						</li><li onClick={(e) => {
							setIsActive(!isActive);
						}}><Link to={"/category/2"}>
							<div>생활</div>
							</Link>
						</li><li onClick={(e) => {
							setIsActive(!isActive);
						}}><Link to={"/category/3"}>
							<div>레저</div>
							</Link>
						</li><li onClick={(e) => {
							setIsActive(!isActive);
						}}><Link to={"/category/4"}>
							<div>패션</div>
							</Link>
						</li><li onClick={(e) => {
							setIsActive(!isActive);
						}}><Link to={"/category/5"}>
							<div>음악/악기</div>
							</Link>
						</li><li onClick={(e) => {
							setIsActive(!isActive);
						}}><Link to={"/category/6"}>
							<div>뷰티</div>
							</Link>
						</li><li onClick={(e) => {
							setIsActive(!isActive);
						}}><Link to={"/category/7"}>
							<div>도서</div>
							</Link>
						</li>
						<li onClick={(e) => {
							setIsActive(!isActive);
						}}><Link to={"/category/8"}>
							<div>나눔</div>
							</Link>
						</li>
						<li onClick={(e) => {
							setIsActive(!isActive);
						}}><Link to={"/category/9"}>
							<div>기타</div>
							</Link>
						</li>
					  </ul>
				</MenuC>
			</NameAndSortC>
		</CategoryC>
	);
}

// Category Style

const CategoryC = styled.div`
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	margin-top: 30px;
`;

const NameAndSortC = styled.div`
	width: 80%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	position:relative;
	margin-bottom: 20px;
	margin-top: 20px;
`;


const CateNameC = styled.button`
	width: 100px;
	max-width: 400px;
	height: 30px;
	border-radius: 30px;
	cursor: pointer;
	background: #ffffff;
	cursor: pointer;
	display: flex;
	/*align-items: center;*/
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	border: none;
	transition: box-shadow 0.4s ease;
	text-align: center;
	> div {
		width: 80px;
		height: 30px;
		border-radius: 90px;
		line-height:35px;
		font-weight: 700;
		vertical-align: middle;
		font-size: 1rem;
		color: rgba(0, 0, 0, 0.7);
		margin: 0 10px;
		text-align: center;
	}
`;

const MenuC = styled.nav`
	z-index: 5;
	background: #ffffff;
	border-radius: 8px;
	position: absolute;
	top: 35px;
	width: 110px;
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
			margin-top: 10px;
			height: 20px;
			padding-left: 8px;
			> div {
				text-decoration: none;
				color: rgba(0, 0, 0, 0.7);
				padding: 10px 15px;
				display: block;
			}
		}
	}
`;


export default M_CategoryBar;


{/*<LinkC to="/category/0">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/allIcon.png"}></img>
						<span>전체보기</span>
					</div>
				</LinkC>
				<LinkC to="/category/1">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/itIcon.png"}></img>
						<span>전자</span>
					</div>
				</LinkC>
				<LinkC to="/category/2">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/lifeIcon.png"}></img>
						<span>생활</span>
					</div>
				</LinkC>
				<LinkC to="/category/3">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/why.png"}></img>
						<span>레저</span>
					</div>
				</LinkC>
				<LinkC to="/category/4">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/clothIcon.png"}></img>
						<span>패션</span>
					</div>
				</LinkC>
				<LinkC to="/category/5">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/musicIcon.png"}></img>
						<span>음악/악기</span>
					</div>
				</LinkC>
				<LinkC to="/category/6">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/beautyIcon.png"}></img>
						<span>뷰티</span>
					</div>
				</LinkC>
				<LinkC to="/category/7">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/bookIcon.png"}></img>
						<span>도서</span>
					</div>
				</LinkC>
				<LinkC to="/category/8">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/handShake.png"}></img>
						<span>나눔</span>
					</div>
				</LinkC>
				<LinkC to="/category/9">
					<div>
						<img src={process.env.PUBLIC_URL + "/img/etcIcon.png"}></img>
						<span>기타</span>
					</div>
				</LinkC>*/}
