import * as types from 'store/types';
import { fetchGet, fetchUpdate, fetchDelete, fetchPost } from 'store/fetch';

const EXCEL_URL = 'dashboard/excel/columns';

export const getExcelColumn = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_EXCEL_COLUMNS,
			});
			const userToken = JSON.parse(localStorage.getItem('userToken'));

			let data = await fetchGet(EXCEL_URL, userToken.token, body);

			data = await data.json();

			dispatch({
				type: types.LOAD_EXCEL_COLUMNS_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_EXCEL_COLUMNS_ERROR,
				result: err,
			});
		}
	};
};

export const createExcelColumn = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost(EXCEL_URL, userToken.token, body).then((data) => resolve(data));
	});
};

export const updateExcelColumn = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchUpdate(EXCEL_URL, userToken.token, body).then((data) => resolve(data));
	});
};

export const deleteExcelColumn = (id, body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchDelete(`${EXCEL_URL}/${id}`, userToken.token, body).then((data) => resolve(data));
	});
};
