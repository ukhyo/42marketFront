import styled from "styled-components";

function Footer() {
	return (
		<FooterLineC>
			Copyright Line
		</FooterLineC>
	);
}

const FooterLineC = styled.div`
	border-top: 1px solid #c0c0c0;
	width: 90%;
	height: 20%;
	margin-top: 30px;
	text-align: center;
	color: #a8a8a8;
`;

export default Footer;
