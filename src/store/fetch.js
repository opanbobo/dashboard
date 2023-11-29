import { URL_API, URL_API_DEMO, URL_API_V2, URL_API_GEO } from './types';

export const fetchPost = (url, token, body) => {
	return fetch(`${URL_API}/${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(body),
	});
};

export const fetchPostInsight = (url, token, body) => {
	return fetch(`api.media-insight.id/api/v1/${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(body),
	});
};

export const fetchGet = (url, token) => {
	return fetch(`${URL_API}/${url}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	});
};

export const fetchDelete = (url, token, body) => {
	return fetch(`${URL_API}/${url}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(body),
	});
};

export const fetchUpdate = (url, token, body) => {
	return fetch(`${URL_API}/${url}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(body),
	});
};

export const fetchPostV2 = (url, token, body) => {
	return fetch(`${URL_API_V2}/${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(body),
	});
};

export const fetchPostGeo = (url, token, body) => {
	return fetch(`${URL_API_GEO}/${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(body),
	});
};

export const fetchGetDemo = (url, token) => {
	return fetch(`${URL_API_DEMO}/${url}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	});
};

export const fetchPostDemo = (url, token, body) => {
	return fetch(`${URL_API_DEMO}/${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(body),
	});
};
