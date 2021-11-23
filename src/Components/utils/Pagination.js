import styled from "styled-components";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";


const Pagination = ({ postsPerPage, totalPosts, paginate, current }) => {
	const ScrollToTop = () => {
		window.scrollTo({
			top: 100,
			behavior: "smooth",
		})
	}
	// pageNumber에 5개만 들어가면 될지도.
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	const currentPage = current;
	if (Math.ceil(totalPosts / postsPerPage) < 6)
		current = 0;
	else {
		if (current <= 2)
			current = 0;
		else if (current >= Math.ceil(totalPosts / postsPerPage) - 2) // 11 일때 9보다 크면 11 - 5 => 6 ~ 11
			current = Math.ceil(totalPosts / postsPerPage) - 5;
		else
			current -= 3;
	}
	return (
		<PageListC>
			<PageBtnC onClick={() => {
				paginate(1);
				ScrollToTop();
		}}>
			<AiOutlineDoubleLeft />
		</PageBtnC>
			<PageBtnC onClick={() => {
				if (currentPage - 1 > 0)
					paginate(currentPage - 1);
				ScrollToTop();
			}
		}>
			<BsArrowLeftShort size={25}/>
		</PageBtnC>
		{pageNumbers.slice(current, current + 5).map((number, idx) => (
			<PageNumberC flag={number === currentPage} onClick={() => {
				paginate(number);
				ScrollToTop();
			}}>
			  {number}
			</PageNumberC>
		))}
			<PageBtnC onClick={() => {
				if (currentPage < Math.ceil(totalPosts / postsPerPage))
					paginate(currentPage + 1);
				ScrollToTop();
		}}>
			<BsArrowRightShort size={25} />
		</PageBtnC>
		<PageBtnC onClick={() => {
				paginate(Math.ceil(totalPosts / postsPerPage));
				ScrollToTop();
		}}>
			<AiOutlineDoubleRight/>
		</PageBtnC>
	  </PageListC>
	);
};

function currentPosts(tmp, first, last) {
	let currentPosts = 0;
	currentPosts = tmp.slice(first, last); // array slice
	return currentPosts;
};


const PageListC = styled.div`
	width: 100%;
	/*line-height: 20px;*/
	text-align: center;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	margin-bottom: 30px;

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
	line-height: 20px;
	box-sizing: border-box;
	text-align: center;
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

export {currentPosts}
export default Pagination;
