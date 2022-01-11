import React, {useState} from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { setSocket } from '../../modules/Socket';

function Notification() {
	const [isActive, setIsActive] = useState(false);
	const stompClient = useSelector((state) => state.Socket.stompClient);
	const dispatch = useDispatch();

	const onClick = () => {
		const client = new StompJs.Client({
			brokerURL: 'ws://www.4m2d.shop/4m2d',
			connectHeaders: {
			  login: 'user',
			  passcode: 'password',
			},
			debug: function (str) {
			  console.log(str);
			},
			reconnectDelay: 5000, //자동 재 연결
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			});
			client.onConnect = function (frame) {
				console.log("connected");
			};
		
		client.onStompError = function (frame) {
		  console.log('Broker reported error: ' + frame.headers['message']);
		  console.log('Additional details: ' + frame.body);
		};
		client.activate();
		//var socket = new SockJS('/4m2d', null, {transports: ["websocket", "xhr-streaming", "xhr-polling"]});
		// let stompClient = Stomp.over(socket);
		// stompClient.debug= () => {};
		// dispatch(setSocket(socket, stompClient));
		// stompClient.connect({}, ()=>{
		// 	stompClient.subscribe(`/sub/all`, (data) => {
		// 		console.log(data);
		// 	})
		// });
		// console.log("connect try");
		// setIsActive(isActive);
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
