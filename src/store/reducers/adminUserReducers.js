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
	adminListUser: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	adminCreateUser: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	adminUpdateUser: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	adminDeleteUser: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	adminDetailUser: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_LEVEL_ADMIN]: (state) => {
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
	[types.LOAD_LEVEL_ADMIN_SUCCESS]: (state, action) => {
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
	[types.LOAD_LEVEL_ADMIN_ERROR]: (state, action) => {
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
	[types.LOAD_USER_LIST]: (state) => {
		return {
			...state,
			adminListUser: {
				...state.adminListUser,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_USER_LIST_SUCCESS]: (state, action) => {
		return {
			...state,
			adminListUser: {
				...state.adminListUser,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_USER_LIST_ERROR]: (state, action) => {
		return {
			...state,
			adminListUser: {
				...state.adminListUser,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_USER_CREATE]: (state) => {
		return {
			...state,
			adminCreateUser: {
				...state.adminCreateUser,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_USER_CREATE_SUCCESS]: (state, action) => {
		return {
			...state,
			adminCreateUser: {
				...state.adminCreateUser,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_USER_CREATE_ERROR]: (state, action) => {
		return {
			...state,
			adminCreateUser: {
				...state.adminCreateUser,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_USER_UPDATE]: (state) => {
		return {
			...state,
			adminUpdateUser: {
				...state.adminUpdateUser,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_USER_UPDATE_SUCCESS]: (state, action) => {
		return {
			...state,
			adminUpdateUser: {
				...state.adminUpdateUser,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_USER_UPDATE_ERROR]: (state, action) => {
		return {
			...state,
			adminUpdateUser: {
				...state.adminUpdateUser,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_USER_DELETE]: (state) => {
		return {
			...state,
			adminDeleteUser: {
				...state.adminDeleteUser,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_USER_DELETE_SUCCESS]: (state, action) => {
		return {
			...state,
			adminDeleteUser: {
				...state.adminDeleteUser,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_USER_DELETE_ERROR]: (state, action) => {
		return {
			...state,
			adminDeleteUser: {
				...state.adminDeleteUser,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_USER_DETAIL]: (state) => {
		return {
			...state,
			adminDetailUser: {
				...state.adminDetailUser,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_USER_DETAIL_SUCCESS]: (state, action) => {
		return {
			...state,
			adminDetailUser: {
				...state.adminDetailUser,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_USER_DETAIL_ERROR]: (state, action) => {
		return {
			...state,
			adminDetailUser: {
				...state.adminDetailUser,
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
