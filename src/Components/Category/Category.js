import styled from "styled-components";
import Header from "../Mainpage/Header";
import Footer from "../Mainpage/Footer";
import { Route } from "react-router-dom";
import CateDetail from "./CateDetail";



function Category(props) {
	console.log(props, "this is props");
	const { test } = props.match.params;
	console.log(test, "this is test");
	return (
		<SectionC>
			<Header />
			<Route path={"/category/:" + test} component={CateDetail} />
			<Footer />
		</SectionC>
	);
}

const SectionC = styled.section`
	width: 100%;
`;

export default Category;
