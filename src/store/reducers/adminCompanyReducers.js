import * as types from 'store/types';

const initialState = {
	adminAllCompany: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	adminLevel: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	adminListCompany: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	adminDetailCompany: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	adminCreateCompany: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	adminUpdateCompany: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	adminDeleteCompany: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_ALL_COMPANY_LIST]: (state) => {
		return {
			...state,
			adminAllCompany: {
				...state.adminAllCompany,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_ALL_COMPANY_LIST_SUCCESS]: (state, action) => {
		return {
			...state,
			adminAllCompany: {
				...state.adminAllCompany,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_ALL_COMPANY_LIST_ERROR]: (state, action) => {
		return {
			...state,
			adminAllCompany: {
				...state.adminAllCompany,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_LEVEL]: (state) => {
		return {
			...state,
			adminLevel: {
				...state.adminLevel,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_LEVEL_SUCCESS]: (state, action) => {
		return {
			...state,
			adminLevel: {
				...state.adminLevel,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_LEVEL_ERROR]: (state, action) => {
		return {
			...state,
			adminLevel: {
				...state.adminLevel,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_COMPANY_LIST]: (state) => {
		return {
			...state,
			adminListCompany: {
				...state.adminListCompany,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_COMPANY_LIST_SUCCESS]: (state, action) => {
		return {
			...state,
			adminListCompany: {
				...state.adminListCompany,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_COMPANY_LIST_ERROR]: (state, action) => {
		return {
			...state,
			adminListCompany: {
				...state.adminListCompany,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_COMPANY_CREATE]: (state) => {
		return {
			...state,
			adminCreateCompany: {
				...state.adminCreateCompany,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_COMPANY_CREATE_SUCCESS]: (state, action) => {
		return {
			...state,
			adminCreateCompany: {
				...state.adminCreateCompany,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_COMPANY_CREATE_ERROR]: (state, action) => {
		return {
			...state,
			adminCreateCompany: {
				...state.adminCreateCompany,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_COMPANY_UPDATE]: (state) => {
		return {
			...state,
			adminUpdateCompany: {
				...state.adminUpdateCompany,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_COMPANY_UPDATE_SUCCESS]: (state, action) => {
		return {
			...state,
			adminUpdateCompany: {
				...state.adminUpdateCompany,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_COMPANY_UPDATE_ERROR]: (state, action) => {
		return {
			...state,
			adminUpdateCompany: {
				...state.adminUpdateCompany,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_COMPANY_DELETE]: (state) => {
		return {
			...state,
			adminDeleteCompany: {
				...state.adminDeleteCompany,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_COMPANY_DELETE_SUCCESS]: (state, action) => {
		return {
			...state,
			adminDeleteCompany: {
				...state.adminDeleteCompany,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_COMPANY_DELETE_ERROR]: (state, action) => {
		return {
			...state,
			adminDeleteCompany: {
				...state.adminDeleteCompany,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_COMPANY_DETAIL]: (state) => {
		return {
			...state,
			adminDetailCompany: {
				...state.adminDetailCompany,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_COMPANY_DETAIL_SUCCESS]: (state, action) => {
		return {
			...state,
			adminDetailCompany: {
				...state.adminDetailCompany,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_COMPANY_DETAIL_ERROR]: (state, action) => {
		return {
			...state,
			adminDetailCompany: {
				...state.adminDetailCompany,
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
