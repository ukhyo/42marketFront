import React, {useState} from "react";
import Mainpage from "./Mainpage/Mainpage";
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./Mainpage//Header";
import axios from "axios";
function App() {
	let [data, setData] = useState([]);

	async function getData() {
		const {data: h} = await axios.get("http://localhost:8000/ukwon/");
		setData([...data, h]);
	}

	//getData();

	return (
		<BrowserRouter>
			{console.log(data)}
			<Route path={"/"} exact component={Mainpage} />
		</BrowserRouter>
	);
}

export default App;
