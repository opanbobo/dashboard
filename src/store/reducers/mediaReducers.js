import * as types from '../types';

const initialState = {
	configMediaList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configMediaCreate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configMediaDetail: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configMediaUpdate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configMediaChosenUpdate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configMediaDelete: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configMediaChosen: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_CONFIG_MEDIA_LIST]: (state) => {
		return {
			...state,
			configMediaList: {
				...state.configMediaList,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_MEDIA_LIST_SUCCESS]: (state, action) => {
		return {
			...state,
			configMediaList: {
				...state.configMediaList,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_MEDIA_LIST_ERROR]: (state, action) => {
		return {
			...state,
			configMediaList: {
				...state.configMediaList,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_CONFIG_MEDIA_CHOSEN]: (state) => {
		return {
			...state,
			configMediaChosen: {
				...state.configMediaChosen,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_MEDIA_CHOSEN_SUCCESS]: (state, action) => {
		return {
			...state,
			configMediaChosen: {
				...state.configMediaChosen,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_MEDIA_CHOSEN_ERROR]: (state, action) => {
		return {
			...state,
			configMediaChosen: {
				...state.configMediaChosen,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_CONFIG_MEDIA_LIST_CREATE]: (state) => {
		return {
			...state,
			configMediaCreate: {
				...state.configMediaCreate,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_MEDIA_LIST_CREATE_SUCCESS]: (state, action) => {
		return {
			...state,
			configMediaCreate: {
				...state.configMediaCreate,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_MEDIA_LIST_CREATE_ERROR]: (state, action) => {
		return {
			...state,
			configMediaCreate: {
				...state.configMediaCreate,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	// [types.LOAD_CONFIG_MEDIA_LIST_UPDATE]: (state) => {
	// 	return {
	// 		...state,
	// 		configMediaUpdate: {
	// 			...state.configMediaUpdate,
	// 			error: null,
	// 			loading: true,
	// 			loaded: false,
	// 		},
	// 	};
	// },
	// [types.LOAD_CONFIG_MEDIA_LIST_UPDATE_SUCCESS]: (state, action) => {
	// 	return {
	// 		...state,
	// 		configMediaUpdate: {
	// 			...state.configMediaUpdate,
	// 			result: action.result ? action.result : {},
	// 			error: null,
	// 			loading: false,
	// 			loaded: true,
	// 		},
	// 	};
	// },
	// [types.LOAD_CONFIG_MEDIA_LIST_UPDATE_ERROR]: (state, action) => {
	// 	return {
	// 		...state,
	// 		configMediaUpdate: {
	// 			...state.configMediaUpdate,
	// 			result: {},
	// 			error: action.result ? action.result : {},
	// 			loading: false,
	// 			loaded: false,
	// 		},
	// 	};
	// },

	[types.LOAD_CONFIG_MEDIA_LIST_DELETE]: (state) => {
		return {
			...state,
			configMediaDelete: {
				...state.configMediaDelete,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_MEDIA_LIST_DELETE_SUCCESS]: (state, action) => {
		return {
			...state,
			configMediaDelete: {
				...state.configMediaDelete,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_MEDIA_LIST_DELETE_ERROR]: (state, action) => {
		return {
			...state,
			configMediaDelete: {
				...state.configMediaDelete,
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
