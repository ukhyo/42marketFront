import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

function	NaviBar()
{
	return (
		<NaviBarC>
			<BuyListC>
				<span>구매 목록</span>
			</BuyListC>
			<SellListC>
				<span>판매 목록</span>
			</SellListC>
			<PickListC>
				<span>찜한 목록</span>
			</PickListC>
			<CommentsListC>
				<span>댓글 목록</span>
			</CommentsListC>
		</NaviBarC>
	);
}

const		NaviBarC = styled.div`
  	height: 70px;
	display: flex;
  	justify-content: center;
  	align-content: center;
  	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const		BuyListC = styled.div`
  width: 120px;
  height: 70px;
  border-bottom: 3px solid rgb(50, 232, 230);
  span {
  	font-weight: 600;
	  font-size: 14px;
    font-family: 'TmoneyRoundWindExtraBold';
	  display: table-cell;
  	text-align: left;
	  padding: 0px 30px;
    padding-top: 45px;
  	color: rgb(50, 232, 230);
  	vertical-align: middle;
  }
`;

const		SellListC = styled.div`
  width: 120px;
  height: 70px;
  span {
    font-weight: 600;
    font-size: 14px;
    font-family: 'TmoneyRoundWindExtraBold';
	color: rgba(0, 0, 0, 0.2);
    display: table-cell;
	  padding: 0px 30px;
    padding-top: 45px;
    text-align: left;
    vertical-align: middle;
  }
`;

const		PickListC = styled.div`
  width: 120px;
  height: 70px;
  span {
    font-weight: 600;
    font-size: 14px;
    font-family: 'TmoneyRoundWindExtraBold';
    display: table-cell;
	  padding: 0px 30px;
    padding-top: 45px;
    text-align: left;
    vertical-align: middle;
    color: rgba(0, 0, 0, 0.2);
  }
`;

const		CommentsListC = styled.div`
  width: 120px;
  height: 70px;
  span {
    font-weight: 600;
    font-size: 14px;
    font-family: 'TmoneyRoundWindExtraBold';
    display: table-cell;
	  padding: 0px 30px;
    padding-top: 45px;
    text-align: left;
    vertical-align: middle;
    color: rgba(0, 0, 0, 0.2);
  }
`;

export default NaviBar;