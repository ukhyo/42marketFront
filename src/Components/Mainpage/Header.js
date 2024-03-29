import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Cookies } from "react-cookie";
import remoteX from '../img/remote/remoteX.png';
import remoteAnswer from '../img/remote/remoteAnswer.png';
import remoteArrow from '../img/remote/remoteArrow.png';
import remoteSell from '../img/remote/remoteSell.png';
import remoteClick from '../img/remote/remoteClick.png';

function Header() {
  const cookie = new Cookies();
  const [remoteState, setRemoteState] = useState(false);
  const [idx, setIdx] = useState(0);
  let {
    userId: userId,
    Authorization: token,
    subscribes: sub,
  } = cookie.getAll();
  const [Loading, setLoading] = useState(true);
  const history = useHistory();
  const [text, setText] = useState("");

  useEffect(() => {}, [remoteState]);

  if (userId === undefined) userId = "0";
  // const onSetSocket = (socket, stompClient) => {
  // 	dispatch(setSocket(socket, stompClient));
  // };
  function onChange(e) {
    setText(e.target.value);
  }
  const check = (e) => {
    if (e.key == "Enter") {
      imgClick();
    }
  };
  function imgClick(e) {
    if (text === "") {
      alert("검색어를 입력해주세요!");
      return;
    } else {
      history.push({
        pathname: `/search/${userId}/${text}`,
      });
    }
    setText("");
  }

  // function connectNoti() {
  // 	stompClient.connect({}, ()=>{
  // 		stompClient.subscribe(`/sub/all`, (data) => {
  // 			console.log(data);
  // 		})
  // 	});
  // }
  const headers = {
    Authorization: `Bearer ${token}`,
    withCreadentials: true,
    "Content-Type": "application/json",
  };

  const ScrollUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <HeaderC>
      <HeaderLineC>
        <HeaderLogoC>
          <a
            href="http://www.4m2d.site/"
            onClick={() => {
              setLoading(!Loading);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <HeaderLogoImgC src={process.env.PUBLIC_URL + "/img/Logo1.png"} />
          </a>
        </HeaderLogoC>
        <HeaderSearchC>
          <HeaderSearchInputC>
            <img
              onClick={imgClick}
              className="header_search_img"
              src={process.env.PUBLIC_URL + "/img/searchIcon.png"}
              alt="img"
            />
            <input
              placeholder="검색어를 입력해주세요."
              onChange={onChange}
              onKeyDown={check}
              type="text"
              value={text}
            />
          </HeaderSearchInputC>
        </HeaderSearchC>
        <HeaderInfoC>
          {
            token ? (
              <LinkC to="/product/regi">
                <img src={process.env.PUBLIC_URL + "/img/wonIcon.png"} />
                <div>판매하기</div>
              </LinkC>
            ) : null
            // <AC onClick={() => {
            // 	alert("로그인이 필요합니다.");
            // }} href="https://api.intra.42.fr/oauth/authorize?client_id=2b02d6cbfa01cb92c9572fc7f3fbc94895fc108fc55768a7b3f47bc1fb014f01&redirect_uri=http%3A%2F%2Fapi.%2Flogin%2FgetToken&response_type=code">
            // 	<img src={process.env.PUBLIC_URL + "/img/wonIcon.png"} />
            // 	<div>판매하기</div>
            // </AC>
          }
          {
            token ? (
              <LinkC to={`/mypage/${userId}/selllist`}>
                <img src={process.env.PUBLIC_URL + "/img/userIcon.png"} />
                <div>내정보</div>
              </LinkC>
            ) : null
            // <AC href="https://api.intra.42.fr/oauth/authorize?client_id=2b02d6cbfa01cb92c9572fc7f3fbc94895fc108fc55768a7b3f47bc1fb014f01&redirect_uri=http%3A%2F%2Fapi.4m2d.shop%2Flogin%2FgetToken&response_type=code" onClick={() => {
            // 	alert("로그인이 필요합니다.")
            // }}>
            // 	<img src={process.env.PUBLIC_URL + "/img/userIcon.png"} />
            // <div>내정보</div>
            // </AC>
          }
          {/* {
						// token ?
						<Notification/>
						//  : null
					} */}
          {token ? (
            <LinkC
              onClick={() => {
                const LogOut = () => {
                  cookie.remove("Authorization", {
                    path: "/",
                    domain: ".4m2d.site",
                  });
                  cookie.remove("userId", {
                    path: "/",
                    domain: ".4m2d.site",
                  });
                  window.location.reload();
                };
                LogOut();
              }}
              to={`/`}
            >
              <img src={process.env.PUBLIC_URL + "/img/logoutIcon.png"} />
              <div>로그아웃</div>
            </LinkC>
          ) : (
            <AC href="https://api.intra.42.fr/oauth/authorize?client_id=2b02d6cbfa01cb92c9572fc7f3fbc94895fc108fc55768a7b3f47bc1fb014f01&redirect_uri=http%3A%2F%2Fapi.4m2d.site%2Flogin%2FgetToken&response_type=code">
              <img src={process.env.PUBLIC_URL + "/img/loginIcon.png"} />
              <div>로그인</div>
            </AC>
          )}
        </HeaderInfoC>
        {
          token ?
          <AnimatePresence>
            {remoteState && (
              <>
                <RemoteOpt onClick={() => setRemoteState(!remoteState)}>
									<RemoteImgC src={remoteX}/>
                </RemoteOpt>
                <RemotePart
                  key="box1"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.2,
                      duration: 0.5,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 20,
                    transition: {
                      delay: 0.4,
                      duration: 0.5,
                    },
                  }}
                  size={35}
                >
									<RemoteLinkC to="/faq">
										<RemoteImgC src={remoteAnswer} />
									</RemoteLinkC>
                </RemotePart>
                <RemotePart
                  key="box2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.4,
                      duration: 0.5,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 20,
                    transition: {
                      delay: 0.2,
                      duration: 0.5,
                    },
                  }}
                  size={27.5}
                >
									<RemoteLinkC to="/product/regi">
										<RemoteImgC src={remoteSell} />
									</RemoteLinkC>
                </RemotePart>
              </>
          )}
        </AnimatePresence> : null
        }
        {
          token ?
        <AnimatePresence exitBeforeEnter>
          {!remoteState ? (
            <RemoteOpt
              onClick={() => {
                setRemoteState(!remoteState);
                setIdx((prev) => prev + 1);
              }}
            >
							<RemoteImgC src={remoteClick}/>
            </RemoteOpt>
          ) : null}
        </AnimatePresence> : null
        }
        <RemoteUp onClick={ScrollUp}><RemoteImgC src={remoteArrow}/></RemoteUp>
      </HeaderLineC>
    </HeaderC>
  );
}

