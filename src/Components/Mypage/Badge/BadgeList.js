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
	width: 300px;
	height: 400px;
	padding: 10px;
	position: absolute;
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
		width: 60px;
		height: 60px;
		margin: 5px;
		border-radius: 5px;
		border: 1px solid rgba(0, 0, 0, 0.5);
		background-color: blue;
	}
`

export default BadgeList
