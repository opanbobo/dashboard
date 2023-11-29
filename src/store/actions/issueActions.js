import * as types from 'store/types';
import { fetchGet, fetchPost, fetchDelete, fetchUpdate } from 'store/fetch';
import cookieCutter from 'cookie-cutter';

export const getTopIssue = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_ISSUE_SUMMARY,
			});
			const userToken = JSON.parse(localStorage.getItem("userToken"));

			let data = await fetchPost('dashboard/top-issue', userToken.token, body);

			data = await data.json();

			dispatch({
				type: types.LOAD_ISSUE_SUMMARY_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_ISSUE_SUMMARY_ERROR,
				result: err,
			});
		}
	};
};

export const updateIssue = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchUpdate('issue/update/', userToken.token, body).then((data) => resolve(data));
	});
};
