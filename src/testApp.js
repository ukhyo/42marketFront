import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import "./app.css";
import { Row, Col, Button, Input, Alert } from "reactstrap";
import uuid from "react-uuid";
import S3 from "react-aws-s3";

const Posts = ({ posts, loading }) => {
	return (
	  <>
	{ loading &&
	  <div> loading... </div>
	}
	<ul>
	  { posts.map(post=>(
		<li key={post.id}>
		  {post.title}
		</li>
	  ))}
	</ul>
	</>
	);
};

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
	  pageNumbers.push(i);
	}
	return (
	  <div>
		<nav>
		  <PageUl className="pagination">
			{pageNumbers.map(number => (
			  <PageLi key={number} className="page-item">
				<PageSpan onClick={() => paginate(number)} className="page-link">
				  {number}
				</PageSpan>
			  </PageLi>
			))}
		  </PageUl>
		</nav>
	  </div>
	);
  };


const App = () => {
	return (
		<div>

		</div>
	);
}


export default App;
