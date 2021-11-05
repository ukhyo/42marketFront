import { createStore } from "redux";
import initState from "./init.json";

function reducer(state = initState, action) {
	// 상태 관리시 action으로 넘어오는 값을 state에 반영
	// if문은 switch문으로 대체 가능
	if (action.type === "WELCOME") {
		return { ...state, mode: "WELCOME", selected_content_id: 0 };
	}
	if (action.type === "READ") {
		return {
			...state,
			mode: "READ",
			selected_content_id: action.id,
		};
	}
	if (action.type === "CREATE") {
		return { ...state, mode: "CREATE" };
	}
	if (action.type === "CREATE_PROCESS") {
		const newId = state.max_content_id + 1;
		const contents = [
			...state.contents,
			{
				id: newId,
				title: action.title,
				desc: action.desc,
			},
		];
		return {
			...state,
			contents,
			max_content_id: newId,
			mode: "READ",
			selected_content_id: newId,
		};
	}
	if (action.type === "UPDATE") {
		return { ...state, mode: "UPDATE" };
	}
	if (action.type === "UPDATE_PROCESS") {
		const contents = [...state.contents];
		for (let content of contents) {
			if (content.id === action.id) {
				// 이렇게 해도 배열에 있는 객체의 값이 바뀜
				content.title = action.title;
				content.desc = action.desc;
			}
		}
		return {
			...state,
			contents,
			mode: "READ",
			selected_content_id: action.id,
		};
	}
	if (action.type === "DELETE_PROCESS") {
		const contents = state.contents.filter((el) => el.id !== state.selected_content_id);
		return {
			...state,
			contents,
			mode: "WELCOME",
			selected_content_id: 0,
		};
	}
	return state;
}

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
