import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import useAsync from '../useAsync';
import Title from 'antd/lib/skeleton/Title';

async function getTitleAdmin(userId)
{
	const response = await axios.get(
		`http://api.4m2d.site/api/titles/manage/${userId}`
	);
	return response.data;
}

function BadgeList({CancelButton, userId}) {
	const [titleAdmin] = useAsync(() => getTitleAdmin(userId), [userId]);
	const {loading, data: titles, error} = titleAdmin;
	const onClick = (e) => {
		console.log(e, "event");
	}

	if (!titleAdmin) return null;
	if (!titles) return null;
	if (loading) return null;
	return (
		<BadgeListC>
			<BadgeListColumnC>
				{
					titles.map((title) => {
						console.log(title, "title");
						return (
							<BadgeC onClick={onClick} >
							</BadgeC>
						)
					})
				}
			</BadgeListColumnC>
		</BadgeListC>
	)
}

const BadgeListC = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	background-color: rgba(0, 0, 0, 0.6);
`

const BadgeListColumnC = styled.div`
	width: 70%;
	height: 70%;
	background-color: --BackColor;
`

const BadgeC = styled.div`

`

export default BadgeList
