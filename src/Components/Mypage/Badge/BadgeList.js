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
	width: 400px;
	height: 500px;
	padding: 10px;
	position: absolute;
	left: 300px;
	background-color: rgb(253, 253, 253);
	display: flex;
	justify-content: space-between;
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	> div {
		width: 80px;
		height: 80px;
		margin: 5px;
		border-radius: 5px;
		border: 1px solid rgba(0, 0, 0, 0.5);
		background-color: blue;
	}
`

export default BadgeList
