import { useReducer, useEffect } from 'react';

function	reducer(state, action)
{
	switch (action. type)
	{
		case 'LOADING' :
			return {
				loading: true,
				data: null,
				error: null,
			};
		case 'SUCCESS' :
			return {
				loading: false,
				data: action.data,
				error: null
			};
		case 'ERROR' :
			return {
				loading: false,
				data: null,
				error: action.error
			}
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

function	useAsync(callback, deps = [])
{
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		data: null,
		error: false
	});
	const fetchData = async () => {
		dispatch({ type: 'LOADING' });
		try
		{
			const data = await callback();
			console.log("useAsyncaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
			console.log("data here", data);
			dispatch({ type: 'SUCCESS', data});
		}
		catch (e)
		{
			dispatch({ type: 'ERROR', error: e});
		}
	};
	console.log(deps, "deps");
	useEffect(() => {
		console.log("useAsynchere");
		fetchData();
	}, []);

	return [state, fetchData];
}

export default useAsync;