// Header style
const HeaderC = styled.header`
  width: 100%;
  min-width: 1200px;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  background-color: #fdfdfd;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const HeaderLineC = styled.div`
  position: relative;
  width: 1200px;
  height: 100px;
  display: flex;
  /*justify-content: space-between;*/
  align-items: center;
`;

const RemotePart = styled(motion.div)`
  cursor: pointer;
  position: fixed;
  right: 5vw;
  top: ${(props) => props.size}vh;
  width: 3vw;
  height: 3vw;
  border-radius: 1.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const St = motion;

const RemoteOpt = styled(motion.div)`
  cursor: pointer;
  position: fixed;
  right: 5vw;
  top: 42.5vh;
  width: 3vw;
  height: 3vw;
  border-radius: 1.5vw;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const RemoteLinkC = styled(Link)`
	text-decoration: none;
`

const RemoteImgC = styled.img`
	cursor: pointer;
  width: 3vw;
  height: 3vw;
  border-radius: 1.5vw;
`

const RemoteUp = styled.div`
  cursor: pointer;
  position: fixed;
  right: 5vw;
  top: 50vh;
  width: 3vw;
  height: 3vw;
  border-radius: 1.5vw;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const HeaderLogoC = styled.div`
  width: 180px;
`;

const HeaderLogoImgC = styled.img`
  width: 100%;
  height: 80%;
`;

const HeaderSearchC = styled.div`
  margin-left: 30px;
  width: 650px;
  padding-left: 25px;
  padding-right: 25px;
  height: 0;
`;

const HeaderSearchInputC = styled.fieldset`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  width: 100%;
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.7);
  background-color: #fdfdfd;
  & > input::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
  & > input {
    background-color: #fdfdfd;
    width: 100%;
    font-size: 18px;
    border: none;
    outline: none;
  }
  & > input:hover {
    width: 100%;
    outline: none;
  }
  & a {
    padding: 5px;
  }
  & img {
    /*border:none;
		outline:none;*/
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
`;

const AC = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  > div:hover {
    border-bottom: 2px solid rgb(100, 130, 238);
  }
`;

const LinkC = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  > div:hover {
    border-bottom: 2px solid rgb(100, 130, 238);
  }
`;

const HeaderInfoC = styled.div`
  position: relative;
  top: 15px;
  right: 0;
  display: flex;
  justify-content: right;
  width: 350px;
  font-size: 16px;
  & ${LinkC}, & ${AC} {
    padding: 0 15px;
  }
  & ${LinkC}:last-child, & ${AC}:last-child {
    padding-right: 0;
  }
  & > ${LinkC}:not(${LinkC}:first-child) {
    border-left: 1px solid rgb(0, 0, 0, 0.1);
  }
  & > ${AC}:not(${AC}:first-child) {
    border-left: 1px solid rgb(0, 0, 0, 0.1);
  }
  & div {
    margin-left: 10px;
  }
`;

export default Header;
