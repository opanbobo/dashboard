import * as types from 'store/types';

const initialState = {
	issueTop: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	issueDetail: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	autocomplete: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	issueAdd: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	issueDelete: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	issueUpdate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_ISSUE_SUMMARY]: (state) => {
		return {
			...state,
			issueTop: {
				...state.issueTop,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_ISSUE_SUMMARY_SUCCESS]: (state, action) => {
		return {
			...state,
			issueTop: {
				...state.issueTop,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_ISSUE_SUMMARY_ERROR]: (state, action) => {
		return {
			...state,
			issueTop: {
				...state.issueTop,
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
