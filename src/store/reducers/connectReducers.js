import * as types from 'store/types';

const initialState = {
	connectMediaList: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	connectMediacat: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	connectUpload: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_CONNECT_MEDIA]: (state) => {
		return {
			...state,
			connectMediaList: {
				...state.connectMediaList,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONNECT_MEDIA_ERROR]: (state, action) => {
		return {
			...state,
			connectMediaList: {
				...state.connectMediaList,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONNECT_MEDIA_SUCCESS]: (state, action) => {
		return {
			...state,
			connectMediaList: {
				...state.connectMediaList,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONNECT_MEDIACAT]: (state) => {
		return {
			...state,
			connectMediacat: {
				...state.connectMediacat,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONNECT_MEDIACAT_ERROR]: (state, action) => {
		return {
			...state,
			connectMediacat: {
				...state.connectMediacat,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONNECT_MEDIACAT_SUCCESS]: (state, action) => {
		return {
			...state,
			connectMediacat: {
				...state.connectMediacat,
				result: action.result ? action.result : [],
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},

	[types.LOAD_CONNECT_UPLOAD]: (state) => {
		return {
			...state,
			connectUpload: {
				...state.connectUpload,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_CONNECT_UPLOAD_ERROR]: (state, action) => {
		return {
			...state,
			connectUpload: {
				...state.connectUpload,
				result: {},
				error: action.result ? action.result : [],
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_CONNECT_UPLOAD_SUCCESS]: (state, action) => {
		return {
			...state,
			connectUpload: {
				...state.connectUpload,
				result: action.result ? action.result : [],
				error: null,
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
