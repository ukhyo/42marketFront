import styled from "styled-components";
import Footer1 from "../img/4m2dfooter1.png";
import Footer2 from "../img/4m2dfooter2.png";
import Footer3 from "../img/4m2dfooter3.png";

function Footer() {
	return (
		<FooterC>
			<FooterMainC>
				<FooterMainIntroC>
					<HeaderC>사면이득<ImgC src={Footer1}/></HeaderC>
					<FooterMainIntroColumnC>
						<span>담당자 : 권지민 | 부 담당자 : 권욱헌, 이정욱, 이형진</span>
					</FooterMainIntroColumnC>
					<FooterMainIntroColumnC>
						<span>구성원 : jimkwon, ukwon, jeongwle, hyeolee</span>
					</FooterMainIntroColumnC>
					<FooterMainIntroColumnC>
						<span>Backend : jimkwon & jeongwle | Frontend : ukwon & hyeolee</span>
					</FooterMainIntroColumnC>
					<FooterMainIntroColumnC>
						<span>담당자 연락처 : cini1111@naver.com | 슬랙 아이디 : jimkwon</span>
					</FooterMainIntroColumnC>
				</FooterMainIntroC>
				<FooterMainIntroC>
					<HeaderC>고객 센터<ImgC src={Footer2}/></HeaderC>
					<FooterMainIntroColumnC>
						<a href="#">자주 묻는 질문</a>
					</FooterMainIntroColumnC>
					<FooterMainIntroColumnC>
						<a href="#">1 : 1 문의하기</a>
					</FooterMainIntroColumnC>
				</FooterMainIntroC>
			</FooterMainC>
			<FooterWarningC>
				<ImgC src={Footer3} />
				<span>웹서비스 "사면이득"은 통신판매중개자로서 중고거래의 거래 당사자가 아니며,
				판매자가 등록한 상품정보 및 거래에 대해 책임을 지지 않습니다.
				</span>
			</FooterWarningC>
		</FooterC>
	);
}

const FooterC = styled.div `
	width: 100%;
	background-color: rgb(238, 238, 238);
	padding: 40px 0px;
`

const FooterMainC = styled.div `
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0vw 26vw;
	align-items: center;
	border-bottom: 1px solid rgba(0, 0, 0, 0.4);
`

const FooterMainIntroC = styled.div `
	height: 230px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`

const HeaderC = styled.div`
	display: flex;
	align-items: center;
	font-size: 20px;
	font-weight: 700;
	margin-bottom: 30px;
	> img {
		margin-left: 10px;
	}
`

const FooterMainIntroColumnC = styled.div `
	padding: 10px 0px;
	font-weight: 600;
	> a {
		color: black;
	}
`

const ImgC = styled.img `
	width: 30px;
	height: 40px;
`

const FooterWarningC = styled.div `
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2vw 22vw;
	font-weight: 600;
	> img {
		margin-right: 10px;
	}
`


export default Footer;
