import styled from "styled-components";
import Header from "../Mainpage/Header";
import Footer from "../Mainpage/Footer";
import { Link } from "react-router-dom";



function RadioRet({ value, getIdx }) {
	const ClickEvt = () => {
		getIdx(1);
	}
	return (
		<span>
			<input onClick={ ClickEvt } name="select" type="radio" value={value} />
			<label for="select">{value}</label>
		</span>
	);
}

function ProductStateBar() {
	return (
		<SectionC>
			<ProductStateBarC>
				<LinkC to="/product/regi">
					<span>상품등록</span>
				</LinkC>
				<LinkC to="/product/manage">
					<span>상품관리</span>
				</LinkC>
				<LinkC to="/product/history">
					<span>구매 / 판매내역</span>
				</LinkC>
				<div></div>
			</ProductStateBarC>
		</SectionC>
	);
}

const SectionC = styled.section`
	margin: 0 auto;
`;

const LinkC = styled(Link)`
	text-decoration: none;
	color: black;
`;

const ProductStateBarC = styled.div`
	width: 1000px;
	margin: 0 auto;
	height: 70px;
	line-height: 70px;
	/*margin-bottom: 30px;*/
	margin-bottom: 10px;
	span {

	}
	${LinkC}:first-child, ${LinkC}:nth-child(2) {
		border-right: 1px solid #c0c0c0;
		margin-right: 60px;
		padding-right: 60px;
		padding-left: 10px;
	}


	> div {
		width: 505px;
		/*border-bottom: 1px solid #c0c0c0;*/
	}
`;

export { RadioRet }
export default ProductStateBar;
