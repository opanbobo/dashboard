import * as types from 'store/types';

const initialState = {
	stopwordList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	stopwordCreate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	stopwordDelete: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	stopwordUpdate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_STOPWORD]: (state) => {
		return {
			...state,
			stopwordList: {
				...state.stopwordList,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_STOPWORD_SUCCESS]: (state, action) => {
		return {
			...state,
			stopwordList: {
				...state.stopwordList,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_STOPWORD_ERROR]: (state, action) => {
		return {
			...state,
			stopwordList: {
				...state.stopwordList,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_STOPWORD_CREATE]: (state) => {
		return {
			...state,
			stopwordCreate: {
				...state.stopwordCreate,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_STOPWORD_CREATE_SUCCESS]: (state, action) => {
		return {
			...state,
			stopwordCreate: {
				...state.stopwordCreate,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_STOPWORD_CREATE_ERROR]: (state, action) => {
		return {
			...state,
			stopwordCreate: {
				...state.stopwordCreate,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_STOPWORD_DELETE]: (state) => {
		return {
			...state,
			stopwordDelete: {
				...state.stopwordDelete,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_STOPWORD_DELETE_SUCCESS]: (state, action) => {
		return {
			...state,
			stopwordDelete: {
				...state.stopwordDelete,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_STOPWORD_DELETE_ERROR]: (state, action) => {
		return {
			...state,
			stopwordDelete: {
				...state.stopwordDelete,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_STOPWORD_UPDATE]: (state) => {
		return {
			...state,
			stopwordUpdate: {
				...state.stopwordUpdate,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_STOPWORD_UPDATE_SUCCESS]: (state, action) => {
		return {
			...state,
			stopwordUpdate: {
				...state.stopwordUpdate,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_STOPWORD_UPDATE_ERROR]: (state, action) => {
		return {
			...state,
			stopwordUpdate: {
				...state.stopwordUpdate,
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
