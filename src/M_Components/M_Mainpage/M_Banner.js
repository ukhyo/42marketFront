import React, { useState, useEffect } from "react";
import styled from "styled-components";
import image1 from "../img/M_Banner1.png";
import image2 from "../img/M_Banner2.png";
import image3 from "../img/M_Banner3.png";
import theme from "../../Styles/theme";
function M_Banner() {
	const [idx, setIdx] = useState(0);
	const images = [image1, image2, image3];
	setTimeout(() => {
		let temp = idx;
		if (temp >= 2)
			temp = -1;
		setIdx(temp + 1);
	}, 5000)
	return (
		<MainC>
			<ImagesC theme={theme}>
				<DivC theme={theme}>
					<ImageC theme={theme} url={images[idx]} />
				</DivC>
			</ImagesC>
		</MainC>
	);
}

const DivC = styled.div`
	width: ${({theme}) => theme.widthSize.full};
	height: ${({theme}) => theme.heightSize.banner};
`;

const ImageC = styled.div`
	margin: 0 auto;
	width: ${({theme}) => theme.widthSize.margin};
	height: ${({theme}) => theme.heightSize.banner};
	background-image: url("${(props) => props.url}");
	transition: background-image 1s ease-out;
	background-position: center;
	background-size: cover;
`;

const ImagesC = styled.div`
	display:flex;
	margin : 0 auto;
	width: ${({ theme }) => theme.widthSize.full};
	height: ${({ theme }) => theme.heightSize.banner};
	overflow: hidden;
	> div {
		width: ${({ theme }) => theme.widthSize.full};
		height: ${({ theme }) => theme.heightSize.banner};

		/*transition: 1s ease-in-out;*/
	}
`;

const MainC = styled.main`
	display: flex;
	/*overflow: hidden;*/
	margin: 0 auto;
	margin-top: 20px;
	width: 100%;
	max-width: 400px;
`;




export default M_Banner;
