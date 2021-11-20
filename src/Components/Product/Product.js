import styled from "styled-components";
import Header from "../Mainpage/Header";
import Footer from "../Mainpage/Footer";
import { Link, Route } from "react-router-dom";
import ProductRegi from "./ProductRegi";
import ProductManage from "./ProductManage";
import ProductEdit from "./ProductEdit";
function RadioRet({ idx, value, setIdx, flag }) {
	const ClickEvt = () => {
		setIdx(idx);
	}
	return (
		<span>
			{idx === flag ? (
				<input onClick={ClickEvt} name="select" type="radio" value={value} checked />
			) : (
				<input onClick={ClickEvt} name="select" type="radio" value={value}/>
			)}
			<label for="select">{value}</label>
		</span>
	);
}
function ProductStateBar({ path }) {
	console.log("statebar", path);
	return (
		<SectionC>
			<ProductStateBarC>
				<LinkC to="/product/regi">
					<SpanC flag={path === "regi"}>상품등록</SpanC>
				</LinkC>
				<LinkC to="/product/manage">
					<SpanC flag={path === "manage"}>상품관리</SpanC>
				</LinkC>
				{/*<LinkC to="/product/history">
					<SpanC flag={false}>구매 / 판매내역</SpanC>
				</LinkC>*/}
			</ProductStateBarC>
		</SectionC>
	);
}

function Product(props) {
	return (
		<SectionC>
			<Header />
			<ProductStateBar path={props.location.pathname.split("/").pop()} />
			<Route path={"/product/regi"} component={ProductRegi} />
			<Route path={"/product/manage"} component={ProductManage} />
			{/*<Route path={"/product/edit"} component={ProductEdit} />*/}
			<Footer />
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

const SpanC = styled.span`
	color: ${(props) => (props.flag ? "rgb(130, 130, 238)" : "rgba(0,0,0,1)")};
	transition: color 0.3s ease-in-out;
`;

const ProductStateBarC = styled.div`
	width: 1000px;
	margin: 0 auto;
	height: 70px;
	line-height: 70px;
	margin-bottom: 60px;
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
export { ProductStateBar };
export default Product;
