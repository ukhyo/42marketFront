import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import { propTypes } from 'react-bootstrap/esm/Image';

export default function Comments(props) {

  const [commentValue, setcommentValue] = useState('');
  const user = useSelector((state) => state.user);
  const handleChange = (event) => {
    setcommentValue(event.currentTarget.value);
  };
  const onsubmit = (event) => {
		event.preventDefault();

		const headers = {
			//"Authorization": `Bearer ${token}`,
			"withCreadentials": true,
			"Access-Control-Allow-Origin": "http://api.4m2d.shop"
		};
		const variables = {
			userId: props.userId,
			postId: props.postId,
			content: commentValue,
		};
		axios.post('http://api.4m2d.shop/api/comments/', variables, {headers}).then((response) => {
			console.log('댓글 올리기 성공');
			console.log(response, 'response'); //response. data안들어옴
			props.refreshFunction(variables);
		}).catch(err => {
			console.log("댓글 올리기 실패");
		});
	}
  return (
    <div>
      <br />
      <p>댓글</p>
      <hr />

	{console.log(props.commentsList)}
    {/* Comment Lists */}
	{
		props.commentsList && ( props.commentsList.map((comment, index) => (
		<SingleComment comment={comment}
						postId={props.postId}
						userId={props.userId}
						refreshFunction={props.refreshFunction}
						key={index}
						></SingleComment>
		)))
	}
    {/* Root Comment Form */}

      <form style={{ display: 'flex' }} onSubmit={onsubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onsubmit}>

          Submit
        </button>
      </form>
    </div>
  );
}
