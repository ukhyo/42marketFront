import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useAsync from '../useAsync';
import CheckBadge from "./CheckBadge";
import BadgeList from './BadgeList';

async function getBadge(userId)
{
	const response = await axios.get(
		`http://api.4m2d.site/api/titles/${userId}`
	);
	return response.data;
}

function Badge({profile, userId, checkSameId}) {
	const [badges] = useAsync(() => getBadge(profile.id), [profile.id]);
	const {loading, data : badgeList, error} = badges;
	if (loading) return null;
	if (error) return null;
	if (!badgeList) return null;
	return (
		<BadgeC>
			<BadgeHeaderC>
				<span>칭호</span>
			</BadgeHeaderC>
			<BadgeListC>
				{
					badgeList.map((badge) => {
						{console.log(badge, "badge")}
						<li key={badge.name}>
							<img src={badge.img} />
							<span>{badge.name}</span>
						</li>
					})
				}
			</BadgeListC>
			<CheckBadge checkSameId={checkSameId} userId={userId}></CheckBadge>
		</BadgeC>
    )
}

const BadgeListC = styled.ul`
`

const	BadgeHeaderC = styled.div`
	margin: 20px 0px;
	color: rgb(0, 0, 0, 0.8);
`

const	BadgeC = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
`

export default Badge;