import * as types from 'store/types';
import { fetchGet, fetchPost, fetchUpdate, fetchDelete } from 'store/fetch';
import cookieCutter from 'cookie-cutter';

export const getStopwordList = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_STOPWORD,
			});
			const userToken = JSON.parse(localStorage.getItem("userToken"));

			let data = await fetchGet(`stop-words?page=${body.page}&size=${body.size}`, userToken.token, body);
			data = await data.json();

			dispatch({
				type: types.LOAD_STOPWORD_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_STOPWORD_ERROR,
				result: err,
			});
		}
	};
};

export const createStopword = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('stop-words', userToken.token, body).then((data) => resolve(data));
	});
};

export const deleteStopword = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchDelete('stop-words', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateStopword = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchUpdate('stop-words', userToken.token, body).then((data) => resolve(data));
	});
};
