import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RefreshToken } from './utils/RefreshToken';
import axios from "axios";

function Login(props) {
	const dispatch = useDispatch();
	function LoginHandler(){
		try {
			let data = {email: "devracoon@naver.com"};
			axios.post("/auth/login", JSON.stringify(data), {
				headers: {
					"Content-Type" : `application/json`,
				}
			})
			.then(res => {
				console.log("res.data.accessToken : " + res.data);
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data;
				dispatch ({type: 'LOGIN_SUCCESS'});
				props.history.push("/");
				setTimeout(function(){
					RefreshToken();
				}, 60 * 1000);
			}
			)
		}
		catch(e) {
			console.log(e);
		}
	}
	return (
		<div>
			<span>Login Page</span>
			<button type="button" onClick={LoginHandler}></button>
		</div>
	)
}

export default Login;