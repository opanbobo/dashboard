import { fetchGet, fetchPost } from 'store/fetch';

export const getStreamStatus = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchGet('user/keyword/restream', userToken.token, body).then((data) => resolve(data));
	});
};

export const postStream = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/keyword/restream', userToken.token, body).then((data) => resolve(data));
	});
};
