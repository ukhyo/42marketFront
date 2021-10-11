import React from "react";
import styled from "styled-components";

function Mypage ()
{
    return (
        <div>
            <MypageHeader>MY PAGE</MypageHeader>
        </div>
    )
}

const   MypageHeader = styled.h1`
  font-size: 50px;
  text-align: center;
  margin-top: 130px;
`;

export default Mypage