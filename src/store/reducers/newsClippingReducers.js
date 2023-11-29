import * as types from '../types';

const initialState = {
	newsClippingList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	issueAuto: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	sponsorList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_NEWS_CLIPPING]: (state) => {
		return {
			...state,
			newsClippingList: {
				...state.newsClippingList,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_NEWS_CLIPPING_SUCCESS]: (state, action) => {
		return {
			...state,
			newsClippingList: {
				...state.newsClippingList,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_NEWS_CLIPPING_ERROR]: (state, action) => {
		return {
			...state,
			newsClippingList: {
				...state.newsClippingList,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_ISSUE_AUTO]: (state) => {
		return {
			...state,
			issueAuto: {
				...state.issueAuto,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_ISSUE_AUTO_SUCCESS]: (state, action) => {
		return {
			...state,
			issueAuto: {
				...state.issueAuto,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_ISSUE_AUTO_ERROR]: (state, action) => {
		return {
			...state,
			issueAuto: {
				...state.issueAuto,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},
	[types.LOAD_SPONSOR]: (state) => {
		return {
			...state,
			sponsorList: {
				...state.sponsorList,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_SPONSOR_SUCCESS]: (state, action) => {
		return {
			...state,
			sponsorList: {
				...state.sponsorList,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_SPONSOR_ERROR]: (state, action) => {
		return {
			...state,
			sponsorList: {
				...state.sponsorList,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},
};

export default (state = initialState, action) => {
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
};
