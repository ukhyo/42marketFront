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

function Badge(profile) {
	const [state] = useAsync(() => getBadge(profile.id), [profile.id]);
	const [CheckBadge, setCheckBadge] = useState(false);
	const { loading, data: badges, error }  = state;

	const onClick = () => {
		setCheckBadge(!CheckBadge);
	}

	if (loading) return <div>Loading</div>;
	if (error) return <div>Error occured</div>
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
				CheckBadge ? <BadgeList /> : null
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

const	ShowBadgeC = styled.div`
	> img {
		width: 50px;
		height: 50px;
	}
`
const	CheckBadgeC = styled.button`
  	width: 270px;
  	margin: 20px 5px;
	background-color: red;
  	span {
	  opacity: 0.7;
	  font-size: 15px;
      font-family: "Devanagari Sangam MN";
	}

`

export default Badge;