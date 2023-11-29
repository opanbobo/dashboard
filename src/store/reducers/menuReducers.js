import * as types from '../types';

const initialState = {
	menuList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_MENU_LIST]: (state, action) => {
		return {
			...state,
			menuList: {
				...state.menuList,
				result: {},
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_MENU_LIST_SUCCESS]: (state, action) => {
		return {
			...state,
			menuList: {
				...state.menuList,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_MENU_LIST_ERROR]: (state, action) => {
		return {
			...state,
			menuList: {
				...state.menuList,
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
