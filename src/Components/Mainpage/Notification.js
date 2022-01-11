import React, {useState} from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { setSocket } from '../../modules/Socket';

function Notification() {
	const [isActive, setIsActive] = useState(false);
	const stompClient = useSelector((state) => state.Socket.stompClient);
	const dispatch = useDispatch();

	const onClick = () => {
		let socket = new SockJS("/4m2d");
		let stompClient = Stomp.over(socket);
		stompClient.debug= () => {};
		dispatch(setSocket(socket, stompClient));
		stompClient.connect({}, ()=>{
			stompClient.subscribe(`/sub/all`, (data) => {
				console.log(data);
			})
		});
		console.log("connect try");
		setIsActive(isActive);
	}

	return (
		<div>
			<NotiButtonC onClick={onClick}>알림</NotiButtonC>

		</div>
	)
}

const NotiButtonC = styled.button `
`;

export default Notification
