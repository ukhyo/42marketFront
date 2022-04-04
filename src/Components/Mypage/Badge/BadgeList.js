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

function BadgeList({onClick, userId}) {
	const [titleAdmin] = useAsync(() => getTitleAdmin(userId), [userId]);

	
	useEffect(() => {
		console.log(titleAdmin, "title admin");
	}, [titleAdmin]);
	if (!titleAdmin) return null;
	return (
		<div>
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
			<BadgeButtonC onClick={onClick}>취소</BadgeButtonC>
		</div>
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

const BadgeButtonC = styled.div `
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

const BadgeC = styled.div`
	margin: 10px 5px;
	width: 70px;
	height: 70px;
	border-radius: 50px;
	cursor: pointer;
	background-color: gray;
`

export default BadgeList
