import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Introduce3 from '../img/introduce/no3.png'
import Introduce2 from '../img/introduce/no2.png'
import Introduce1 from '../img/introduce/no1.png'

function Intro(props) {
	return (
		<div>
			<Header />
			<IntroC>
				<img src={Introduce1}></img>
			</IntroC>
		</div>
	)
}

const IntroC = styled.div`
	text-align: center;
`


export default Intro
