import * as types from '../types';
import { fetchDelete, fetchGet, fetchPost, fetchUpdate } from '../fetch';
import cookieCutter from 'cookie-cutter';

export const getNewsClipping = (body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_NEWS_CLIPPING,
			});
			const userToken = JSON.parse(localStorage.getItem('userToken'));

			let data = await fetchPost('user/editing/', userToken.token, { ...body, tone: body.tonee });

			data = await data.json();

			dispatch({
				type: types.LOAD_NEWS_CLIPPING_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_NEWS_CLIPPING_ERROR,
				result: err,
			});
		}
	};
};

export const setNewsClipping = (data) => {
	return (dispatch, getState) => {
		dispatch({
			type: types.LOAD_NEWS_CLIPPING_SUCCESS,
			result: data,
		});
	};
};

export const getIssueAuto = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_ISSUE_AUTO,
			});
			const userToken = JSON.parse(localStorage.getItem('userToken'));

			let data = await fetchGet('issue/list/', userToken.token);

			data = await data.json();

			dispatch({
				type: types.LOAD_ISSUE_AUTO_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_ISSUE_AUTO_ERROR,
				result: err,
			});
		}
	};
};

export const newsClippingSendEmail = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/editing/send-mail', userToken.token, body).then((data) => resolve(data));
	});
};

export const newsClippingDownloadDocxs = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/download/docxs', userToken.token, body).then((data) => resolve(data));
	});
};

export const newsClippingDownloadPdf = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/download/pdfs', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateNewsClippingTitle = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/title/update', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateNewsClippingSummary = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/summary/update', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateNewsClippingTone = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/tone/update', userToken.token, body).then((data) => resolve(data));
	});
};

export const getNewsClippingKeyword = (token, body) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_NEWS_CLIPPING_KEYWORD_DETAIL,
			});

			let data = await fetchPost('user/editing', token, body);

			data = await data.json();

			dispatch({
				type: types.LOAD_NEWS_CLIPPING_KEYWORD_DETAIL_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_NEWS_CLIPPING_KEYWORD_DETAIL_ERROR,
				result: err,
			});
		}
	};
};

export const getKeywordArticle = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/keywords-by-article-id/', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateNewsClippingTones = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/tone/multiple/update', userToken.token, body).then((data) => resolve(data));
	});
};

export const deleteArticle = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/article/delete', userToken.token, body).then((data) => setTimeout(() =>  resolve(data), 1000));
	});
};

export const createTopIssue = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('issue/add/', userToken.token, body).then((data) => resolve(data));
	});
};

export const saveArticleAct = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/article/save', userToken.token, body).then((data) => resolve(data));
	});
};

export const categoriesDistinct = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchGet('user/subcategories-distinct/', userToken.token, body).then((data) => resolve(data));
	});
};

export const deleteSubCat = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/article/delete/category', userToken.token, body).then((data) => resolve(data));
	});
};

// SPONSORSHIP
export const getSponsor = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: types.LOAD_SPONSOR,
			});
			const userToken = JSON.parse(localStorage.getItem('userToken'));

			let data = await fetchGet('user/sponsor', userToken.token);

			data = await data.json();

			dispatch({
				type: types.LOAD_SPONSOR_SUCCESS,
				result: data,
			});
		} catch (err) {
			dispatch({
				type: types.LOAD_SPONSOR_ERROR,
				result: err,
			});
		}
	};
};

export const sponsorPromise = () => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchGet('user/sponsor', userToken.token).then((data) => resolve(data));
	});
};

export const addArticleSponsor = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/article/sponsor', userToken.token, body).then((data) => resolve(data));
	});
};

export const addSponsor = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/sponsor', userToken.token, body).then((data) => resolve(data));
	});
};

export const updateSponsor = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchUpdate('user/sponsor', userToken.token, body).then((data) => resolve(data));
	});
};

export const deleteSponsor = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchDelete('user/sponsor', userToken.token, body).then((data) => resolve(data));
	});
};

// add or update sponsor article

export const addSponsorArticle = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/article/sponsor', userToken.token, body).then((data) => resolve(data));
	});
};

export const deleteSponsorArticle = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem('userToken'));

		return fetchPost('user/article/sponsor', userToken.token, body).then((data) => resolve(data));
	});
};
