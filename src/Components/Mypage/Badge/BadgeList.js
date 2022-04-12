import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import useAsync from '../useAsync';
import Yosemite from './Yosemite';

async function getTitleAdmin(userId)
{
	const response = await axios.get(
		`http://api.4m2d.site/api/titles/manage/${userId}`
	);
	return response.data;
}

function BadgeList({changeBadgeState, userId}) {
	const [titleAdmin] = useAsync(() => getTitleAdmin(userId), [userId]);
	const {loading, data: titles, error} = titleAdmin;
	const onClick = (e) => {
		console.log(e, "event");
	}

	const onClickCancelButton = changeBadgeState;
	if (!titleAdmin) return null;
	if (!titles) return null;
	if (loading) return null;
	return (
		<div>
			<BadgeListColumnC>
			<Yosemite onClickCancelButton={onClickCancelButton}/>
				{
					titles.map((title) => {
						console.log(title, "title");
						return (
							<BadgeC>
							</BadgeC>
						)
					})
				}
			</BadgeListColumnC>
		</div>
	)
}

const BadgeListColumnC = styled.div`
	width: 35vw;
	height: 50vh;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	box-shadow: 10px 5px 5px 5px gray;
	top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
	background-color: rgb(248, 248, 248);
	z-index: 10;
`

const BadgeC = styled.div`
	width: 95%;
	height: 20%;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`

export default BadgeList
