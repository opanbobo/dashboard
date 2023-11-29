import * as types from 'store/types';
import { fetchGet, fetchPost } from 'store/fetch';

export const getAllCompany = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_ALL_COMPANY_LIST,
			});

			const userToken = JSON.parse(localStorage.getItem('userToken'));

			let data = await fetchGet('admin/company/list/', userToken.token, body);

			data = await data.json();

			dispatch({
				type: types.LOAD_ALL_COMPANY_LIST_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_ALL_COMPANY_LIST_ERROR,
				result: err,
			});
		}
	};
};

export const getAdminList = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_USER_LIST,
			});

			const userToken = JSON.parse(localStorage.getItem('userToken'));

			let data = await fetchPost('admin/list/', userToken.token, body);

			data = await data.json();

			dispatch({
				type: types.LOAD_USER_LIST_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_USER_LIST_ERROR,
				result: err,
			});
		}
	};
};

export const getAdminLevel = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchGet('admin/level/list/', userToken.token, body).then((data) => resolve(data));
	});
};

export const getAdminDetail = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('admin/detail/', userToken.token, body).then((data) => resolve(data));
	});
};

export const createUser = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('admin/user/create/', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateUser = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('admin/user/update/', userToken.token, body).then((data) => resolve(data));
	});
};

export const deleteUser = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('admin/user/delete/', userToken.token, body).then((data) => resolve(data));
	});
};

export const searchAdminList = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('admin/search/', userToken.token, body).then((data) => resolve(data));
	});
};
