import React, {useState} from 'react'
import styled from 'styled-components';
import BadgeList from './BadgeList';


function CheckBadge({checkSameId, userId}) {
	const [checkBadge, setCheckBadge] = useState(false);

	const onClick = () => {
		setCheckBadge(!checkBadge);
	}

	console.log(checkSameId(), "checkId");
	console.log(userId, "userId");
	if (!checkSameId())
		return (null);
	return (
		<div>
			<CheckBadgeC onClick={onClick}>Check Badges</CheckBadgeC>
			{
				checkBadge ? <BadgeList onClick={onClick} userId={userId}/> : null
			}
		</div>
	)
}

const	CheckBadgeC = styled.button`
  	width: 280px;
	height: 45px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 15px;
	cursor: pointer;
  	span {
		font-weight: 600;
		font-size: 15px;
		color: rgb(76, 76, 76);
	}
`

export default CheckBadge
