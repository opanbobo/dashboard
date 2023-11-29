import * as types from '../types';
import { fetchGet, fetchPost } from 'store/fetch';
import cookieCutter from 'cookie-cutter';

export const getConfigMediaList = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_CONFIG_MEDIA_LIST,
			});
			const userToken = JSON.parse(localStorage.getItem("userToken"));

			let data = await fetchGet('user/medias/', userToken.token, body);
			data = await data.json();

			dispatch({
				type: types.LOAD_CONFIG_MEDIA_LIST_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_CONFIG_MEDIA_LIST_ERROR,
				result: err,
			});
		}
	};
};

export const getConfigMediaChosen = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_CONFIG_MEDIA_CHOSEN,
			});
			const userToken = JSON.parse(localStorage.getItem("userToken"));

			let data = await fetchPost('user/media-groups/', userToken.token, body);
			data = await data.json();

			dispatch({
				type: types.LOAD_CONFIG_MEDIA_CHOSEN_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_CONFIG_MEDIA_CHOSEN_ERROR,
				result: err,
			});
		}
	};
};

export const createConfigMedia = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/media-group/create', userToken.token, body).then((data) => resolve(data));
	});
};

export const deleteConfigMedia = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/media-group/delete', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateConfigMedia = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/media-chosen/update', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateConfigMediaName = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/media-group/update', userToken.token, body).then((data) => resolve(data));
	});
};
