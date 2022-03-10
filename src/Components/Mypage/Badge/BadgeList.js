import React from 'react'
import styled from 'styled-components'

function BadgeList() {
	return (
		<BadgeListC>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</BadgeListC>
	)
}

const BadgeListC = styled.div`
	width: 200px;
	height: 500px;
	padding: 10px;
	
	position: absolute;
	background-color: green;

	border: 1px solid rgba(0, 0, 0, 0.2);
	> div {
		width: 40px;
		height: 40px;
		background-color: blue;
	}
`

export default BadgeList
