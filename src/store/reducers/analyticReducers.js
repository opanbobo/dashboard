import * as types from '../types';

const initialState = {
	mediaVisibility: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	coverageTonality: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	trendingHighLights: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	toneCategory: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	toneMedia: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	ews: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	article: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	articlePositive: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	articleNegative: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	articleNeutral: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	mediaListCount: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_MEDIA_VISIBILITY]: (state) => {
		return {
			...state,
			mediaVisibility: {
				...state.mediaVisibility,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_MEDIA_VISIBILITY_SUCCESS]: (state, action) => {
		return {
			...state,
			mediaVisibility: {
				...state.mediaVisibility,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_MEDIA_VISIBILITY_ERROR]: (state, action) => {
		return {
			...state,
			mediaVisibility: {
				...state.mediaVisibility,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_COVERAGE_TONALITY]: (state) => {
		return {
			...state,
			coverageTonality: {
				...state.coverageTonality,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_COVERAGE_TONALITY_SUCCESS]: (state, action) => {
		return {
			...state,
			coverageTonality: {
				...state.coverageTonality,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_COVERAGE_TONALITY_ERROR]: (state, action) => {
		return {
			...state,
			coverageTonality: {
				...state.coverageTonality,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_TRENDING_HIGHLIGHTS]: (state) => {
		return {
			...state,
			trendingHighLights: {
				...state.trendingHighLights,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_TRENDING_HIGHLIGHTS_SUCCESS]: (state, action) => {
		return {
			...state,
			trendingHighLights: {
				...state.trendingHighLights,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_TRENDING_HIGHLIGHTS_ERROR]: (state, action) => {
		return {
			...state,
			trendingHighLights: {
				...state.trendingHighLights,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_TONE_CATEGORY]: (state) => {
		return {
			...state,
			toneCategory: {
				...state.toneCategory,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_TONE_CATEGORY_SUCCESS]: (state, action) => {
		return {
			...state,
			toneCategory: {
				...state.toneCategory,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_TONE_CATEGORY_ERROR]: (state, action) => {
		return {
			...state,
			toneCategory: {
				...state.toneCategory,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_TONE_MEDIA]: (state) => {
		return {
			...state,
			toneMedia: {
				...state.toneMedia,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_TONE_MEDIA_SUCCESS]: (state, action) => {
		return {
			...state,
			toneMedia: {
				...state.toneMedia,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_TONE_MEDIA_ERROR]: (state, action) => {
		return {
			...state,
			toneMedia: {
				...state.toneMedia,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_EWS]: (state) => {
		return {
			...state,
			ews: {
				...state.ews,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_EWS_SUCCESS]: (state, action) => {
		return {
			...state,
			ews: {
				...state.ews,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_EWS_ERROR]: (state, action) => {
		return {
			...state,
			ews: {
				...state.ews,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_ANALYTIC_ARTICLE]: (state) => {
		return {
			...state,
			article: {
				...state.article,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_ANALYTIC_ARTICLE_POSITIVE]: (state) => {
		return {
			...state,
			articlePositive: {
				...state.articlePositive,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_ANALYTIC_ARTICLE_NEGATIVE]: (state) => {
		return {
			...state,
			articleNegative: {
				...state.articleNegative,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_ANALYTIC_ARTICLE_NEUTRAL]: (state) => {
		return {
			...state,
			articlePositive: {
				...state.articlePositive,
				error: null,
				loading: true,
				loaded: false,
			},
			articleNeutral: {
				...state.articleNeutral,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_ANALYTIC_ARTICLE_SUCCESS]: (state, action) => {
		return {
			...state,
			article: {
				...state.article,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_ANALYTIC_ARTICLE_SUCCESS_POSITIVE]: (state, action) => {
		return {
			...state,
			articlePositive: {
				...state.articlePositive,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: false,
			},
		};
	},
	[types.LOAD_ANALYTIC_ARTICLE_SUCCESS_NEGATIVE]: (state, action) => {
		return {
			...state,
			articleNegative: {
				...state.articleNegative,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: false,
			},
		};
	},
	[types.LOAD_ANALYTIC_ARTICLE_SUCCESS_NEUTRAL]: (state, action) => {
		return {
			...state,
			articleNeutral: {
				...state.articleNeutral,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: false,
			},
		};
	},
	[types.LOAD_ANALYTIC_ARTICLE_ERROR]: (state, action) => {
		return {
			...state,
			article: {
				...state.article,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
			articlePositive: {
				...state.articlePositive,
				result: {},
				error: action.result ? action.result : {},
				error: null,
				loading: true,
				loaded: false,
			},
			articleNegative: {
				...state.articleNegative,
				result: {},
				error: action.result ? action.result : {},
				error: null,
				loading: true,
				loaded: false,
			},
			articleNeutral: {
				...state.articleNeutral,
				result: {},
				error: action.result ? action.result : {},
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},

	[types.LOAD_MEDIA_COUNT]: (state) => {
		return {
			...state,
			mediaListCount: {
				...state.mediaListCount,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_MEDIA_COUNT_SUCCESS]: (state, action) => {
		return {
			...state,
			mediaListCount: {
				...state.mediaListCount,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_MEDIA_COUNT_ERROR]: (state, action) => {
		return {
			...state,
			mediaListCount: {
				...state.mediaListCount,
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
