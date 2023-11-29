import * as types from 'store/types';

const initialState = {
	configCategoryList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configCategoryCreate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configCategoryDelete: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configCategoryUpdate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configCategoryChosen: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_CONFIG_CATEGORY_LIST]: (state) => {
		return {
			...state,
			configCategoryList: {
				...state.configCategoryList,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_CATEGORY_LIST_SUCCESS]: (state, action) => {
		return {
			...state,
			configCategoryList: {
				...state.configCategoryList,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_CATEGORY_LIST_ERROR]: (state, action) => {
		return {
			...state,
			configCategoryList: {
				...state.configCategoryList,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONFIG_CATEGORY_CREATE]: (state) => {
		return {
			...state,
			configCategoryCreate: {
				...state.configCategoryCreate,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_CATEGORY_CREATE_SUCCESS]: (state, action) => {
		return {
			...state,
			configCategoryCreate: {
				...state.configCategoryCreate,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_CATEGORY_CREATE_ERROR]: (state, action) => {
		return {
			...state,
			configCategoryCreate: {
				...state.configCategoryCreate,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONFIG_CATEGORY_DELETE]: (state) => {
		return {
			...state,
			configCategoryDelete: {
				...state.configCategoryDelete,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_CATEGORY_DELETE_SUCCESS]: (state, action) => {
		return {
			...state,
			configCategoryDelete: {
				...state.configCategoryDelete,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_CATEGORY_DELETE_ERROR]: (state, action) => {
		return {
			...state,
			configCategoryDelete: {
				...state.configCategoryDelete,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONFIG_CATEGORY_UPDATE]: (state) => {
		return {
			...state,
			configCategoryUpdate: {
				...state.configCategoryUpdate,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_CATEGORY_UPDATE_SUCCESS]: (state, action) => {
		return {
			...state,
			configCategoryUpdate: {
				...state.configCategoryUpdate,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_CATEGORY_UPDATE_ERROR]: (state, action) => {
		return {
			...state,
			configCategoryUpdate: {
				...state.configCategoryUpdate,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONFIG_CATEGORY_CHOSEN]: (state) => {
		return {
			...state,
			configCategoryChosen: {
				...state.configCategoryChosen,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_CATEGORY_CHOSEN_SUCCESS]: (state, action) => {
		return {
			...state,
			configCategoryChosen: {
				...state.configCategoryChosen,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_CATEGORY_CHOSEN_ERROR]: (state, action) => {
		return {
			...state,
			configCategoryChosen: {
				...state.configCategoryChosen,
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
