import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Introduce from '../img/Intro.png'

function Intro() {
	return (
		<div>
			<Header />
			<IntroC>
				<img src={Introduce}></img>
			</IntroC>
		</div>
	)
}

const IntroC = styled.div`
	text-align: center;
`


export default Intro
