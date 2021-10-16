import styled from "styled-components";
import Header from "../Mainpage/Header";
import Footer from "../Mainpage/Footer";
import ProductStateBar from "./Product";
import React, { useState } from "react";
import { RadioRet } from "./Product";

function ProductRegi() {
	let [title, setTitle] = useState("");
	const [idx, setIdx] = useState(0);

	const getIdx = (number) => {
		setIdx(number);
	}

	function inputChange(e) {
		if (e.target.value.length > 40) {
			e.target.value = e.target.value.slice(0, 39);
			return;
		}
		setTitle(e.target.value);
	}
	console.log(idx, "카테고리 결정 확인 in: ProductRegi.js"); // 카테고리 결정 확인
	return (
		<SectionC>
			<Header />
			<ProductStateBar />
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
						<label for="file">이거 머임?</label>
						<input type="file" placeholder="메롱"></input>
						<span></span>
					</InputC>
				</PictureC>
				<TitleC>
					<SubtitleC>
						제목<b>*</b>
					</SubtitleC>
					<InputC>
						<input onChange={inputChange} type="text" placeholder="상품 제목을 입력하세요." valye={title} />
						<span> {title.length}/40</span>
					</InputC>
				</TitleC>
				<CategoryC>
					<SubtitleC>
						카테고리<b>*</b>
					</SubtitleC>
					<FormC>
						{" "}
						{/* Json 다 받으면 한주롤 줄어들 예정 */}
						<RadioRet value="전자기기" getIdx={getIdx} />
						<RadioRet value="주변기기" getIdx={getIdx} />
						<RadioRet value="의류" getIdx={getIdx} />
						<RadioRet value="책" getIdx={getIdx} />
						<RadioRet value="공동구매" getIdx={getIdx} />
					</FormC>
				</CategoryC>
				<TradeLocationC>
					<SubtitleC>
						거래장소<b>*</b>
					</SubtitleC>
					<InputC>
						<div>
							<button>개포</button>
							<button>서초</button>
							<button>직접입력</button>
						</div>
						<div>
							<input type="text" placeholder="상세주소를 적어주세요."></input>
						</div>
					</InputC>
				</TradeLocationC>
				<PriceC>
					<SubtitleC>가격<b>*</b></SubtitleC>
					<InputC>
						<input type="number" placeholder="숫자만 입력해주세요."></input>
						<span>원</span>
					</InputC>
				</PriceC>
				<ContentC>
					<SubtitleC>설명</SubtitleC>
					<InputC>
						<input type="text" placeholder="상품 설명을 입력해주세요."></input>
					</InputC>
				</ContentC>
			</RegiMainC>
			<Footer />
		</SectionC>
	);
}

// width: 1000, 1200 비교해보기. 팀원들한테 상의 후 결정 => 수정시 Product.js stateBar 수정해야함

const RegiHeaderC = styled.div`
	width: 1200px;
	margin: 0 auto;
	margin-top: 70px;
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
	width: 1200px;
	/*height: 500px;*/
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

const PictureC = styled.div`
	width: 100%;

	> div:last-child {
		> input[type=file] {
			overflow: hidden;
			position: absolute;
			width:0;
			height:0;
			padding: 0;
			border: 0;
		}
	}
	height: 270px;

`;

const SubtitleC = styled.div`
	width: 20%;
	> b {
		color: red;
	}
`;

const InputC = styled.div`
	width: 80%;
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
				border: 1px solid #c0c0c0;
				&:hover {
					background-color: rgb(178,236,238);
				}
			}
		}
		> div:last-child {
			margin-top: 22px;
			> input {
				width: 70%;
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
		> input {
			width: 80%;
			height: 160px;
			margin-right: 10px;
		}
	}
`;

//background-color: rgb(178, 236, 238);

const SectionC = styled.section`
	margin: 0 auto;
`;

export default ProductRegi;
