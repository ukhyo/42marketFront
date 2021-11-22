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
	width: 100%;
	height: 140px;
	text-align: center;
	line-height: 140px;
	color: #a8a8a8;
`;

export default Footer;
