import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useAsync from './useAsync';

async function getBadge(userId)
{
	const response = await axios.get(
		`http://api.4m2d.shop/api/titles/${Number(userId)}`
	);
	return response.data;
}

function Badge({profile}) {
	const [state] = useAsync(() => getBadge(profile.id), [profile.id]);
	const [CheckBadge, setCheckBadge] = useState(false);
	const { loading, data: badges, error }  = state;

	if (loading) return <div>Loading</div>;
	if (error) return <div>Error occured</div>
	if (!badges) return null;
	return (
		<BadgeC>
			<span>칭호</span>
			{
				badges.map((badge, index) => {
					return (<ShowBadgeC>
						<img src={badge.image} />
					</ShowBadgeC>); 
				})
			}
			<CheckBadgeC>Check Badges</CheckBadgeC>
		</BadgeC>
    )
}

const	BadgeC = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const	ShowBadgeC = styled.div`
	> img {
		width: 50px;
		height: 50px;
	}
`;
const	CheckBadgeC = styled.button`

`;

export default Badge;
