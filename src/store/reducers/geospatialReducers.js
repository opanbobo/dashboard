import * as types from '../types';

const initialState = {
	geo: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	geoList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	geoStatus: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	geoBacktrack: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_GEO]: (state) => {
		return {
			...state,
			geo: {
				...state.geo,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_GEO_SUCCESS]: (state, action) => {
		return {
			...state,
			geo: {
				...state.geo,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_GEO_ERROR]: (state, action) => {
		return {
			...state,
			geo: {
				...state.geo,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_GEO_LIST]: (state) => {
		return {
			...state,
			geoList: {
				...state.geoList,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_GEO_LIST_SUCCESS]: (state, action) => {
		return {
			...state,
			geoList: {
				...state.geoList,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_GEO_LIST_ERROR]: (state, action) => {
		return {
			...state,
			geoList: {
				...state.geoList,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_GEO_STATUS]: (state) => {
		return {
			...state,
			geoStatus: {
				...state.geoStatus,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_GEO_STATUS_SUCCESS]: (state, action) => {
		return {
			...state,
			geoStatus: {
				...state.geoStatus,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_GEO_STATUS_ERROR]: (state, action) => {
		return {
			...state,
			geoStatus: {
				...state.geoStatus,
				result: {},
				error: action.result ? action.result : {},
				loading: false,
				loaded: false,
			},
		};
	},

	[types.LOAD_GEO_BACKTRACK]: (state) => {
		return {
			...state,
			geoBacktrack: {
				...state.geoBacktrack,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_GEO_BACKTRACK_SUCCESS]: (state, action) => {
		return {
			...state,
			geoBacktrack: {
				...state.geoBacktrack,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_GEO_BACKTRACK_ERROR]: (state, action) => {
		return {
			...state,
			geoBacktrack: {
				...state.geoBacktrack,
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
