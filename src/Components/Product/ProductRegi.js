import styled from "styled-components";
import React, { useState, } from "react";
import { RadioRet } from "./Product";
import { Route } from "react-router-dom";
import axios from "axios";
import { DeleteUrl } from "../utils/DeleteImg";
import { Cookies } from "react-cookie";

function ProductRegi(props) {
	const cookie = new Cookies();
	let { userId: userId, Authorization: token, subscribes: sub } = cookie.getAll();
	// Input 양식 State
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [idx, setIdx] = useState(0);
	const [price, setPrice] = useState(0);
	const [content, setContent] = useState("");
	const [Loading, setLoading] = useState(false);


	// Input 양식 state 이미지 관련
	const [Files, setFiles] = useState([]);
	const [FileUrl, setFileUrl] = useState([]);


	const { history } = props;
	function inputChange(e) {
		if (e.target.value.length > 40) {
			e.target.value = e.target.value.slice(0, 39);
			return;
		}
		setTitle(e.target.value);
	}

	// location section
	function GaepoClick() {
		setLocation("서울 강남구 개포로 416 ");
	}
	function SeochoClick() {
		setLocation("서울 서초구 강남대로 327 대륭서초타워 ");
	}
	function DirectLocation() {
		setLocation("");
	}

	function ChangeLocation(e) {
		setLocation(e.target.value);
	}

	// img section

	const onChangeImg = (e) => {
		const file = e.target.files;
		let transArr = Array.from(file);
		if (transArr.length + Files.length > 8) {
			alert(`사진은 최대 8개까지 가능합니다. 현재 : ${Files.length}개`);
			return;
		}
		transArr.forEach((file) => {
			setFiles((Files) => [...Files, file]);
		});
		transArr.forEach(async (file) => {
			let reader = new FileReader();
			reader.onload = (e) => {
				setFileUrl((url) => [...url, e.target.result]);
			};
			reader.readAsDataURL(file);
		});
	};

	// submit section

	const submitHandle = (e) => {
		const pushData = async () => {
			console.log("here?", Files);
			if (!Files) {
				alert("사진을 넣어주세요");
				return;
			}
			if (title === "") {
				alert("제목을 입력해주세요.")
				return;
			}
			else if (price < 0)
			{
				alert("가격이 잘못되어있습니다.");
				return;
			}
			else if (price === 0 && idx !== 8) {
				alert("가격을 입력해주세요.");
				return;
			}
			else if (location === "") {
				alert("거래장소를 입력해주세요.");
				return;
			}
			else if (idx === 0) {
				alert("카테고리를 선택해주세요.");
				return;
			}
			else if (idx === 8) {
				alert("나눔을 선택하셔서 자동으로 0원으로 변경됩니다.")
			}
			let fileList = new FormData();
			Files.forEach((data) => {
				fileList.append(`fileList`, data);
			});

			let temp = price;
			if (idx === 8)
				temp = 0;
			let data = {
				title: title,
				content: content,
				price: temp,
				local: location,
				categoryId: idx,
				userId: userId,
			};

			fileList.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
			const headers = {
				"Authorization": `Bearer ${token}`,
				"Content-Type": `multipart/form-data`,
			};
			setLoading(true);
			await axios
				.post("http://api.4m2d.site/api/posts/", fileList, {headers})
				.then((res) => {
					history.push("/");
				})
				.catch((err) => console.error(err, "에러"));
			setLoading(false);
			alert("상품 등록 완료!");
		}
		pushData();
	}

	return (
	<div>
	  <RegiHeaderC >
		<span>기본정보</span>
		<span> *필수항목</span>
	  </RegiHeaderC>
	  <RegiMainC Loading={Loading}>
		<PictureC>
		  <SubtitleC>
			상품 이미지<b>*</b>
		  </SubtitleC>
		  <InputC>
			<LabelAndManualC>
			  <label for="test12">이미지 등록</label>
			  <div>
				<span>- 상품 이미지는 640x640에 최적화 되어 있습니다.</span>
				<span>- 비율이 1:1인 사진을 올리시면 짤리지 않습니다.</span>
				<span>
				  - 이미지는 상품등록 시 정사각형으로 짤려서 등록됩니다.
								</span>
								<span>- 사진은 Jpeg, Png 형식만 동륵 가능합니다.</span>
			  </div>
			</LabelAndManualC>
			<ul>
			  <li>
				<input
				  type="file"
				  id="test12"
				  multiple
				  onChange={(e) => {
					onChangeImg(e, setFileUrl, setFiles, Files);
				  }}
				  accept="image/png, image/jpeg, image/jpg"
				  required
				></input>
			  </li>
			  {FileUrl &&
				FileUrl.map((img, idx) => {
				  return (
					<li key={idx}>
					  <BackImgC url={img}></BackImgC>
					  <DeletePostIconC
						onClick={(e) => {
						  DeleteUrl(
							e,
							idx,
							Files,
							setFiles,
							FileUrl,
							setFileUrl
						  );
						}}
					  >
						X
					  </DeletePostIconC>
					</li>
				  );
				})}
			</ul>
		  </InputC>
		</PictureC>
		<TitleC>
		  <SubtitleC>
			제목<b>*</b>
		  </SubtitleC>
		  <InputC>
			<input
			  onChange={inputChange}
			  type="text"
			  placeholder="상품 제목을 입력하세요."
			  value={title}
			  required
			/>
			<span> {title.length}/40</span>
		  </InputC>
		</TitleC>
		<CategoryC>
		<SubtitleC>
			카테고리<b>*</b>
		</SubtitleC>
		<FormC>
			<div>
				<RadioRet value="전자" idx={1} flag={idx} setIdx={setIdx} />
				<RadioRet value="생활" idx={2} flag={idx} setIdx={setIdx} />
				<RadioRet value="레저" idx={3} flag={idx} setIdx={setIdx} />
				<RadioRet value="패션" idx={4} flag={idx} setIdx={setIdx} />
				<RadioRet value="음악/악기" idx={5} flag={idx} setIdx={setIdx} />
			</div>
			<div>
				<RadioRet value="뷰티" idx={6} flag={idx} setIdx={setIdx} />
				<RadioRet value="도서" idx={7} flag={idx} setIdx={setIdx} />
				<RadioRet value="나눔" idx={8} flag={idx} setIdx={setIdx} />
				<RadioRet value="기타" idx={9} flag={idx} setIdx={setIdx} />
			</div>
		</FormC>
		</CategoryC>

		<TradeLocationC>
		  <SubtitleC>
			거래장소<b>*</b>
		  </SubtitleC>
		  <InputC>
			<div>
			  <button onClick={GaepoClick}>개포</button>
			  <button onClick={SeochoClick}>서초</button>
			  <button onClick={DirectLocation}>직접입력</button>
			</div>
			<div>
			  <input
				onChange={ChangeLocation}
				type="text"
				placeholder="상세주소를 적어주세요."
				value={location}
				required
			  ></input>
			</div>
		  </InputC>
		</TradeLocationC>
		<PriceC>
		  <SubtitleC>
			가격<b>*</b>
		  </SubtitleC>
		  <InputC>
			<input
			  type="number"
			  placeholder="숫자만 입력해주세요."
			  value={price}
			  onChange={(e) => {
				setPrice(parseInt(e.target.value));
			  }}
			  required
			></input>
			<span>원</span>
		  </InputC>
		</PriceC>
		<ContentC>
		  <ContentSub>설명</ContentSub>
		  <InputC>
			<textarea
			  type="text"
			  cols="40"
			  rows="5"
			  placeholder="상품 설명을 입력해주세요."
			  value={content}
							onChange={(e) => {
								if (e.target.value.length > 200) {
									e.target.value = e.target.value.slice(0, 199);
									return;
								}
				setContent(e.target.value);
			  }}
						></textarea>
						<div> {content.length}/200</div>
		  </InputC>
		</ContentC>
		<SubmitC>
					<button onClick={() => {
						if (!Loading)
							submitHandle();
						else
							alert("상품 등록중입니다");
					}}>등록하기</button>
		</SubmitC>
	  </RegiMainC>
	</div>
  );
}

