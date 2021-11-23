import axios from "axios";
import useAsync from "./useAsync";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineEye } from "react-icons/ai";
import {DropdownButton, DropDown} from "react-bootstrap";
import styled from "styled-components";
import DropdownMenu from "./DropdownMenu";
import GetTime from "../utils/GetTime";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { currentPosts } from "../utils/Pagination";
import Pagination from "../utils/Pagination"
async function getList(id)
{
	console.log(id, "getList id");
	const response = await axios.get(
		`http://api.4m2d.shop/api/users/1`
		);
		return response.data;
	}
function InfoList({id, url})
{
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(8);
	const indexOfLast = currentPage * postsPerPage; //
	const indexOfFirst = indexOfLast - postsPerPage; //
	let userId = 1;
	const [state] = useAsync(() => getList(id), [id]);
	let { loading, data: list, error } = state;
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
	console.log(list,"리스트안");

	if (userId === Number(id))
	{
		return (
			<InfoListC>
				{currentPosts(list,indexOfFirst, indexOfLast).map((posts, index) => {
					const location = posts.local.slice(0, 15) + "...";
					return (
						<PostListC key={index} flag={url === "manage"}>
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
												subList: "0",
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
									<span>{GetTime(posts.updatedAt)}</span>
									<span>{location}</span>
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
							<PostCategoryC>
								{url === "selllist"  || url === "manage" ?
									<DropdownMenu id={posts.id} status={posts.status}></DropdownMenu>
									:
									<PostCategoryC>
										<span>IT/인터넷</span>
									</PostCategoryC>
								}
							</PostCategoryC>
						</PostListC>
					);
				})}
				<Pagination postsPerPage={postsPerPage} totalPosts={list.length} paginate={setCurrentPage} current={currentPage}></Pagination>
			</InfoListC>
		);
			}

	if ( userId !== Number(id) )
	{
		return (
			<InfoListC flag={url === "manage"}>
				{currentPosts(list,indexOfFirst, indexOfLast).map((posts, index) => {
					const location = posts.local.slice(0, 15) + "...";
					console.log(posts.id, "id");
					return (
						<PostListC key={index} flag={url === "manage"}>
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
												subList: "0",
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
									<span>{GetTime(posts.updatedAt)}</span>
									<span>{location}</span>
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
							<PostCategoryC>
								<PostCategoryC>
									<span>IT/인터넷</span>
								</PostCategoryC>
							</PostCategoryC>
						</PostListC>
					);
				})}
				<Pagination postsPerPage={postsPerPage} totalPosts={list.length} paginate={setCurrentPage} current={currentPage}></Pagination>
			</InfoListC>
		);
			}

}

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
	width: 150px;
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
	width: 160px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	color: rgba(0, 0, 0, 0.5);
`;

const PostInfosOne__DateC = styled.div`
	position: absolute;
	bottom: 10px;
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
	/*width: 880px;*/
	position: relative;
	width: ${(props) => (props.flag ? "1000px" : "880px")};
	height: 160px;
	margin: ${(props) => (props.flag ? "0" : "0px 50px")};
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
	/*color: black;*/
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
	width: ${(props) => (props.flag ? "1200px" : "910px")};
	height: auto;
`;


const PageListC = styled.div`
	width: 100%;
	text-align: center;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	> div:first-child {
		margin-right: 5px;
	}
	> div:last-child {
		margin-left: 5px;
	}
`;

const PageNumberC = styled.div`
	width: 30px;
	height: 30px;
	line-height: 30px;
	margin-right: 5px;
	background-color: ${(props) => (props.flag ? "rgb(130, 130, 238)" : "#fdfdfd")};
	border: 1px solid gray;
	border-radius: 15px;
	color: ${(props) => (props.flag ? "white " : "rgb(130, 130, 238)")};
	&:hover {
		background-color: ${(props) => (props.flag ? "rgb(130, 130, 238)" : "#f0f0f0")};
		cursor: pointer;
	}
`;

const PageBtnC = styled.div`
	cursor: pointer;
`;


export default InfoList;
