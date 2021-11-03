import styled from "styled-components";
import Header from "../Mainpage/Header";
import Footer from "../Mainpage/Footer";
import ProductManage from "./ProductManage";
import ProductStateBar from "./Product";
import React, { useState, } from "react";
import { RadioRet } from "./Product";
import { Route } from "react-router-dom";
import axios from "axios";
import awsData from "../../secret.json";
import uuid from "react-uuid";
import S3 from "react-aws-s3";


function ProductRegi(props) {
	// Aws s3 인증
	const ACCESS_KEY = awsData.accesskey;
	const SECRET_ACCESS_KEY = awsData.secretkey;
	const REGION = awsData.awsregion;
	const S3_BUCKET_NAME = awsData.s3burket;

	// Input 양식 State
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [idx, setIdx] = useState(0);
	const [price, setPrice] = useState(0);
	const [content, setContent] = useState("");


	// Input 양식 state 이미지 관련
	const [Files, setFiles] = useState([]);
	const [FileUrl, setFileUrl] = useState([]);




	const { history } = props;
	// title section
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
		console.log(location);
		setLocation(e.target.value);
	}

	// img section

	const onChangeImg = (e) => {
		const file = e.target.files;
		console.log("files = ", e.target.files[0]);
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
			if (!Files) {
				alert("사진을 넣어주세요");
				return;
			}
			else if (title === "") {
				alert("제목을 입력해주세요.")
				return;
			}
			else if (price === 0 && idx !== 100) {
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
			else if (idx === 100 && price !== 0) {
				alert("나눔을 선택하셔서 자동으로 0원으로 변경됩니다.")
				setPrice(0);
			}
			const config = {
				bucketName: S3_BUCKET_NAME,
				region: REGION,
				accessKeyId: ACCESS_KEY,
				secretAccessKey: SECRET_ACCESS_KEY,
				dirName: "upload",
			};
			const ReactS3 = new S3(config);
			const pickUUid = uuid();

			let name = Files.map((data, idx) => {
				const type = data.name.split(".").pop();
				const filename = `${pickUUid}${idx}.${type}`;
				ReactS3.uploadFile(data, filename)
				.then((data) => {
					console.log(data, "성공");
				})
				.catch((err) => console.error(err, "에러"));
				return `https://${S3_BUCKET_NAME}.s3.${REGION}.amazonaws.com/upload/${filename}`;
			});
			console.log(name,"di");
			let data = {
				title: title,
				subtitle: content,
				price: price,
				likes: 0,
				category: idx,
				location: location,
				img: name,
				date: "2021-10-21T14:08:25+09:00",
			};
			await axios.post("http://localhost:3001/posts/", data);
			//history.push("/");
			alert("상품 등록 완료!");
		}
		pushData();
	}

	return (
		<div>
			<RegiHeaderC>
				<span>기본정보</span>
				<span> *필수항목</span>
			</RegiHeaderC>
			<RegiMainC>
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
								<span>- 이미지는 상품등록 시 정사각형으로 짤려서 등록됩니다.</span>
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
									required
								></input>
							</li>
							{FileUrl
								? FileUrl.map((img, idx) => {
										return (
											<li key={idx}>
												<BackImgC url={img}></BackImgC>
											</li>
										);
								  })
								: ""}
						</ul>
					</InputC>
				</PictureC>
				<TitleC>
					<SubtitleC>
						제목<b>*</b>
					</SubtitleC>
					<InputC>
						<input onChange={inputChange} type="text" placeholder="상품 제목을 입력하세요." value={title} required />
						<span> {title.length}/40</span>
					</InputC>
				</TitleC>
				<CategoryC>
					<SubtitleC>
						카테고리<b>*</b>
					</SubtitleC>
					<FormC>
						{/* Json 다 받으면 한줄로 줄어들 예정 */}
						<RadioRet value="전자기기" idx={1} setIdx={setIdx} />
						<RadioRet value="주변기기" idx={2} setIdx={setIdx} />
						<RadioRet value="의류" idx={3} setIdx={setIdx} />
						<RadioRet value="책" idx={4} setIdx={setIdx} />
						<RadioRet value="나눔" idx={100} setIdx={setIdx} />
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
					<SubtitleC>설명</SubtitleC>
					<InputC>
						<textarea
							type="text"
							cols="40"
							rows="5"
							placeholder="상품 설명을 입력해주세요."
							value={content}
							onChange={(e) => {
								setContent(e.target.value);
							}}
						></textarea>
					</InputC>
				</ContentC>
				<SubmitC>
					<button onClick={submitHandle}>등록하기</button>
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


const FormC = styled.form`
	width: 80%;
	> span {
		margin-right: 50px;
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

const CategoryC = styled.div`
	width: 100%;
	height: 110px;
	line-height: 110px;


	> div > span {
		margin-right: 50px;
	}
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

const ContentC = styled.div`
	width: 100%;
	height: 205px;
	line-height: 100px;
	> ${InputC} {
		margin-top: 20px;
		> textarea {
			resize: none;
			padding: 10px;
			width: 80%;
			height: 160px;
			margin-right: 10px;
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
		border: 3px solid rgb(178, 236, 238);
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
