const SET_USERID = 'login/SET_TOKEN';

export const setUserId = userId => ({ type: SET_USERID, userId });

const initalState = {
    userId: 0
};

export default function login(state = initalState, action) {
	switch (action.type){
		case SET_USERID :
			return {
				...state,
				userId: action.userId
			};
		default:
			return state;
	}
}