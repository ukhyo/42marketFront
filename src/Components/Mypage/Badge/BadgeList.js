import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import useAsync from '../useAsync';

async function getTitleAdmin(userId)
{
	const response = await axios.get(
		`http://api.4m2d.site/api/titles/manage/${userId}`
	);
	return response.data;
}

function BadgeList({onClick, userId, badgeList}) {
	const [titleAdmin] = useAsync(() => getTitleAdmin(userId), [userId]);

	useEffect(() => {
		console.log(titleAdmin, "title admin");
	}, [titleAdmin]);
	if (!titleAdmin) return null;
	return (
		<BadgeListC>
			<BadgeC />
		</BadgeListC>
	)
}

const BadgeListC = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	background-color: rgba(131, 131, 131, 0.7);
`

const BadgeC = styled.div`

`

export default BadgeList
