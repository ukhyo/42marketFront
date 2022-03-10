import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Coming_soon from "../../Images/coming_soon.jpeg";
import Badge1 from "../img/badge1.png";
import Badge2 from "../img/badge2.png";
import Badge3 from "../img/badge3.png";
import useAsync from './useAsync';

async function getBadge(userId)
{
	const response = await axios.get(
		`http://api.4m2d.site/api/titles/${userId}`
	);
	return response.data;
}

function Badge(profile) {
	const [state] = useAsync(() => getBadge(profile.id), [profile.id]);
	const [CheckBadge, setCheckBadge] = useState(false);
	const { loading, data: badges, error }  = state;

	if (loading) return <div>Loading</div>;
	if (error) return <div>Error occured</div>
	if (!badges) return null;
	return (
		<BadgeC>
			<BadgeHeaderC>
				<span>칭호</span>
			</BadgeHeaderC>
			<BadgesC>
				<img src="../img/baddge1.png"/>
				<img src="../img/baddge2.png"/>
				<img src="../img/baddge3.png"/>
			</BadgesC>
			<CheckBadgeC>Check Badges</CheckBadgeC>
		</BadgeC>
    )
}

const	BadgesC = styled.div`
	display: flex;
	justify-content: start;
	margin-right: 5px;
	> img {
		width: 30px;
		height: 30px;
	}
`

const	BadgeHeaderC = styled.div`
	margin: 20px 0px;
	color: rgb();
`

const	BadgeC = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
`

const	ShowBadgeC = styled.div`
	> img {
		width: 50px;
		height: 50px;
	}
`
const	CheckBadgeC = styled.button`
`

export default Badge;