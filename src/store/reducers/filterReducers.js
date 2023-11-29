import * as types from '../types';

let now = new Date();
let yesterday = now.setDate(now.getDate() - 1);

const initialState = {
  filter: {
    result: {
      category_set: 0,
      category_id: "all",
      user_media_type_id: 0,
      media_id: "0",
      start_date: new Date(yesterday).toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" }).split(" ")[0],
      end_date: new Date().toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" }).split(" ")[0],
      tonee: undefined,
      date_type: "yesterday",
    },
  },
  media: {
    result: {},
    error: null,
    loading: false,
    loaded: false,
  },
  subMedia: {
    result: {},
    error: null,
    loading: false,
    loaded: false,
  },
  category: {
    result: {},
    error: null,
    loading: false,
    loaded: false,
  },
  subCategory: {
    result: {},
    error: null,
    loading: false,
    loaded: false,
  },
};

const ACTION_HANDLERS = {
	[types.LOAD_FILTER]: (state, action) => {
		return {
			...state,
			filter: {
				...state.filter,
				result: action.result,
			},
		};
	},

	[types.LOAD_FILTER_MEDIA]: (state) => {
		return {
			...state,
			media: {
				...state.media,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_FILTER_MEDIA_SUCCESS]: (state, action) => {
		return {
			...state,
			media: {
				...state.media,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_FILTER_MEDIA_ERROR]: (state, action) => {
		return {
			...state,
			media: {
				...state.media,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_FILTER_SUB_MEDIA]: (state) => {
		return {
			...state,
			subMedia: {
				...state.subMedia,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_FILTER_SUB_MEDIA_SUCCESS]: (state, action) => {
		return {
			...state,
			subMedia: {
				...state.subMedia,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_FILTER_SUB_MEDIA_ERROR]: (state, action) => {
		return {
			...state,
			subMedia: {
				...state.subMedia,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_FILTER_CATEGORY]: (state) => {
		return {
			...state,
			category: {
				...state.category,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_FILTER_CATEGORY_SUCCESS]: (state, action) => {
		return {
			...state,
			category: {
				...state.category,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_FILTER_CATEGORY_ERROR]: (state, action) => {
		return {
			...state,
			category: {
				...state.category,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_FILTER_SUB_CATEGORY]: (state) => {
		return {
			...state,
			subCategory: {
				...state.subCategory,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_FILTER_SUB_CATEGORY_SUCCESS]: (state, action) => {
		return {
			...state,
			subCategory: {
				...state.subCategory,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_FILTER_SUB_CATEGORY_ERROR]: (state, action) => {
		return {
			...state,
			subCategory: {
				...state.subCategory,
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
