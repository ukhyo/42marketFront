import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const DropdownMenu = () => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [changeState, setChangeState] = useState("판매중");
    const onClick = () => setIsActive(!isActive);
    return (
      <MenuContainerC>
        <MenuTriggerC onClick={onClick} >
          <span>{changeState}</span>
        </MenuTriggerC>
        <MenuC ref={dropdownRef} active={isActive}>
          <ul>
            <li onClick={(e) => {
                setChangeState("판매중");
                setIsActive(!isActive);
            }}><span>판매중</span></li>
            <li onClick={(e) => {
                setChangeState("판매완료");
                setIsActive(!isActive);
                }}><span>판매완료</span></li>
            <li onClick={(e) => {
                setChangeState("수정");
                setIsActive(!isActive);
                }}><span>수정</span></li>
            <li onClick={(e) => {
                setChangeState("삭제");
                setIsActive(!isActive);
                }}><span>삭제</span></li>
          </ul>
        </MenuC>
      </MenuContainerC>
    );
};

const MenuContainerC = styled.div`
    position: relative;
    cursor: pointer;
`;

const MenuC = styled.nav`
    z-index: 5;
    background: #ffffff;
    border-radius: 8px;
    position: absolute;
    top: 30px;
    right: 0;
    width: 100px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: ${props => (props.active ? '1' : '0')};
    visibility: ${props => (props.active ? 'visible' : 'hidden')};
    transform: ${props => (props.active ? 'translateY(0)' : 'translateY(-20px)')};
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    > ul {
        list-style: none;
        padding: 0;
        margin: 0;
        > li {
            border-bottom: 1px solid #dddddd;
            > span {
                text-decoration: none;
                color: rgba(0, 0, 0, 0.7); 
                padding: 10px 15px;
                display: block;
            }
        }
    }
`;

const MenuTriggerC = styled.button`
    background: #ffffff;
    border-radius: 90px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    border: none;
    vertical-align: middle;
    transition: box-shadow 0.4s ease;
    > span {
        font-weight: 700;
        vertical-align: middle;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7); 
        margin: 0 10px;
    }
`;



export default DropdownMenu;