import React from 'react'
import styled from 'styled-components'

function BadgeList(props) {

	return (
		<BadgeListC>
			<BadgeC></BadgeC>
			<BadgeC></BadgeC>
			<BadgeC></BadgeC>
			<BadgeC></BadgeC>
			<BadgeC></BadgeC>
			<BadgeC></BadgeC>
			<BadgeC></BadgeC>
			<BadgeC></BadgeC>
			<BadgeC></BadgeC>
			<BadgeC></BadgeC>
			<BadgeC></BadgeC>
			<BadgeC></BadgeC>
		</BadgeListC>
	)
}

const BadgeListC = styled.div`
	width: 100%;
	height: 500px;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-direction: auto;
	flex-wrap: wrap;
	padding: 10px;
`

const BadgeC = styled.div`
	margin: 10px;
	width: 70px;
	height: 70px;
	border-radius: 50px;
	background-color: gray;
`



export default BadgeList
