import React from "react";
import axios from "axios";

function PostDelete(e, id) {
	const deletePost = async () => {
		const res = await axios.delete(`http://localhost:3001/posts/${id}`)
			.then(res => {
				alert("상품 상태가 변경되었습니다.");
			})
			.catch(err => {
				console.log("상품 상태변경이 실패하였습니다.")
			});
	}
	if (window.confirm("해당 상품을 삭제하시겠습니까?") === true)
		deletePost();
	else
		return;
}

export default PostDelete;
