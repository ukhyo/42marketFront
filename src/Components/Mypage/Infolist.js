import axios from "axios";
import useAsync from "./useAsync";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineEye } from "react-icons/ai";
import {DropdownButton, DropDown} from "react-bootstrap";
import styled from "styled-components";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";

async function getList(id)
{
	const response = await axios.get(
		`http://api.4m2d.shop/api/users/${id}`
	);


	return response.data;
}

function InfoList({ url, id })
{

	const [state] = useAsync(() => getList(id), [url]);
	const { loading, data: list, error } = state;

	console.log(list, "list");
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error occured</div>;
	if (!list || list.length === 0) return (
	<EmptyInfoListC>
		<h1>아직 활동내역이 없습니다.</h1>
	</EmptyInfoListC>
	);
	if (url === "manage" || url === "selllist")
		list = list.postsList;
	else
		list = list.cartsList;
	return (
		<InfoListC>
			{list.map((posts,index) => {
				return (
					<PostListC key={index}>
						<PostImgC>
							<img src={posts.image} />
						</PostImgC>
						<PostInfosOneC>
							<PostInfosOne__TitleC>
								<LinkC
									to={{
										pathname: `/postview/${posts.id}`,
										state: {
											data: posts,
											itemId: posts.id,
											flag: true,
										},
									}}
									>
									{posts.title}
								</LinkC>
							</PostInfosOne__TitleC>
							<PostInfosOne__SubtitleC>
								<span>{posts.content}</span>
							</PostInfosOne__SubtitleC>
							<PostInfosOne__DateC>
								<span>{posts.date}</span>
								<span>{posts.local}</span>
							</PostInfosOne__DateC>
						</PostInfosOneC>
						<PostInfosTwoC>
							<PostInfosTwo__PriceC>
								<span>{posts.price}원</span>
							</PostInfosTwo__PriceC>
							<PostInfosTwo__LookupC>
								<span><AiFillHeart color="rgb(234, 123, 151)"/> {posts.view}</span>
								<span><b><AiOutlineEye /></b> 30 </span>
							</PostInfosTwo__LookupC>
						</PostInfosTwoC>
						{url === "selllist" ?
							<Dropdown>
								<Dropdown.Toggle variant="success" id="dropdown-basic">
								  판매중
								</Dropdown.Toggle>

								<Dropdown.Menu>
								  <Dropdown.Item href="#/action-1">판매완료</Dropdown.Item>
								  <Dropdown.Item href="#/action-2">수정</Dropdown.Item>
								  <Dropdown.Item href="#/action-3">삭제</Dropdown.Item>
								</Dropdown.Menu>
							  </Dropdown>
							:
							<PostCategoryC>
								<span>IT/인터넷</span>
							</PostCategoryC>
						}
					</PostListC>
				);
			})}
		</InfoListC>
	);
}

styled(Dropdown)`
	width: 30px;
	height: 40px;
`;

const EmptyInfoListC = styled.div`
	width: 880px;
	height: 160px;
	margin: 0px 50px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
 `;

const PostInfosTwoC = styled.div`
	width: 120px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const PostInfosTwo__PriceC = styled.div`
	position: relative;
	top: 14px;
	& > span
	{
		font-size: 20px;
		color: rgba(0, 0, 0, 0.5);
	}
`;

const PostInfosTwo__LookupC = styled.div`
	justify-content: space-between;
	& > span
	{
		position: relative;
		bottom: -36px;
		display: inline-block;
		padding: 3px;
		color: rgba(0, 0, 0, 0.5);
		> b {
			position: relative;
			bottom: -2px;
		}
	}
`;

const PostCategoryC = styled.div`
	width: 70px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	color: rgba(0, 0, 0, 0.5);
`;

const PostInfosOne__DateC = styled.div`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.5);
	& > span:nth-child(1){
		display:inline-block;
		width: 90px;
	}
	& > span:nth-child(2) {
		display: inline-block;
		padding-left: 20px;
	}
`;

const PostListC = styled.div`
	width: 880px;
	height: 160px;
	margin: 0px 50px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const PostImgC = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: 140px;
		height: 140px;
		border-radius: 10px;
	}
`;

const PostInfosOneC = styled.div`
	width: 352px;
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

const PostInfosOne__TitleC = styled.div`
	margin: 0px 0px;
`;

const LinkC = styled(Link)`
	display: inline-block;
	width: 270px;
	font-weight: 600;
	font-size: 18px;
	text-decoration: none;
	color: rgb(99, 178, 225);
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

`;

const PostInfosOne__SubtitleC = styled.div`
	width: 240px;
	height: 50px;
	margin: 12px 0px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: normal;
	line-height: 1;
/*        height: 4.8em;*/
	text-align: left;
	word-wrap: break-word;
	span {
		font-size: 13px;
		color: rgba(0, 0, 0, 0.7);
	}
`;

const InfoListC = styled.div`
	width: 910px;
	height: auto;
`;

export default InfoList;
