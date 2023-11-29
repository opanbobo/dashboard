import * as types from 'store/types';

const initialState = {
	excelCol: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	excelCreate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	excelUpdate: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
	excelDelete: {
		result: {},
		error: null,
		loading: false,
		loaded: false,
	},
};

const ACTION_HANDLERS = {
	[types.LOAD_EXCEL_COLUMNS]: (state) => {
		return {
			...state,
			excelCol: {
				...state.excelCol,
				error: null,
				loading: true,
				loaded: false,
			},
		};
	},
	[types.LOAD_EXCEL_COLUMNS_SUCCESS]: (state, action) => {
		return {
			...state,
			excelCol: {
				...state.excelCol,
				result: action.result ? action.result : {},
				error: null,
				loading: false,
				loaded: true,
			},
		};
	},
	[types.LOAD_EXCEL_COLUMNS_ERROR]: (state, action) => {
		return {
			...state,
			excelCol: {
				...state.excelCol,
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
