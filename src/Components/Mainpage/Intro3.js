import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Introduce3 from '../img/introduce/no3.png'

function Intro1(props) {
	return (
		<div>
			<Header />
			<IntroC>
				<img src={Introduce3}></img>
			</IntroC>
		</div>
	)
}

const IntroC = styled.div`
	text-align: center;
`


export default Intro1