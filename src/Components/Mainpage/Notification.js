import React, {useState, useRef} from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import SockJS from 'sockjs-client';
import SockJsClient from 'react-stomp';
import * as StompJs from '@stomp/stompjs';
import Stomp from 'stompjs';
import { setSocket } from '../../modules/Socket';

function Notification() {
	const [isActive, setIsActive] = useState(false);
	const stompClient = useSelector((state) => state.Socket.stompClient);
	const dispatch = useDispatch();

	const onClick = () => {
		var sock = new SockJS('/api/ws');
		let stompClient = Stomp.over(sock);

		sock.onopen = function() {
		console.log('open');
		}
		stompClient.connect({}, function (frame) {
		console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/public', function (greeting) {
			console.log(greeting);
			//you can execute any function here
		});
	});
		// var socket = new SockJS('/api/ws');
		// let stompClient = Stomp.over(socket);
		// stompClient.debug= () => {};
		// dispatch(setSocket(socket, stompClient));
		// stompClient.connect({}, ()=>{
		// 	stompClient.subscribe(`/sub/all`, (data) => {
		// 		console.log(data);
		// 	})
		// });
		console.log("connect try");
		setIsActive(isActive);
	}

	return (
		<div>
			<NotiButtonC onClick={onClick}>알림</NotiButtonC>
		</div>
	)
}

export default Notification
const NotiButtonC = styled.button `
`