// width: 1000, 1200 비교해보기. 팀원들한테 상의 후 결정 => 수정시 Product.js stateBar 수정해야함

const RegiHeaderC = styled.div`
	width: 1000px;
	margin: 0 auto;
	height: 65px;
	> span:first-child {
		font-size: 30px;
		margin-right: 50px;
	}
	> span:last-child {
		font-size: 20px;
		color: red;
	}
	border-bottom: 1px solid black;
`;

const RegiMainC = styled.div`
	width: 1000px;
	margin: 0 auto;
	margin-top: 50px;
	font-size: 15px;
	cursor: ${(props) => (props.Loading ? 'wait' : '')};
	> div {
		display: flex;
	}
	> div:not(div:last-child) {
		border-bottom: 1px solid #c0c0c0;
	}
	& input {
		padding-left: 10px;
	}
	`;

const InputC = styled.div`
		width: 80%;
`;

const LabelAndManualC = styled.div`
	display: flex;
	align-items: center;

	> label {
		display: inline-block;
		line-height: 100px;
		text-align: center;
		width: 200px;
		height: 100px;
		background-color: #f0f0f0;
		cursor: pointer;
	}
	> div {
		display: flex;
		flex-direction: column;
		width: 600px;
		margin-left: 50px;
		> span {
			font-size: 14px;
			line-height: 1.5;
		}
	}
`;

