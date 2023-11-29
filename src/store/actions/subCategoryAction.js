import * as types from 'store/types';
import { fetchGet, fetchPost } from 'store/fetch';

import cookieCutter from 'cookie-cutter';

export const getConfigSubCatList = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_CONFIG_SUBCAT_LIST,
			});

			const userToken = JSON.parse(localStorage.getItem("userToken"));
			let data = await fetchGet('user/categorycollections/', userToken.token, body);
			data = await data.json();

			dispatch({
				type: types.LOAD_CONFIG_SUBCAT_LIST_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_CONFIG_SUBCAT_LIST_ERROR,
				result: err,
			});
		}
	};
};

export const createConfigSubcat = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/create/subcategory', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateConfigSubcat = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/sub-category/update', userToken.token, body).then((data) => resolve(data));
	});
};

export const deleteConfigSubcat = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/sub-category/delete', userToken.token, body).then((data) => resolve(data));
	});
};

export const getKeywordList = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_CONFIG_SUBCAT_KEYWORD_LIST,
			});

			const userToken = JSON.parse(localStorage.getItem("userToken"));
			let data = await fetchPost('user/keywords/', userToken.token, body);
			data = await data.json();

			dispatch({
				type: types.LOAD_CONFIG_SUBCAT_KEYWORD_LIST_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_CONFIG_SUBCAT_KEYWORD_LIST_ERROR,
				result: err,
			});
		}
	};
};

export const createKeyword = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/keyword/create', userToken.token, body).then((data) => resolve(data));
	});
};

export const deleteKeyword = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/keyword/delete', userToken.token, body).then((data) => resolve(data));
	});
};
