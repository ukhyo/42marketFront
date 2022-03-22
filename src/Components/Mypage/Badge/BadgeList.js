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
			<div>
				<button>선택</button>
				<button onClick={props.onClick}>취소</button>
			</div>
		</BadgeListC>
	)
}

const BadgeListC = styled.div`
	width: 100%;
	display: flex;
	padding: 10px;
`

const BadgeC = styled.div`
	width: 80px;
	height: 80px;
	border-radius: 30px;
	color: gray;
`



export default BadgeList
