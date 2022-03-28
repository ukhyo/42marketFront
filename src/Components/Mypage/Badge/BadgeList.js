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
	margin-top: 20px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 20px;
	width: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-direction: auto;
	flex-wrap: wrap;
	padding: 10px;
`

const BadgeC = styled.div`
	margin: 10px 5px;
	width: 70px;
	height: 70px;
	border-radius: 50px;
	cursor: pointer;
	background-color: gray;
`

export default BadgeList
