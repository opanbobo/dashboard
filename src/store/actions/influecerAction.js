import * as types from 'store/types';
import { fetchGetDemo, fetchPostDemo } from 'store/fetch';

import cookieCutter from 'cookie-cutter';

export const getInfluencerList = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_CONFIG_INFLUENCER_LIST,
			});
			const userToken = JSON.parse(localStorage.getItem("userToken"));

			let data = await fetchGetDemo('influencer-list/', userToken.token, body);
			data = await data.json();

			dispatch({
				type: types.LOAD_CONFIG_INFLUENCER_LIST_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_CONFIG_INFLUENCER_LIST_ERROR,
				result: err,
			});
		}
	};
};

export const createInfluencerList = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_CONFIG_INFLUENCER_CREATE,
			});
			const userToken = JSON.parse(localStorage.getItem("userToken"));

			let data = await fetchPostDemo('create-influencer/', userToken.token, body);
			data = await data.json();

			dispatch({
				type: types.LOAD_CONFIG_INFLUENCER_CREATE_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_CONFIG_INFLUENCER_CREATE_ERROR,
				result: err,
			});
		}
	};
};

export const updateInfluencerList = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_CONFIG_INFLUENCER_UPDATE,
			});
			const userToken = JSON.parse(localStorage.getItem("userToken"));

			let data = await fetchPostDemo('update-influencer', userToken.token, body);
			data = await data.json();

			dispatch({
				type: types.LOAD_CONFIG_INFLUENCER_UPDATE_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_CONFIG_INFLUENCER_UPDATE_ERROR,
				result: err,
			});
		}
	};
};

export const deleteInfluencerList = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPostDemo('delete-influencer/', userToken.token, body).then((data) => resolve(data));
	});
	// return async (dispatch, getState) => {
	// 	try {
	// 		dispatch({
	// 			type: types.LOAD_CONFIG_INFLUENCER_DELETE,
	// 		});
	// 		const userToken = JSON.parse(localStorage.getItem("userToken"));

	// 		let data = await fetchPostDemo('delete-influencer/', userToken.token, body);
	// 		data = await data.json();

	// 		dispatch({
	// 			type: types.LOAD_CONFIG_INFLUENCER_DELETE_SUCCESS,
	// 			result: data,
	// 		});
	// 	} catch (err) {
	// 		dispatch({
	// 			type: types.LOAD_CONFIG_INFLUENCER_DELETE_ERROR,
	// 			result: err,
	// 		});
	// 	}
	// };
};