const BackImgC = styled.div`
	width: 190px;
	height: 190px;
	background-image: url("${(props) => props.url}");
	background-position: center;
	background-size: cover;
	border-radius: 15px;
	margin-right: 10px;
	margin-top: 10px;
`;

const DeletePostIconC = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
	width: 20px;
	height: 20px;
	text-align: center;
	line-height: 20px;
	border: 1px solid gray;
	background-color: #fdfdfd;
	border-radius: 3px;
`;

const PictureC = styled.div`
	width: 100%;
	> ${InputC} {
		input[type="file"] {
			padding: 0;
			display: none;
			border: none;
			background-color: #fff;
		}
		> ul {
			display: flex;
			flex-wrap: wrap;
			overflow-x: hidden;
			> li {
				position: relative;
				display: flex;
			}
		}
	}
	padding-bottom: 30px;
`;

const SubtitleC = styled.div`
	width: 20%;
	> b {
		color: red;
	}
`;



const TitleC = styled.div`
	width: 100%;
	height: 100px;
	line-height: 96px;
	> ${InputC} {
		> input {
			margin-right: 10px;
			width: 80%;
			height: 40px;
			border: 1px solid black;
		}
	}

	`;
const FormC = styled.div`
	width: 80%;
	/*min-width: 960px;*/
	> div > span {
		margin-right: 50px;
	}
	> div {
		height: 60px;
	}
	/*display: flex;*/
	/*justify-content: space-between;*/
`;

const CategoryC = styled.div`
	width: 100%;
	height: 160px;
	line-height: 110px;
`;

const TradeLocationC = styled.div`
	width: 100%;
	height: 160px;
	line-height: 90px;
	> ${InputC} {
		> div:first-child {
			height: 50px;
			> button {
				width: 100px;
				height: 48px;
				line-height: 48px;
				margin-right: 20px;
				background-color: white;
				border: 1px solid black;
				&:hover {
					background-color: rgb(178,236,238);
				}
			}
		}
		> div:last-child {
			margin-top: 22px;
			> input {
				width: 80%;
				height: 40px;
			}

		}
	}
`;

const PriceC = styled.div`
	width: 100%;
	height: 100px;
	line-height: 100px;
	> ${InputC} {
		> input {
			border: 1px solid black;
			width: 30%;
			height: 40px;
			margin-right: 10px;
			-webkit-appearance: none;
			-moz-appearance: textfield;
		}
		> input::-webkit-outer-spin-button,
		> input::-webkit-inner-spin-button {
			-webkit-appearance: none;
		}
	}
`;

const ContentSub = styled.div`
	width: 20%;
	line-height: 70px;
`;

const ContentC = styled.div`
	width: 100%;
	height: 160px;
	position: relative;
	> ${SubtitleC} {
		position: static;
		top: 30px;
		left: 30px;
	}
	> ${InputC} {
		position: relative;
		margin-top: 20px;
		> textarea {
			resize: none;
			padding: 10px;
			width: 80%;
			height: 120px;
			margin-right: 10px;
		}
		>  div {
			position: absolute;
			top: 53px;
			right: 100px;
		}
	}
	padding-bottom: 15px;
`;

const SubmitC = styled.div`
	position: relative;
	width: 100%;
	height: 80px;
	> button {
		width: 150px;
		height: 60px;
		position: absolute;
		top: 10px;
		right: 0px;
		background-color: #fdfdfd;
		border: 1px solid #c0c0c0;
		&:hover {
			background-color:white;
		}
		&:active {
			color: red;
		}
	}
`;

//background-color: rgb(178, 236, 238);

const SectionC = styled.section`
	margin: 0 auto;
`;

export default ProductRegi;
