import React from 'react'
import styled from 'styled-components'
import useAsync from '../useAsync';

function BadgeList({onClick, userId}) {


	
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
	margin: 5px;
	width: 70px;
	height: 70px;
	border-radius: 50px;
	cursor: pointer;
	background-color: gray;
`



export default BadgeList
