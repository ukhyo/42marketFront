import React from 'react'
import styled from 'styled-components';

function Yosemite({onClickCancelButton}) {
	console.log(onClickCancelButton);
	const cancelButton = onClickCancelButton;
	return (
		<TitleBarC>
			<ButtonC>
				<CloseC>
					<button onClick={cancelButton}><span><strong>x</strong></span></button>
				</CloseC>
				<MinimizeC>
        	<button onClick={cancelButton}><span><strong>&ndash;</strong></span></button>
     		</MinimizeC>
				<ZoomC>
      	  <button onClick={cancelButton}><span><strong>+</strong></span></button>
      	</ZoomC>
			</ButtonC>
		</TitleBarC>
	)
}

const TitleBarC = styled.div`
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));
  background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
  background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);
  background: -ms-linear-gradient(top, #ebebeb, #d5d5d5);
  background: -o-linear-gradient(top, #ebebeb, #d5d5d5);
  background: linear-gradient(top, #ebebeb, #d5d5d5);
  color: #4d494d;
  font-size: 11pt;
  line-height: 20px;
  text-align: center;
  width: 100%;
  height: 20px;
  border-top: 1px solid #f3f1f3;
  border-bottom: 1px solid #b1aeb1;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  cursor: default;
`

const ButtonC = styled.div `
	padding-left: 8px;
  padding-top: 3px;
  float: left;
  line-height: 0px;
	&:hover {
		visibility: visible;
	}
`

const CloseC = styled.div `
	background: #ff5c5c;
  font-size: 9pt;
  width: 11px;
  height: 11px;
  border: 1px solid #e33e41;
  border-radius: 50%;
  display: inline-block;
	&:active {
		background: #c14645;
  	border: 1px solid #b03537;
	}
	&:active button{
		color: #4e0002;
	}
	> button {
		color: #820005;
  	visibility: hidden;
		cursor: default;
	}
`

const MinimizeC = styled.div `
	background: #ffbd4c;
  font-size: 9pt;
  line-height: 11px;
  margin-left: 4px;
  width: 11px;
  height: 11px;
  border: 1px solid #e09e3e;
  border-radius: 50%;
  display: inline-block;
	&:active {
		background: #c08e38;
  	border: 1px solid #af7c33;
	}
	&:active button{
		color: #5a2607;
	}
	> button {
		color: #9a5518;
  	visibility: hidden;
  	cursor: default;
	}
`
const ZoomC = styled.div `
	background: #00ca56;
  font-size: 9pt;
  line-height: 11px;
  margin-left: 6px;
  width: 11px;
  height: 11px;
  border: 1px solid #14ae46;
  border-radius: 50%;
  display: inline-block;
	&:active {
		background: #029740;
 		border: 1px solid #128435;
	}
	&:active button {
		color: #003107;
	}
	> button {
		color: #006519;
		visibility: hidden;
  	cursor: default;
	}
`


export default Yosemite;
