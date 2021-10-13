import React, { useEffect, useState } from "react";
import Mainpage from "./Mainpage/Mainpage";
import { BrowserRouter, Route } from "react-router-dom";
import PostDetail from "./PostDetail/PostDetail";
import { createGlobalStyle } from "styled-components";

function App() {
	console.log("%c in Function", "color: blue");
	return (
		<section>
			<BrowserRouter>
				<section>
					<GlobalStyle />
					<Route path={"/"} exact component={Mainpage} />
					<Route path={"/post/detail"} component={PostDetail} />
				</section>
			</BrowserRouter>
		</section>
	);
}

const GlobalStyle = createGlobalStyle`
	font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-size: 30px;
	background-color: black;
`;

// test App Component
//function App() {
//	let [test, setTest] = useState([]);
//	let [test2, setTest2] = useState([]);
//	useEffect(() => {
//		let arr = [
//			{
//				name: "hi",
//				age: 10,
//				text: "real?",
//			},
//			{
//				name: "h2",
//				age: 12,
//				text: "change?",
//			},
//			{
//				name: " 그렇구나",
//				age: 19,
//				text: "tt",
//			},
//		];
//		setTest(arr);
//	}, []);

//	const btnClick = () => {
//		let temp = test;
//		temp[0].age += 2;
//		setTest((test = temp));
//	};

//	const btnClick2 = () => {
//		let temp = {
//			name: "안녕하세요",
//			age: 1,
//			text: "반갑습니다",
//		};
//		setTest2([...test2, temp]);
//	};

//	console.log("%c in Function", "color: blue");
//	return (
//		<BrowserRouter>
//			{console.log(`%c Case 1`, "color:red", test, typeof test)}
//			{console.log(`%c Case 2`, "color:blue", test2, typeof test2)}
//			<h1>ㅎㅇ</h1>
//			<button onClick={btnClick}>클릭해봐</button>
//			<button onClick={btnClick2}>클릭해봐2</button>
//		</BrowserRouter>
//	);
//}
export default App;
