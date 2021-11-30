import styled from "styled-components";
import { Link, Route } from "react-router-dom";
import M_Header from "../M_Mainpage/M_Header";
import M_ProductEdit from "./M_ProductEdit";
import M_ProductManage from "./M_ProductManage";
import M_ProductRegi from "./M_ProductRegi";
import theme from "../../Styles/theme";

function M_RadioRet({ idx, value, setIdx, flag }) {
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
			<label for="select"> {value}</label>
		</span>
	);
}
function M_ProductStateBar({ path }) {
	return (
		<SectionC>
			<ProductStateBarC theme={theme}>
				<LinkC to="/product/regi">
					<SpanC flag={path === "regi"}>상품등록</SpanC>
				</LinkC>
				<LinkC to="/product/manage">
					<SpanC flag={path === "manage"}>상품관리</SpanC>
				</LinkC>
			</ProductStateBarC>
		</SectionC>
	);
}

function M_Product(props) {
	return (
		<SectionC>
			<M_Header />
			<M_ProductStateBar path={props.location.pathname.split("/").pop()} />
			<Route path={"/product/regi"} component={M_ProductRegi} />
			<Route path={"/product/manage"} component={M_ProductManage} />
			<Route path={"/product/edit"} component={M_ProductEdit} />
		</SectionC>
	);
}

const SectionC = styled.section`
	width: 100%;
	max-width: 400px;
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
	width: ${({theme}) => theme.widthSize.margin};
	margin: 0 auto;
	height: 70px;
	line-height: 70px;
	margin-bottom: 30px;
	${LinkC}:first-child {
		border-right: 1px solid #c0c0c0;
		padding-right: 25px;
		margin-right: 25px;
	}

	/*> div {
		width: 505px;
		/*border-bottom: 1px solid #c0c0c0;*/
	}*/
`;

export { M_RadioRet }
export { M_ProductStateBar };
export default M_Product;
