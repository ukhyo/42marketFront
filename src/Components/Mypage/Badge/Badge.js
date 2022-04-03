import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useAsync from '../useAsync';
import CheckBadge from "./CheckBadge";

async function getBadge(userId)
{
	const response = await axios.get(
		`http://api.4m2d.site/api/titles/${userId}`
	);
	return response.data;
}

async function getTitleAdmin(userId)
{
	const response = await axios.get(
		`http://api.4m2d.site/titles/manage/${userId}`
	);
	return response.data;
}

function Badge({profile, userId, checkSameId}) {
	const [badges] = useAsync(() => getBadge(profile.id), [profile.id]);
	const {loading, data : badgeList, error} = badges;
	console.log(badgeList);
	
	if (loading) return null;
	if (error) return null;
	if (!badgeList) return null;
	return (
		<BadgeC>
			<BadgeHeaderC>
				<span>칭호</span>
			</BadgeHeaderC>
			<BadgesC>
				{badgeList.map((badge) => {
					console.log(badge)
					return <img key={badge.name} src={badge.image} />
				})}
			</BadgesC>
			<CheckBadge checkSameId={checkSameId} userId={userId}></CheckBadge>
		</BadgeC>
    )
}

const	BadgesC = styled.div`
	display: flex;
	justify-content: start;
	position: relative;
	border-radius: 1px solid rgba(0, 0, 0, 0.05);
	margin-bottom: 15px;
	> img {
		margin-right: 5px;
		width: 40px;
		border-radius: 20px;
	}
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