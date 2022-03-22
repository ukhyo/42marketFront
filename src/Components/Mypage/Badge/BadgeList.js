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
	padding: 10px;
`

const BadgeC = styled.div`
	width: 80px;
	height: 80px;
	border-radius: 30px;
	background-color: gray;
`



export default BadgeList
