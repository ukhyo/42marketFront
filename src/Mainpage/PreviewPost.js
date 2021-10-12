import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

function PreviewPost() {
	return (
		<PostViewC>
			<h3>인기게시글</h3>
			<div class="post_view_line">
				<div class="post_item"><img src="img/cloth1.jfif" /></div>
				<div class="post_item"><img src="img/cloth2.jfif" /></div>
				<div class="post_item"><img src="img/cloth3.jfif" /></div>
				<div class="post_item"><img src="img/cloth4.jfif" /></div>
				<div class="post_item"><img src="img/cloth5.jfif" /></div>
			</div>
			<div class="post_view_line">
				<div class="post_item"><img src="img/cloth2.jfif" /></div>
				<div class="post_item"><img src="img/cloth3.jfif" /></div>
				<div class="post_item"><img src="img/cloth1.jfif" /></div>
				<div class="post_item"><img src="img/cloth5.jfif" /></div>
				<div class="post_item"><img src="img/cloth4.jfif" /></div>
			</div>
			<h3>전체게시글</h3>
			<div class="post_view_line">
				<div class="post_item"><img src="img/book2.jfif" /></div>
				<div class="post_item"><img src="img/it3.jfif" /></div>
				<div class="post_item"><img src="img/book3.jfif" /></div>
				<div class="post_item"><img src="img/it5.jfif" /></div>
				<div class="post_item"><img src="img/book1.jfif" /></div>
			</div>
			<div class="post_view_line">
				<div class="post_item"><img src="img/book4.jfif"/></div>
				<div class="post_item"><img src="img/it4.jfif" /></div>
				<div class="post_item"><img src="img/it1.jfif"/></div>
				<div class="post_item"><img src="img/cloth5.jfif" /></div>
				<div class="post_item"><img src="img/cloth4.jfif" /></div>
			</div>
		</PostViewC>
	);
}

const PostViewC = styled.div`
	width: 1000px;
	margin: 0px auto;
`;

export default PreviewPost;
