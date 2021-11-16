import styled from "styled-components";
import Header from "../Mainpage/Header";
import Footer from "../Mainpage/Footer";
import { Route } from "react-router-dom";
import CateDetail from "./CateDetail";
import CategoryBar from "../Mainpage/CategoryBar";


function Category(props) {
	console.log(props, "this is props");
	const { test } = props.match.params;

	console.log(test, "this is test");
	return (
		<SectionC>
			<Header />
			{console.log(test, "this")}
			{/*<CategoryBar />*/}
			<Route path={"/category/:" + test} exact component={CateDetail} />
			<Footer />
		</SectionC>
	);
}

const SectionC = styled.section`
	width: 100%;
`;

export default Category;
