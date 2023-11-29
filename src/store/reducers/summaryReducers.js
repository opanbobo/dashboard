import * as types from "../types";

const initialState = {
  wordCloud: {
    result: {},
    error: null,
    loading: false,
    loaded: false,
  },
  medCountArticle: {
    result: {},
    error: null,
    loading: false,
    loaded: false,
  },
};

const ACTION_HANDLERS = {
  [types.LOAD_WORD_CLOUD]: (state) => {
    return {
      ...state,
      wordCloud: {
        ...state.wordCloud,
        error: null,
        loading: true,
        loaded: false,
      },
    };
  },
  [types.LOAD_WORD_CLOUD_SUCCESS]: (state, action) => {
    return {
      ...state,
      wordCloud: {
        ...state.wordCloud,
        result: action.result ? action.result : {},
        error: null,
        loading: false,
        loaded: true,
      },
    };
  },
  [types.LOAD_WORD_CLOUD_ERROR]: (state, action) => {
    return {
      ...state,
      wordCloud: {
        ...state.wordCloud,
        result: {},
        error: action.result ? action.result : {},
        loading: false,
        loaded: false,
      },
    };
  },

  [types.LOAD_MED_COUNT_ARTICLE]: (state) => {
    return {
      ...state,
      medCountArticle: {
        ...state.medCountArticle,
        error: null,
        loading: true,
        loaded: false,
      },
    };
  },
  [types.LOAD_MED_COUNT_ARTICLE_SUCCESS]: (state, action) => {
    return {
      ...state,
      medCountArticle: {
        ...state.medCountArticle,
        result: action.result ? action.result : {},
        error: null,
        loading: false,
        loaded: true,
      },
    };
  },
  [types.LOAD_MED_COUNT_ARTICLE_ERROR]: (state, action) => {
    return {
      ...state,
      medCountArticle: {
        ...state.medCountArticle,
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
