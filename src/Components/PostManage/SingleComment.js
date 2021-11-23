import React, {useState}from "react";
import axios from "axios";
import styled from "styled-components";
import "antd/dist/antd.css"
import { Comment, Avatar, Button, Input} from 'antd';

const { TextArea } = Input;

export default function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");
    const onClickReply = () => {
        setOpenReply(!OpenReply);
    }

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.CommentValue);
    }

    const actions = [
        <span onClick={onClickReply} key="comment-basic-reply-to">Reply to</span>
    ]
    const onSubmit = (event) => {
        event.preventDefault();
        const headers = {
			"Authorization": `Bearer ${token}`,
			"withCreadentials": true,
			"Access-Control-Allow-Origin": "http://api.4m2d.shop"
		};
		const variables = {
			userId: props.userId,
			postId: props.postId,
			content: CommentValue
		};
		axios.post('http://api.4m2d.shop/api/comments/', variables, {headers}).then((response) => {
			console.log('댓글 올리기 성공');
			console.log(response.data, 'response');
			props.refreshFunction(variables);
		}).catch(err => {
			console.log("댓글 올리기 실패");
		});
	}
    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.userIntraId}
                avatar={<Avatar src='#' alt />}
                content={ <p>{props.comment.content}</p> }
            />
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <InputCommentC
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="코멘트를 작성해 주세요"
                    />
                    <br />
                    <SubmitButtonC onClick={onSubmit}>
                        댓글
                    </SubmitButtonC>
                    {/* textarea에 글자 들어왔을 때 버튼색 파란색으로 바꾸고 싶다 */}
                </form>
            }
        </div>
    )

}

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
	color: rgb(150, 150, 150);
	background-color: rgb(236, 236, 236);
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 13px;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
`;
