import React from 'react'
import styled from 'styled-components'

function BadgeList(props) {

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
			<div>
				<button>선택</button>
				<button onClick={props.onClick}>취소</button>
			</div>
		</BadgeListC>
	)
}

const BadgeListC = styled.div`

`

export default BadgeList
