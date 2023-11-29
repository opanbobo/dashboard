import * as types from 'store/types';
import cookieCutter from 'cookie-cutter';
import { fetchGet, fetchPost } from 'store/fetch';

export const postSearchLoad = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('user/article/save', userToken.token, body).then((data) => resolve(data));
	});
};

export const postSearchContent = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPost('search/', userToken.token, body).then((data) => resolve(data));
	});
};

export const getSearchMedia = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_SEARCH_MEDIA,
			});
			const userToken = JSON.parse(localStorage.getItem("userToken"));

			let data = await fetchGet('media-categories/', userToken.token, body);

			data = await data.json();

			dispatch({
				type: types.LOAD_SEARCH_MEDIA_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_SEARCH_MEDIA_ERROR,
				result: err,
			});
		}
	};
};

export const getSearchSubcat = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_SEARCH_SUBCAT,
			});
			const userToken = JSON.parse(localStorage.getItem("userToken"));

			let data = await fetchGet('user/subcategories-distinct/', userToken.token, body);

			data = await data.json();

			dispatch({
				type: types.LOAD_SEARCH_SUBCAT_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_SEARCH_SUBCAT_ERROR,
				result: err,
			});
		}
	};
};
