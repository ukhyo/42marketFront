import { useEffect } from "react";
import axios from "axios";
import defaultAxios from "axios";
import { useState } from "react";



const useAxios = (opt, axiosInstance = defaultAxios) => {
	const [state, setState] = useState({
		loading: true,
		data: null,
	});
	const [trigger, setTrigger] = useState(0);
	const refetch = () => {
		setState({
			...state,
			loading: true
		})
		setTrigger(new Date());
	}
	useEffect(() => {
		const headers = {
			authorization: "token....",
		};
		axiosInstance(opt, {headers}).then(data => {
			setState(
				{
					...state,
					loading: false,
					data
				});
		})
		console.log("Come?");
		}, [trigger]);

	if (!opt.url) {
		return;
	}
	return { ...state, refetch };
};

export default useAxios;
