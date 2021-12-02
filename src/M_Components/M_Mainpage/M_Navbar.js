import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../../Styles/theme";
const M_Navbar = () => {
	let flag = 0;
	const url = window.location.href;
	console.log(url, "url");
	if ("http://localhost:3000/" === url || "http://4m2d.shop/" === url || "http://www.4m2d.shop/" === url)
		flag = 1;
	else if ("8" === window.location.href.slice(window.location.href.lastIndexOf("/") + 1, window.location.href.length))
		flag = 3
	else
		flag = 2
	return (
		<NaviBarC theme={theme}>
			<ItemC current={flag === 1}>
				<ListC current={flag === 1} to={"/"} >홈</ListC>
			</ItemC>
			<ItemC current={flag === 2}>
				<ListC current={flag === 2} to={"/category/0"} >상품</ListC>
			</ItemC>
			<ItemC current={flag === 3}>
				<ListC current={flag === 3} to={"/category/8"} >나눔</ListC>
			</ItemC>
		</NaviBarC>
	)
}

const NaviBarC = styled.ul `
	width: ${({theme}) => theme.widthSize.margin};
	margin: 0 auto;
	height: 60 px;
	display: flex;
	text-align: center;
	justify-content: center;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const		ItemC = styled.li`
	width: 100%;
	height: 50px;
	padding: 1rem;
	border-bottom: 2px solid
		${props => (props.current ? "rgb(99, 178, 225);" : "transparent")};
	transition: border-bottom 0.5s ease-in-out;
`;

const		ListC = styled(Link)`
	font-weight: 600;
	font-size: 1em;
	text-align: center;
	text-decoration-line: none;
	color : ${props => (props.current ? "rgb(99, 178, 225);" : "rgba(0, 0, 0, 0.2)")};

`;

export default M_Navbar;
