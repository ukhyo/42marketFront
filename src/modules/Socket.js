const SET_SOCKET = 'socket/SET_SOCKET';

export const setSocket = (socket, stompClient) => ({ type: SET_SOCKET, socket, stompClient });

const initalState = {
    socket: 0,
    stompClient: 0
};

export default function socket(state = initalState, action) {
	switch (action.type){
		case SET_SOCKET :
			return {
				...state,
				socket: action.socket,
                stompClient: action.stompClient
			};
		default:
			return state;
	}
}