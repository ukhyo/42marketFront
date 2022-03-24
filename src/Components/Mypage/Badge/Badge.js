import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Badge1 from "../../img/badge1.png";
import Badge2 from "../../img/badge2.png";
import Badge3 from "../../img/badge3.png";
import useAsync from '../useAsync';
import BadgeList from './BadgeList';

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
}

function Badge({profile, token, userId}) {
	const [badges] = useAsync(() => getBadge(profile.id), [profile.id]);
	const [badgeAdmin] = useAsync(() => getTitleAdmin(profile.id), [profile.id]);
	const [CheckBadge, setCheckBadge] = useState(false);

	const onClick = () => {
		setCheckBadge(!CheckBadge);
		const headers = {
			"Authorization": `Bearer ${token}`,
		};
		const variables = {
			userId: userId,
			name: "newbie",
			image: {Badge1}
		};
		axios.post(`http://api.4m2d.site/api/mail/${userId}`, variables, { headers })
		.then(() => {
			console.log("badge get success");
		})
	}	

	console.log(badges, "badges");
	console.log(badgeAdmin, "badgeAdmin");
	if (!badges) return null;
	return (
		<BadgeC>
			<BadgeHeaderC>
				<span>칭호</span>
			</BadgeHeaderC>
			<BadgesC>
				<img src={Badge1}/>
				<img src={Badge2}/>
				<img src={Badge3}/>
			</BadgesC>
			<CheckBadgeC onClick={onClick}>Check Badges</CheckBadgeC>
			{
				CheckBadge ? <BadgeList onClick={onClick}/> : null
			}
		</BadgeC>
    )
}

const	BadgesC = styled.div`
	display: flex;
	justify-content: start;
	position: relative;
	margin-bottom: 15px;
	> img {
		margin-right: 5px;
		width: 30px;
		height: 30px;
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

export default Badge;