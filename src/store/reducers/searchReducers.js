import * as types from 'store/types';

const initialState = {
	searchLoad: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	searchContent: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	searchMedia: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	searchSubcat: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_SEARCH]: (state) => {
		return {
			...state,
			searchLoad: {
				...state.searchLoad,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_SEARCH_SUCCESS]: (state, action) => {
		return {
			...state,
			searchLoad: {
				...state.searchLoad,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_SEARCH_ERROR]: (state, action) => {
		return {
			...state,
			searchLoad: {
				...state.searchLoad,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_SEARCH_CONTENT]: (state) => {
		return {
			...state,
			searchContent: {
				...state.searchContent,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_SEARCH_CONTENT_SUCCESS]: (state, action) => {
		return {
			...state,
			searchContent: {
				...state.searchContent,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_SEARCH_CONTENT_ERROR]: (state, action) => {
		return {
			...state,
			searchContent: {
				...state.searchContent,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_SEARCH_MEDIA]: (state) => {
		return {
			...state,
			searchMedia: {
				...state.searchMedia,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_SEARCH_MEDIA_SUCCESS]: (state, action) => {
		return {
			...state,
			searchMedia: {
				...state.searchMedia,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_SEARCH_MEDIA_ERROR]: (state, action) => {
		return {
			...state,
			searchMedia: {
				...state.searchMedia,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_SEARCH_SUBCAT]: (state) => {
		return {
			...state,
			searchSubcat: {
				...state.searchSubcat,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_SEARCH_SUBCAT_SUCCESS]: (state, action) => {
		return {
			...state,
			searchSubcat: {
				...state.searchSubcat,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_SEARCH_SUBCAT_ERROR]: (state, action) => {
		return {
			...state,
			searchSubcat: {
				...state.searchSubcat,
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
