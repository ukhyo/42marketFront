const GET_TOKEN = 'login/GET_TOKEN';
const SET_TOKEN = 'login/SET_TOKEN';
const GET_ID = 'login/GET_ID';
const SET_ID = 'login/SET_ID';
const SET_ISLOGIN = 'login/SET_ISLOGIN';
const GET_ISLOGIN = 'login/GET_ISLOGIN';
const SET_SUBSCRIBE = 'login/SET_SUBSCRIBE';
const GET_SUBSCRIBE = 'login/GET_SUBSCRIBE';

export const setToken = token => ({ type: SET_TOKEN, token});
export const getToken = () => ({ type: GET_TOKEN });
export const setID = id => ({ type: SET_ID, id });
export const getID = () => ({ type: GET_ID });
export const setIsLogin = isLogin => ({ type: SET_ISLOGIN, isLogin });
export const getIsLogin = () => ({ type: GET_ISLOGIN });
export const setSubscribe = subscribe => ({ type: SET_SUBSCRIBE, subscribe });
export const getSubscribe = () => ({ type: GET_SUBSCRIBE });


const initalState = {
	token: "",
	id: "",
	subscribe: "",
	isLogin: false
};

export default function login(state = initalState, action) {
	switch (action.type){
		case SET_TOKEN:
			return {
				...state,
				token: action.token
			};
		case GET_TOKEN:
			return state.tokens;
		case SET_ID:
			return {
				...state,
				id: action.id
			};
		case GET_ID:
			return action.id;
		case SET_ISLOGIN:
			return {
				...state,
				isLogin: action.isLogin
			};
		case GET_ISLOGIN:
			return state.isLogin;
		case SET_SUBSCRIBE:
			return {
				...state,
				subscribe: action.subscribe
			};
		case GET_SUBSCRIBE:
			return state.subscribe
		default:
			return state;
	}
}