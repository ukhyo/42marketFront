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
		<div>
			<BadgeListColumnC>
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
	position: fixed;
	box-shadow: 10px 5px 5px 5px gray;
	top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
	background-color: rgb(248, 248, 248);
	z-index: 10;
`

const BadgeC = styled.div`
	height: 20%;
	border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`

export default BadgeList
