import * as types from 'store/types';

const initialState = {
	aliasCreate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	aliasList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	aliasDelete: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_ALIAS_LIST]: (state) => {
		return {
			...state,
			aliasList: {
				...state.aliasList,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_ALIAS_LIST_SUCCESS]: (state, action) => {
		return {
			...state,
			aliasList: {
				...state.aliasList,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_ALIAS_LIST_ERROR]: (state, action) => {
		return {
			...state,
			aliasList: {
				...state.aliasList,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_ALIAS_CREATE]: (state) => {
		return {
			...state,
			aliasCreate: {
				...state.aliasCreate,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_ALIAS_CREATE_SUCCESS]: (state, action) => {
		return {
			...state,
			aliasCreate: {
				...state.aliasCreate,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_ALIAS_CREATE_ERROR]: (state, action) => {
		return {
			...state,
			aliasCreate: {
				...state.aliasCreate,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_ALIAS_DELETE]: (state) => {
		return {
			...state,
			aliasDelete: {
				...state.aliasDelete,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_ALIAS_DELETE_SUCCESS]: (state, action) => {
		return {
			...state,
			aliasDelete: {
				...state.aliasDelete,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_ALIAS_DELETE_ERROR]: (state, action) => {
		return {
			...state,
			aliasDelete: {
				...state.aliasDelete,
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
