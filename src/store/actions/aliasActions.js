import * as types from 'store/types';
import { fetchPostDemo } from 'store/fetch';
import cookieCutter from 'cookie-cutter';

export const getAlias = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_ALIAS_LIST,
			});
			const userToken = JSON.parse(localStorage.getItem("userToken"));

			let data = await fetchPostDemo('get-alias-influencer/', userToken.token, body);
			data = await data.json();

			dispatch({
				type: types.LOAD_ALIAS_LIST_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_ALIAS_LIST_ERROR,
				result: err,
			});
		}
	};
};

export const createAlias = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPostDemo('create-name-influencer/', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateAlias = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPostDemo('update-aliases-influencer/', userToken.token, body).then((data) => resolve(data));
	});
};

export const deleteAlias = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPostDemo('delete-aliases-influencer/', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateAliasInfluencer = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPostDemo('insert-aliases-influencer/', userToken.token, body).then((data) => resolve(data));
	});
};
