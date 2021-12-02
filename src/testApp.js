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


var stompClient = null;

//소켓 연결되면 index에 있는 대화창 보여줌
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

// 소켓 connect. 여기선 index에서 connect 버튼 누를 시 수동으로 연결됨. 우리는 아마 로그인 처리 이뤄지면 커넥트하는 방식으로?
function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
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
    stompClient.send("/pub/chat", {}, JSON.stringify({'name': $("#name").val(), 'message': $("#chatMessage").val()}));
}
// 채팅 보내면 여기서 비동기적으로 계속 받아오는 것 같음
// 문제는 우리가 반환하는걸 너희가 여기서 어떻게 처리하는지 좀 헷갈림
// 기존 데이터 교환시, 우리는 dto로 반환하면 json으로 알아서 매핑 돼서 너희가 받아오는데
// example에선 여기서 계속 받은 채팅 갱신하는듯?
function showChat(chat) {
    $("#greetings").append("<tr><td>" + chat.name + " : " + chat.message + "</td></tr>");
}

function sendName() {
    stompClient.send("/pub/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}
// 항상 비동기?로 대기중인 함수. 버튼 클릭이 일어나면 바로 js 함수들 실행시킴
$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
    $( "#chatSend" ).click(function(){ sendChat(); });
});

const App = () => {
	let cookie = new Cookies();
	cookie.set("view", "/21/");
	let test = cookie.getAll();
	cookie.remove("view");
	cookie.set("view", "/21//22/");
	test = cookie.getAll();
	const DesktopOrLaptop = useMediaQuery(
		{ minDeviceWidth: 1200 },
	)
	const zzzz = "abcd123?=12345";
	let t = zzzz.slice(zzzz.indexOf("?") - 1, zzzz.indexOf("?"));
	console.log(t, "체크");
	return (
		<TestC>
			{DesktopOrLaptop ?
				<div>안녕하세요</div> :
			<TestC>반갑습니다.</TestC>}

		</TestC>
	);
}


const TestC = styled.div`
	color: red;
	@media screen and (max-width: 720px) {
		color :blue;
	}
`;

export default App;
