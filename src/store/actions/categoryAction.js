import * as types from 'store/types';
import { fetchGet, fetchPost } from 'store/fetch';
import cookieCutter from 'cookie-cutter';

export const getConfigCategoryList = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_CONFIG_CATEGORY_LIST,
			});

			const userToken = JSON.parse(localStorage.getItem("userToken"));
			let data = await fetchGet('user/categories/', userToken.token, body);
			data = await data.json();

			dispatch({
				type: types.LOAD_CONFIG_CATEGORY_LIST_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_CONFIG_CATEGORY_LIST_ERROR,
				result: err,
			});
		}
	};
};

export const getConfigCategoryChosen = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_CONFIG_CATEGORY_CHOSEN,
			});

			const userToken = JSON.parse(localStorage.getItem("userToken"));
			let data = await fetchPost('user/subcategory-chosen', userToken.token, body);
			data = await data.json();

			dispatch({
				type: types.LOAD_CONFIG_CATEGORY_CHOSEN_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_CONFIG_CATEGORY_CHOSEN_ERROR,
				result: err,
			});
		}
	};
};

export const createConfigCategory = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/create/group-category', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateConfigCategoryName = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/update/group-category', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateConfigCategory = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/group-sub-category/update', userToken.token, body).then((data) => resolve(data));
	});
};

export const deleteConfigCategory = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/delete/group-category', userToken.token, body).then((data) => resolve(data));
	});
};
