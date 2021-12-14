import styled from "styled-components";
import Header from "../Mainpage/Header";
import Footer from "../Mainpage/Footer";
import { Route } from "react-router-dom";
import CateDetail from "./CateDetail";
import CategoryBar from "../Mainpage/CategoryBar";


function Category(props) {
	const { test } = props.match.params;
	return (
		<SectionC>
			<Header />
			<Route path={"/category/:" + test} exact component={CateDetail} />
			<Footer />
		</SectionC>
	);
}

const SectionC = styled.section`
	width: 100%;
	min-width: 1200px;
`;

export default Category;
