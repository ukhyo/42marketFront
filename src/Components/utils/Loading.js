import React from 'react'
import styled from 'styled-components'

function Loading() {
	return (
		<LoadingC>
			Loading...
		</LoadingC>
	)
}

const LoadingC = styled.div `
	cursor: wait;
`

export default Loading
