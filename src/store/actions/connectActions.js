import * as types from 'store/types';
import { fetchGet, fetchPost } from 'store/fetch';
import cookieCutter from 'cookie-cutter';

export const getConnectMedia = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_CONNECT_MEDIA,
			});

			const userToken = JSON.parse(localStorage.getItem("userToken"));
			let data = await fetchGet('wartawan/medias', userToken.token, body);
			data = await data.json();

			dispatch({
				type: types.LOAD_CONNECT_MEDIA_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_CONNECT_MEDIA_ERROR,
				result: err,
			});
		}
	};
};

export const getConnectMediacat = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_CONNECT_MEDIACAT,
			});

			const userToken = JSON.parse(localStorage.getItem("userToken"));
			let data = await fetchGet('media-categories/', userToken.token, body);
			data = await data.json();

			dispatch({
				type: types.LOAD_CONNECT_MEDIACAT_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_CONNECT_MEDIACAT_ERROR,
				result: err,
			});
		}
	};
};

export const postConnect = (body) => {
	return new Promise((resolve, reject) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));

    return fetchPost("wartawan/upload/", userToken.token, body).then(
      (data) => resolve(data)
    ).catch(err => reject(err));
  });
};
