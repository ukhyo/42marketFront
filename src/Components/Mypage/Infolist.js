import axios from "axios";
import useAsync from "./useAsync";
import styled from "styled-components";

async function getList(list)
{
	const response = await axios.get(
		`http://localhost:3001/${list}`
	);
	return response.data;
}

function InfoList({ url })
{
	console.log(url, "Info");
	const [state] = useAsync(() => getList(url), [url]);
	const { loading, data: list, error } = state;

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error occured</div>;
	if (!list) return null;
	return (
		<InfoListC>
			{list.map((posts,index) => {
				return (
					<PostListC key={index}>
						<PostImgC>
							<img src={posts.img} />
						</PostImgC>
						<PostInfosC>
							<PostInfos__TitleC>
								<h2>{posts.title}</h2>
							</PostInfos__TitleC>
							<PostInfos__PriceC>
								<span>{posts.price}₩</span>
							</PostInfos__PriceC>
						</PostInfosC>
						<PostLogsC>
						</PostLogsC>
					</PostListC>
				);
			})}
		</InfoListC>
	);
}

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
	}
`;

const PostInfosC = styled.div`
	padding-right: 100px;
	width: 60%;
	height: 90%;
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

const PostLogsC = styled.div`

`;

const PostInfos__TitleC = styled.div`
	margin-bottom: 30px;
	h2 {
		font-weight: 600;
		font-size: 24px;
		color: rgb(99, 178, 225);
	}
`;

const PostInfos__PriceC = styled.div`
	span {
		font-weight: 600;
		font-size: 18px;
		color: rgba(0, 0, 0, 0.8);
	}
`;

const InfoListC = styled.div`
	width: 910px;
	height: auto;
`;

export default InfoList;