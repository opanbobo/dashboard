import * as types from 'store/types';

const initialState = {
	configInfluencerList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configInfluencerCreate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configInfluencerUpdate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configInfluencerDelete: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configInfluencerKeywordList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configInfluencerKeywordCreate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	configInfluencerKeywordDelete: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_CONFIG_INFLUENCER_LIST]: (state) => {
		return {
			...state,
			configInfluencerList: {
				...state.configInfluencerList,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_INFLUENCER_LIST_SUCCESS]: (state, action) => {
		return {
			...state,
			configInfluencerList: {
				...state.configInfluencerList,
				error: null,
				result: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_INFLUENCER_LIST_ERROR]: (state, action) => {
		return {
			...state,
			configInfluencerList: {
				...state.configInfluencerList,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONFIG_INFLUENCER_CREATE]: (state) => {
		return {
			...state,
			configInfluencerCreate: {
				...state.configInfluencerCreate,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_INFLUENCER_CREATE_SUCCESS]: (state, action) => {
		return {
			...state,
			configInfluencerCreate: {
				...state.configInfluencerCreate,
				error: null,
				result: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_INFLUENCER_CREATE_ERROR]: (state, action) => {
		return {
			...state,
			configInfluencerCreate: {
				...state.configInfluencerCreate,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONFIG_INFLUENCER_DELETE]: (state) => {
		return {
			...state,
			configInfluencerDelete: {
				...state.configInfluencerDelete,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONFIG_INFLUENCER_DELETE_SUCCESS]: (state, action) => {
		return {
			...state,
			configInfluencerDelete: {
				...state.configInfluencerDelete,
				error: null,
				result: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONFIG_INFLUENCER_DELETE_ERROR]: (state, action) => {
		return {
			...state,
			configInfluencerDelete: {
				...state.configInfluencerDelete,
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
