import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Badge1 from "../../img/badge1.png";
import Badge2 from "../../img/badge2.png";
import Badge3 from "../../img/badge3.png";
import useAsync from '../useAsync';
import BadgeList from './BadgeList';
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

function Badge({profile, token, userId, checkSameId}) {
	const [badges] = useAsync(() => getBadge(profile.id), [profile.id]);
	const {loading, data : badge, error} = badges;


	useEffect (() => {
		console.log(badges, "badges");
	}, [badges]);
	if (loading) return null;
	if (error) return null;
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
			<CheckBadge checkSameId={checkSameId}></CheckBadge>
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