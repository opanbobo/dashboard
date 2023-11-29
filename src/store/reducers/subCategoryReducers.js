import * as types from 'store/types';

const initialState = {
	configSubcatList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configSubcatCreate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configSubcatUpdate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configSubcatDelete: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configKeywordList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configKeywordCreate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configKeywordDelete: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_CONFIG_SUBCAT_LIST]: (state) => {
		return {
			...state,
			configSubcatList: {
				...state.configSubcatList,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_LIST_SUCCESS]: (state, action) => {
		return {
			...state,
			configSubcatList: {
				...state.configSubcatList,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_LIST_ERROR]: (state, action) => {
		return {
			...state,
			configSubcatList: {
				...state.configSubcatList,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONFIG_SUBCAT_CREATE]: (state) => {
		return {
			...state,
			configSubcatCreate: {
				...state.configSubcatCreate,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_CREATE_SUCCESS]: (state, action) => {
		return {
			...state,
			configSubcatCreate: {
				...state.configSubcatCreate,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_CREATE_ERROR]: (state, action) => {
		return {
			...state,
			configSubcatCreate: {
				...state.configSubcatCreate,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONFIG_SUBCAT_UPDATE]: (state) => {
		return {
			...state,
			configSubcatUpdate: {
				...state.configSubcatUpdate,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_UPDATE_SUCCESS]: (state, action) => {
		return {
			...state,
			configSubcatUpdate: {
				...state.configSubcatUpdate,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_UPDATE_ERROR]: (state, action) => {
		return {
			...state,
			configSubcatUpdate: {
				...state.configSubcatUpdate,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONFIG_SUBCAT_DELETE]: (state) => {
		return {
			...state,
			configSubcatDelete: {
				...state.configSubcatDelete,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_DELETE_SUCCESS]: (state, action) => {
		return {
			...state,
			configSubcatDelete: {
				...state.configSubcatDelete,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_DELETE_ERROR]: (state, action) => {
		return {
			...state,
			configSubcatDelete: {
				...state.configSubcatDelete,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONFIG_SUBCAT_KEYWORD_LIST]: (state) => {
		return {
			...state,
			configKeywordList: {
				...state.configKeywordList,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_KEYWORD_LIST_SUCCESS]: (state, action) => {
		return {
			...state,
			configKeywordList: {
				...state.configKeywordList,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_KEYWORD_LIST_ERROR]: (state, action) => {
		return {
			...state,
			configKeywordList: {
				...state.configKeywordList,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONFIG_SUBCAT_KEYWORD_CREATE]: (state) => {
		return {
			...state,
			configKeywordCreate: {
				...state.configKeywordCreate,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_KEYWORD_CREATE_SUCCESS]: (state, action) => {
		return {
			...state,
			configKeywordCreate: {
				...state.configKeywordCreate,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_KEYWORD_CREATE_ERROR]: (state, action) => {
		return {
			...state,
			configKeywordCreate: {
				...state.configKeywordCreate,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONFIG_SUBCAT_KEYWORD_DELETE]: (state) => {
		return {
			...state,
			configKeywordDelete: {
				...state.configKeywordDelete,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_KEYWORD_DELETE_SUCCESS]: (state, action) => {
		return {
			...state,
			configKeywordDelete: {
				...state.configKeywordDelete,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_SUBCAT_KEYWORD_DELETE_ERROR]: (state, action) => {
		return {
			...state,
			configKeywordDelete: {
				...state.configKeywordDelete,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},
};

export default (state = initialState, action) => {
	const handler = ACTION_HANDLERS[action.type];
	return handler ? handler(state, action) : state;
};
