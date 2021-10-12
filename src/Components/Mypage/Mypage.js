import React from "react";
import Nongdam from "../../images/nongdam.png";
import styled from "styled-components";

const   MypageHeaderC = styled.h1`
  font-size: 50px;
  text-align: center;
  margin-top: 130px;
  font-family: "Meslo LG S for Powerline";
`;

const   DataViewComponentC = styled.div`
  width: 345px;
  height: 640px;
  margin-left: 248px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  box-sizing: border-box;
  text-align: center;
  display : block;
`;

const   MypageImgC = styled.img`
    width: 200px;
    height: 200px;
    margin: 20px;
    border-radius: 200px;
    border: 1px solid rgba(0, 0, 0, 0.4);     
`;

const   NickNameC = styled.div`
    width: 154px;
    height: 59px;
    display: table;
    margin-left: auto;
    margin-right: auto;
    span {
      font-size: 27px;
    }
`;

function DataViewComponent ()
{
    return (
        <DataViewComponentC>
            <MypageImgC src={Nongdam}/>
            <NickNameC>
                <span>hyeolee</span>
            </NickNameC>
            <div>
                <span>Lv.42</span>
            </div>
            <div>
                <span>42%</span>
            </div>
            <div>
                <span>자유로운 거래 추구</span>
            </div>
        </DataViewComponentC>
    );
}

function Mypage ()
{
    return (
        <div>
            <MypageHeaderC>MY PAGE</MypageHeaderC>
            <DataViewComponent></DataViewComponent>
        </div>
    )
}


export default Mypage