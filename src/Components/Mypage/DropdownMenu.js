import React, { useState, useRef } from 'react';
import styled from 'styled-components';

function DropdownMenu() {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [sellState, setSellState] = useState("판매중");
    const onClick = () => setIsActive(!isActive);

    return (
        <div>
            <button onClick={onClick}>
                <span>{sellState}</span>
            </button>
            <nav ref={dropdownRef}>
                <ul>
                    <li onClick={setSellState("판매완료")}>판매완료</li>
                    <li onClick={setSellState("삭제")} >삭제</li>
                    <li onClick={setSellState("수정")}>수정</li>
                </ul>
          </nav>
        </div>
    );
}

export default DropdownMenu;