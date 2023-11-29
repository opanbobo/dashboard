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

export const getListCompany = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_COMPANY_LIST,
			});

			const userToken = JSON.parse(localStorage.getItem('userToken'));

			let data = await fetchPost('admin/list/', userToken.token, body);

			data = await data.json();

			dispatch({
				type: types.LOAD_COMPANY_LIST_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_COMPANY_LIST_ERROR,
				result: err,
			});
		}
	};
};

export const getDetailCompany = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('admin/detail/', userToken.token, body).then((data) => resolve(data));
	});
};

export const createCompany = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('admin/company/create/', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateCompany = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('admin/company/update/', userToken.token, body).then((data) => resolve(data));
	});
};

export const deleteCompany = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('admin/company/delete/', userToken.token, body).then((data) => resolve(data));
	});
};

export const searchCompany = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('admin/search/', userToken.token, body).then((data) => resolve(data));
	});
};
