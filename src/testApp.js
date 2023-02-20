import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import "./app.css";
import { Row, Col, Button, Input, Alert } from "reactstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from 'react-responsive'
import Slider from "react-slick";
import { Cookies } from "react-cookie";
import SockJS from "sockjs-client";
import Stomp from "react-stomp";

var stompClient = null;

//소켓 연결되면 index에 있는 대화창 보여줌

function sendName() {
	//stompClient.send("/pub/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

// 항상 비동기?로 대기중인 함수. 버튼 클릭이 일어나면 바로 js 함수들 실행시킴
//$(function () {
//    $("form").on('submit', function (e) {
//        e.preventDefault();
//    });
//    $( "#connect" ).click(function() { connect(); });
//    $( "#disconnect" ).click(function() { disconnect(); });
//    $( "#send" ).click(function() { sendName(); });
//    $( "#chatSend" ).click(function(){ sendChat(); });
//});

const App = () => {
	const [name, setName] = useState("");
	const [content, setContent] = useState("");
	const [show, setShow] = useState([]);

	// 연결되면 세팅해주는곳
	function setConnected(connected) {

	}

	// 소켓 connect. 여기선 index에서 connect 버튼 누를 시 수동으로 연결됨. 우리는 아마 로그인 처리 이뤄지면 커넥트하는 방식으로?
	function connect() {
		var socket = new SockJS('/gs-guide-websocket');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function (frame) {
			console.log('Connected: ' + frame);
			// /sub/chat을 구독하기 시작함. 이후 여기에 메세지 보내면 /sub/chat을 구독한 모든 사람들에게 보임
			// 우리는 /sub/{userId}로 구독하고, 댓글달면 해당 유저 id로 메세지 보내는 방식
			stompClient.subscribe('/sub/chat', function (chat) {
				showChat(JSON.parse(chat.body));
			});
		});
	}

	function disconnect() {
		if (stompClient !== null) {
			stompClient.disconnect();
		}
		setConnected(false);
		console.log("Disconnected");
	}

	function sendChat() {
		const data = [
			{
				name: name,
				content: content,
			}
		];
		stompClient.send("/pub/chat", {}, data);
	}
	// 채팅 보내면 여기서 비동기적으로 계속 받아오는 것 같음
	// 문제는 우리가 반환하는걸 너희가 여기서 어떻게 처리하는지 좀 헷갈림
	// 기존 데이터 교환시, 우리는 dto로 반환하면 json으로 알아서 매핑 돼서 너희가 받아오는데
	// example에선 여기서 계속 받은 채팅 갱신하는듯?
	function showChat(chat) {
		let data = {
			name: chat.name,
			conntet: chat.message,
		}

		//let data = {
		//	name: name,
		//	content: content,
		//}
		setName("");
		setContent("");
		setShow(show => [...show, data]);
	}
	console.log(show, "쇼는?");
	return (
		<DivC>

			<div>
				<button onClick={connect}>
					수동연결
				</button>
			</div>
			<div>
				<input type="text" value={name} onChange={(e) => {
					setName(e.target.value);
				}} />
				이름.
			</div>
			<div>
				<input type="text" value={content} onChange={(e) => {
					setContent(e.target.value);
				}} />
				내용
			</div>
			<div>
				<button onClick={sendChat}> 백으로보내보기 </button>
				<button onClick={showChat}> 이건테스트용</button>
			</div>
			{console.log(show.length, "길이")}
			{show.length > 0 ?
				show.map((data, index) => {
					return (
						<div>
							Name : {data.name}
							<div>Message:{data.content}</div>
						</div>
					)
				})
				:
			<div>기다려주세요</div>
			}
		</DivC>
	);
}

const DivC = styled.div`
	> div {
		margin-top: 20px;
		margin-left: 20px;
	}
`;

const TestC = styled.div`
	color: red;
	@media screen and (max-width: 720px) {
		color :blue;
	}
`;

export default App;
