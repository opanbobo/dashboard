import * as types from '../types';
import { fetchPostGeo, fetchPost } from '../fetch';
import cookieCutter from 'cookie-cutter';

export const getGeo = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_GEO,
			});
			const userToken = JSON.parse(localStorage.getItem("userToken"));

			let data = await fetchPostGeo('all-count/', userToken.token, {
				...body,
				tone: body.tonee,
			});

			data = await data.json();

			dispatch({
				type: types.LOAD_GEO_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_GEO_ERROR,
				result: err,
			});
		}
	};
};

export const getGeoList = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_GEO_LIST,
			});
			const userToken = JSON.parse(localStorage.getItem("userToken"));

			let data = await fetchPostGeo('article-by-geo/', userToken.token, {
				...body,
				tone: body.tonee,
			});

			data = await data.json();

			dispatch({
				type: types.LOAD_GEO_LIST_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_GEO_LIST_ERROR,
				result: err,
			});
		}
	};
};

export const getGeoStatus = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('geo/get/status/', userToken.token, body).then((data) => resolve(data));
	});
};

export const postBacktrack = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('geo/add/', userToken.token, body).then((data) => resolve(data));
	});
};
