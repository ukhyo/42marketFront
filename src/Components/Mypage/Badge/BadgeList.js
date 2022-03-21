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
			<div></div>
		</BadgeListC>
	)
}

const BadgeListC = styled.div`
	width: 800px;
	height: 900px;
	padding: 10px;
	position: absolute;
	top: 400px;
	left: 500px;
	background-color: rgb(253, 253, 253);
	display: flex;
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	justify-content: space-between;
	align-content: space-between;
	flex-wrap: wrap;
	> div {
		cursor: pointer;
		width: 100px;
		height: 100px;
		margin: 5px;
		border-radius: 50px;
		border: 1px solid rgba(0, 0, 0, 0.5);
		background-color: gray;
		z-index: 10;
	}
`

export default BadgeList
