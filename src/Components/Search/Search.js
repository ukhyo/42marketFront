import React, { useEffect, useState } from "react";
import Header from "../Mainpage/Header";
import Footer from "../Mainpage/Footer";
import CategoryBar from "../Mainpage/CategoryBar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostThumbnail } from "../Mainpage/PreviewPost";
import axios from "axios";
function SearchWord() {
	//const [data, setData] = useState([]);
	//const [Loading, setLoading] = useState(false);
	//useEffect(() => {
	//	const ApiGet = async () => {
	//		const { data: data } = await axios.get(`http://api.4m2d.shop/api/posts/search/${asd}`);
	//		setData(data);
	//		setLoading(!Loading);
	//	}
	//	ApiGet();
	//}, [])
	//if (!Loading)
	//	return;
	return (
		<SectionC>
			{/*<Header />
			<CategoryBar />
			<PostThumbnail key={index}data={data}/>
			<Footer />*/}
		</SectionC>
	);
}


const SectionC = styled.section`

`;

export default SearchWord;
