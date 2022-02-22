import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './M_SingleComment';
import styled from 'styled-components';
import { propTypes } from 'react-bootstrap/esm/Image';

export default function Comments(props) {

  const [commentValue, setcommentValue] = useState('');
  const handleChange = (event) => {
    setcommentValue(event.currentTarget.value);
  };
  const onSubmit = (event) => {
		event.preventDefault();
		if (commentValue === '')
		{
			console.log("empty comment");
			alert("댓글을 입력해주세요.")
				return;
		}
		const headers = {
			"Authorization": `Bearer ${props.token}`,
			// "withCreadentials": true,
			"Access-Control-Allow-Origin": "http://api.4m2d.site"
		};
		const variables = {
			userId: props.userId,
			postId: props.postId,
			content: commentValue
		};
		axios.post('http://api.4m2d.site/api/comments/', variables, {headers}).then((response) => {
			console.log('댓글 올리기 성공');
			console.log(variables.commentValue, 'comment value') //response. data안들어옴
			setcommentValue("");
			props.refreshFunction(variables);
		}).catch(err => {
			console.log("댓글 올리기 실패");
		});
	}
  return (
    <div>
      <br />
	  <CommentHeaderC>
      	<p>댓글</p>
	  </CommentHeaderC>
	<CommentFormC onSubmit={onSubmit}>
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
	</CommentFormC>
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

const CommentFormC = styled.form`
	display: flex;
	flex-direction: column;
`;

const CommentHeaderC = styled.div`
	margin-bottom: 30px;
	padding: 20px 0px;
	border-bottom: 1px solid rgb(238, 238, 238);
`;

const InputCommentC = styled.textarea`
	width: 100%;
	height: 25px;
	border-radius: 5px;
	outline: none;
	border: 1px solid rgba(0, 0, 0, 0.1);
`;

const SubmitButtonC = styled.button`
	width: 18%;
	height: 36px;
	margin-left: calc(100% - 70px);
	color: ${(props) => props.flag ? "white" : "rgb(150, 150, 150)"};
	background-color: ${(props) => props.flag ? "rgb(130,130, 230)" : "rgb(236,236,236)"};
	/*background-color: rgb(236, 236, 236);*/
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 13px;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
`;
