import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import styled from 'styled-components';
import { propTypes } from 'react-bootstrap/esm/Image';

export default function Comments(props) {

	const $websocket = useRef (null);
	const [commentValue, setcommentValue] = useState('');
	const user = useSelector((state) => state.user);
	const handleChange = (event) => {
		setcommentValue(event.currentTarget.value);
 	};
	const sendMessage = (msg) => {
		$websocket.current.sendMessage(`/alarm/${props.userId}`, msg);
	};
	const onSubmit = (event) => {
		event.preventDefault();
		if (commentValue === '')
		{
			alert("댓글을 입력해주세요.")
				return;
		}
		if (props.userId === '0')
		{
			alert("로그인을 해주세요.")
				return;
		}
		const headers = {
			"Authorization": `Bearer ${props.token}`,
			"withCreadentials": true,
			"Access-Control-Allow-Origin": "http://api.4m2d.shop"
		};
		const variables = {
			userId: props.userId,
			postId: props.postId,
			content: commentValue
		};
	  axios.post('http://api.4m2d.shop/api/comments/', variables, { headers }).then((response) => {
		  sendMessage(variables);
		  setcommentValue("");
		  props.refreshFunction(variables);
		});
	}
	return (
    <div>
		<br />
	  <CommentHeaderC>
		<p>댓글</p>
	  </CommentHeaderC>
	<form style={{ display: 'flex' }} onSubmit={onSubmit}>
		<InputCommentC
			cols="30" rows="10"
			onChange={handleChange}
			value={commentValue}
			placeholder="코멘트를 작성해 주세요"
		/>
		<br />
			  <SubmitButtonC flag={commentValue.length >= 1} onClick={onSubmit}>
			댓글
		</SubmitButtonC>
	</form>
    {/* Comment Lists */}
	{
		props.commentsList && ( props.commentsList.map((comment, index) => (
			<SingleComment comment={comment}
						token={props.token}
						postId={props.postId}
						userId={props.userId}
						refreshFunction={props.refreshFunction}
						key={index}
						></SingleComment>
		)))
	}
    {/* Root Comment Form */}
    </div>
  );
}

const CommentHeaderC = styled.div`
	margin-bottom: 30px;
	padding: 20px 0px;
	border-bottom: 1px solid rgb(238, 238, 238);
`;

const InputCommentC = styled.textarea`
	width: 90%;
	height: 52px;
	border-radius: 5px;
	outline: none;
	border: 1px solid rgba(0, 0, 0, 0.1);
`;

const SubmitButtonC = styled.button`
	width: 6%;
	height: 56px;
	margin-left: 20px;
	color: ${(props) => props.flag ? "white" : "rgb(150, 150, 150)"};
	background-color: ${(props) => props.flag ? "rgb(130,130, 230)" : "rgb(236,236,236)"};
	/*background-color: rgb(236, 236, 236);*/
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 13px;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
`;
