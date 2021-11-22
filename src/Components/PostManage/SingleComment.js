import React, {useState}from "react";
import axios from "axios";
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
			//"Authorization": `Bearer ${token}`,
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
	console.log(props.comment.userIntraId, "아이디");
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
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="코멘트를 작성해 주세요"
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
                    Submit
                    </button>
                </form>
            }
        </div>
    )

}
