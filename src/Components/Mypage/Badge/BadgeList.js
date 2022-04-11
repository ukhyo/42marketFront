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
							<BadgeC onClick={onClick} >
							</BadgeC>
						)
					})
				}
			</BadgeListColumnC>
		</div>
	)
}

const BadgeListColumnC = styled.div`
	width: 50vw;
	height: 50vh;
	position: fixed;
	box-shadow: 5px 5px 5px 5px gray;
	top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
	background-color: --BackColor;
	opacity: 1;
	z-index: 10;
`

const BadgeC = styled.div`

`

export default BadgeList
