import React, {useState} from 'react'
import styled from 'styled-components';

function Notification() {
	const [isActive, setIsActive] = useState(false);
	const onClick = () => {
		setIsActive(isActive);
	}

	return (
		<div>
			<NotiButtonC onClick={onClick}>알림</NotiButtonC>

		</div>
	)
}

const NotiButtonC = styled.button `
	display: none;
`

export default Notification
