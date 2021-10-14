import React, { useState } from "react";
import axios from "axios";
import Nongdam from "../../Images/nongdam.png";
import styled from "styled-components";
import Header from "../../Mainpage/Header";
function UploadImg() {
	const [selectedFile, setSelectedFile] = useState(null);
	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	const handleFileUpload = () => {
		const formData = new FormData();
		formData.append("file", selectedFile, selectedFile.name);
		axios
			.post("/src/Images", formData)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div>
			<input type="file" onChange={handleFileChange} />
			<button onClick={handleFileUpload}>업로드</button>
		</div>
	);
}

function DataViewComponent() {
	return (
		<DataViewComponentC>
			<div>
				<MypageImgC src={Nongdam} />
				<UploadImg />
			</div>
			<NickNameC>
				<span>hyeolee</span>
			</NickNameC>
			<LevelViewC>
				<span>Lv.42</span>
			</LevelViewC>
			<ExpViewC>
				<CurrExpViewC>
					<span>42%</span>
				</CurrExpViewC>
			</ExpViewC>
			<StateMsgViewC>
				<span>자거추: 자유로운 거래 추구</span>
			</StateMsgViewC>
		</DataViewComponentC>
	);
}

function MyactiveList() {
	return (
		<ActiveListC>
			<BuyListC>
				<h2>구매 목록</h2>
			</BuyListC>
			<SellListC>
				<h2>판매 목록</h2>
			</SellListC>
			<PickListC>
				<h2>찜한 목록</h2>
			</PickListC>
			<MyCommentsC>
				<h2>내 댓글</h2>
			</MyCommentsC>
		</ActiveListC>
	);
}

function Mypage() {
	return (
		<div>
			<Header></Header>
			<MypageHeaderC>MY PAGE</MypageHeaderC>
			<MypageBodyC>
				<DataViewComponent></DataViewComponent>
				<MyactiveList></MyactiveList>
			</MypageBodyC>
		</div>
	);
}

const MypageHeaderC = styled.h1`
	font-size: 50px;
	text-align: center;
	margin-top: 130px;
	font-family: "Meslo LG S for Powerline";
`;

const DataViewComponentC = styled.div`
	width: 345px;
	height: 640px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid rgba(0, 0, 0, 0.4);
	border-radius: 20px;
	box-sizing: border-box;
	text-align: center;
	display: block;
`;

const MypageImgC = styled.img`
	width: 200px;
	height: 200px;
	margin: 20px;
	border-radius: 200px;
	border: 1px solid rgba(0, 0, 0, 0.4);
`;

const NickNameC = styled.div`
	width: 154px;
	height: 59px;
	display: table;
	margin-left: auto;
	margin-right: auto;
	span {
		font-weight: 600;
		font-family: "TmoneyRoundWindExtraBold";
		font-size: 27px;
	}
`;

const LevelViewC = styled.div`
	text-align: left;
	margin: 0px 20px;
	span {
		font-size: 20px;
		font-family: "TmoneyRoundWindExtraBold";
		font-weight: 800;
		opacity: 0.6;
	}
`;

const ExpViewC = styled.div`
	width: 300px;
	margin: 0 auto;
	border: 1px solid rgba(0, 0, 0, 0.4);
	border-radius: 20px;
	height: 30px;
	span {
		display: flex;
		align-content: center;
		justify-content: center;
		padding: 5px 0px;
		font-family: "TmoneyRoundWindExtraBold";
		font-size: 20px;
		opacity: 0.4;
	}
`;

const CurrExpViewC = styled.div`
	height: 100%;
	width: 42%;
	border-radius: 20px;
	background-color: rgb(199, 232, 230);
`;

const StateMsgViewC = styled.div`
	width: 303px;
	height: 237px;
	margin: 20px;
	text-align: left;
	span {
	}
`;

const ActiveListC = styled.div`
	width: 922px;
	height: 637px;
	display: flex;
	justify-content: space-evenly;
	margin-bottom: 20px;
	margin-left: 20px;
	border-radius: 20px;
	border: 1px solid rgba(0, 0, 0, 0.4);
`;

const MypageBodyC = styled.div`
	width: 1200px;
	height: 600px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
`;

const BuyListC = styled.div`
	font-family: "TmoneyRoundWindExtraBold";
`;

const SellListC = styled.div`
	font-family: "TmoneyRoundWindExtraBold";
	opacity: 0.4;
`;

const PickListC = styled.div`
	font-family: "TmoneyRoundWindExtraBold";
	opacity: 0.4;
`;

const MyCommentsC = styled.div`
	font-family: "TmoneyRoundWindExtraBold";
	opacity: 0.4;
`;

export default Mypage;
