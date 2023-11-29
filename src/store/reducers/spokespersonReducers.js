import * as types from '../types';

const initialState = {
	spokepersonList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	spokepersonDetail: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	spokepersonToneUpdate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	spokepersonStatistic: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	spokepersonStatisticClick: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_SPOKEPERSON_LIST]: (state) => {
		return {
			...state,
			spokepersonList: {
				...state.spokepersonList,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_SPOKEPERSON_LIST_SUCCESS]: (state, action) => {
		return {
			...state,
			spokepersonList: {
				...state.spokepersonList,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_SPOKEPERSON_LIST_ERROR]: (state, action) => {
		return {
			...state,
			spokepersonList: {
				...state.spokepersonList,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_SPOKEPERSON_DETAIL]: (state) => {
		return {
			...state,
			spokepersonDetail: {
				...state.spokepersonDetail,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_SPOKEPERSON_DETAIL_SUCCESS]: (state, action) => {
		return {
			...state,
			spokepersonDetail: {
				...state.spokepersonDetail,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_SPOKEPERSON_DETAIL_ERROR]: (state, action) => {
		return {
			...state,
			spokepersonDetail: {
				...state.spokepersonDetail,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_SPOKEPERSON_TONE_UPDATE]: (state) => {
		return {
			...state,
			spokepersonToneUpdate: {
				...state.spokepersonToneUpdate,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_SPOKEPERSON_TONE_UPDATE_SUCCESS]: (state, action) => {
		return {
			...state,
			spokepersonToneUpdate: {
				...state.spokepersonToneUpdate,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_SPOKEPERSON_TONE_UPDATE_ERROR]: (state, action) => {
		return {
			...state,
			spokepersonToneUpdate: {
				...state.spokepersonToneUpdate,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_SPOKEPERSON_STATISTIC]: (state) => {
		return {
			...state,
			spokepersonStatistic: {
				...state.spokepersonStatistic,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_SPOKEPERSON_STATISTIC_SUCCESS]: (state, action) => {
		return {
			...state,
			spokepersonStatistic: {
				...state.spokepersonStatistic,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_SPOKEPERSON_STATISTIC_ERROR]: (state, action) => {
		return {
			...state,
			spokepersonStatistic: {
				...state.spokepersonStatistic,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_SPOKEPERSON_STATISTIC_CLICK]: (state) => {
		return {
			...state,
			spokepersonStatisticClick: {
				...state.spokepersonStatisticClick,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_SPOKEPERSON_STATISTIC_CLICK_SUCCESS]: (state, action) => {
		return {
			...state,
			spokepersonStatisticClick: {
				...state.spokepersonStatisticClick,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_SPOKEPERSON_STATISTIC_CLICK_ERROR]: (state, action) => {
		return {
			...state,
			spokepersonStatisticClick: {
				...state.spokepersonStatisticClick,
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
