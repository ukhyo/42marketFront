import axios from "axios";
import useAsync from "./M_useAsync";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineEye } from "react-icons/ai";
import {DropdownButton, DropDown} from "react-bootstrap";
import styled from "styled-components";
import DropdownMenu from "./M_DropdownMenu";
import GetTime from "../../Components/utils/GetTime";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { currentPosts } from "../../Components/utils/Pagination";
import Pagination from "../../Components/utils/Pagination";
async function getList(id)
{
	const response = await axios.get(
		`http://api.4m2d.site/api/users/${id}`
	).then(res => {
		console.log(res, "성공?");
		return res;
	}).catch(err => {
		console.log(err, "실패");
		});
		return response.data;
	}
function InfoList({id, url})
{
	const cookie = new Cookies();
	let { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(8);
	const indexOfLast = currentPage * postsPerPage; //
	const indexOfFirst = indexOfLast - postsPerPage; //
	const [state] = useAsync(() => getList(id), [id]);
	let { loading, data: list, error } = state;

	if (!list || list.length === 0) return (
		<EmptyInfoListC>
			<h1>아직 활동내역이 없습니다.</h1>
		</EmptyInfoListC>
	);
	if (url === "manage" || url === "selllist")
		list = list.postsList;
	else
		list = list.cartsList;
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error occured</div>;
	if (userId === id)
	{
		return (
			<InfoListC flag={url === "manage"}>
				{list.length >= 1 && currentPosts(list,indexOfFirst, indexOfLast).map((posts, index) => {
					const location = posts.local.slice(0, 15) + "...";
					let content = "";
					if (posts.content.length >= 45)
						content = posts.content.slice(0, 44) + "...";
					else
						content = posts.content;
					return (
						<PostListC key={index} flag={url === "manage"}>
							<PostImgC>
								<img src={posts.image} />
								{posts.status ?
									<CoverImgC>
										판매완료
									</CoverImgC> : null
								}
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
									<span>{content}</span>
								</PostInfosOne__SubtitleC>
								<PostInfosOne__DateC>
									<span>{GetTime(posts.updatedAt)}</span>
									<span>{location}</span>
								</PostInfosOne__DateC>
								<PostInfosTwo__PriceC>
									<span>{posts.price}원</span>
								</PostInfosTwo__PriceC>
								<PostInfosTwo__LookupC>
									<PostInfosTwo_LookupTwoC>
										<span><AiFillHeart color="rgb(234, 123, 151)"/> {posts.subscribes}</span>
										<span><b><AiOutlineEye /></b> {posts.view} </span>
									</PostInfosTwo_LookupTwoC>
									<PostCategoryC>
										{url === "selllist"  || url === "manage" ?
											<DropdownMenu id={posts.id} status={posts.status}></DropdownMenu>
											:
											<PostCategoryC>
												<span>{posts.categoryName}</span>
											</PostCategoryC>
										}
									</PostCategoryC>
								</PostInfosTwo__LookupC>
							</PostInfosOneC>
						</PostListC>
					);
				})}
				{
					list.length > 0 ?
						<Pagination postsPerPage={postsPerPage} totalPosts={list.length} paginate={setCurrentPage} current={currentPage}></Pagination>
						:
					<EmptyInfoListC>
						<h1>아직 활동내역이 없습니다.</h1>
					</EmptyInfoListC>
				}
			</InfoListC>
		);
	}
	else
	{
		return (
			<InfoListC flag={url === "manage"}>
				{list.length >= 1 && currentPosts(list,indexOfFirst, indexOfLast).map((posts, index) => {
					const location = posts.local.slice(0, 15) + "...";
					let content = "";
					if (posts.content.length >= 45)
						content = posts.content.slice(0, 44) + "...";
					else
						content = posts.content;
					return (
						<PostListC key={index} flag={url === "manage"}>
							<PostImgC>
								<img src={posts.image} />
								{posts.status ?
									<CoverImgC>
										판매완료
									</CoverImgC> : null
								}
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
									<span>{content}</span>
								</PostInfosOne__SubtitleC>
								<PostInfosOne__DateC>
									<span>{GetTime(posts.updatedAt)}</span>
									<span>{location}</span>
								</PostInfosOne__DateC>
								<PostInfosTwo__PriceC>
									<span>{posts.price}원</span>
								</PostInfosTwo__PriceC>
								<PostInfosTwo__LookupC>
									<PostInfosTwo_LookupTwoC>
										<span><AiFillHeart color="rgb(234, 123, 151)"/> {posts.subscribes}</span>
										<span><b><AiOutlineEye /></b> {posts.view} </span>
									</PostInfosTwo_LookupTwoC>
									<PostCategoryC>
											<span>{posts.categoryName}</span>
									</PostCategoryC>
								</PostInfosTwo__LookupC>
							</PostInfosOneC>
						</PostListC>
					);
				})}
				{
					list.length > 0 ?
						<Pagination postsPerPage={postsPerPage} totalPosts={list.length} paginate={setCurrentPage} current={currentPage}></Pagination>
						:
					<EmptyInfoListC>
						<h1>아직 활동내역이 없습니다.</h1>
					</EmptyInfoListC>
				}
			</InfoListC>
		);
			}

}

const CoverImgC = styled.div`
	position: absolute;
	top:0;
	left:7px;
	width: 88%;
	height: 40px;
	margin-top: 70px;
	line-height: 50px;
	text-align: center;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	color: white;
	background-color: rgba(0, 0, 0, 0.4);
`;

const PostInfosTwo_LookupTwoC = styled.div`
	& > span
	{
		font-size: 0.8em;
		display: inline-block;
		white-space: nowrap;
		padding: 0.2rem 0.2rem 0.2rem 0px;
		color: rgba(0, 0, 0, 0.5);
		> b {
			position: relative;
			bottom: -2px;
		}
	}
`;

const EmptyInfoListC = styled.div`
	width: 100%;
	height: 80px;
	margin: 0 auto;
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
	margin: 0.2rem 0px;
	& > span
	{
		font-size: 0.8em;
		color: rgba(0, 0, 0, 0.5);
	}
`;

const PostInfosTwo__LookupC = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 0.5rem;
`;

const PostCategoryC = styled.div`
	width: 5rem;
	height: 100%;
	font-size: 0.8em;
	text-align: center;
	padding: 0.4rem 0rem;
	color: rgba(0, 0, 0, 0.5);
`;

const PostInfosOne__DateC = styled.div`
	font-size: 0.5em;
	display: flex;
	margin: 0.2rem 0px;
	color: rgba(0, 0, 0, 0.5);
	justify-content: flex-start;
	& > span:nth-child(1){
		display:inline-block;
		width: 3rem;
	}
	& > span:nth-child(2) {
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const PostListC = styled.div`
	/*width: 880px;*/
	width: 100%;
	height: 100%;
	padding: 15px 0px;
	margin: 0 auto;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const PostImgC = styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		img {
			width: 7rem;
			height: 7rem;
			border-radius: 10px;
			margin: 0px 0.5rem;
		}
`;

const PostInfosOneC = styled.div`
	width: calc(100% - 150px);
	height: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

const PostInfosOne__TitleC = styled.div`
	/* display: flex;
	justify-content: center;
	align-items: center; */
	width: 90%;
	vertical-align: middle;
	margin-bottom: 0.4rem;
	height: 13px;
`;

const LinkC = styled(Link)`
	display: block;
	padding: 0.3rem 0px;
	font-weight: 600;
	font-size: 0.8em;
	text-decoration: none;
	color: rgb(75, 75, 75);
	overflow: hidden;
	white-space : nowrap;
	text-overflow : ellipsis;
	word-wrap: break-word;
	display: --webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;

`;

const PostInfosOne__SubtitleC = styled.div`
	width: 90%;
	margin: 0.4rem 0px;
	height: 11px;
	span {
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 10px;
		color: rgba(0, 0, 0, 0.7);
	}
`;

const InfoListC = styled.div`
	width: 100%;
	height: 170px;
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
