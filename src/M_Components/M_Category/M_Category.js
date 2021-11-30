import styled from "styled-components";
import M_Header from "../M_Mainpage/M_Header";
import { Route } from "react-router-dom";
import M_CateDetail from "./M_CateDetail";
import M_CategoryBar from "../M_Mainpage/M_CategoryBar";


function M_Category(props) {
	const { test } = props.match.params;
	return (
		<SectionC>
			<M_Header />
			<Route path={"/category/:" + test} exact component={M_CateDetail} />
		</SectionC>
	);
}

const SectionC = styled.section`
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
`;

export default M_Category;
