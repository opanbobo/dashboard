import * as types from "../types";
import { fetchPostV2, fetchPost } from "../fetch";
import cookieCutter from "cookie-cutter";

export const getWordcloud = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_WORD_CLOUD,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchPostV2("dashboard/wordcloud", userToken.token, body);

      data = await data.json();

      dispatch({
        type: types.LOAD_WORD_CLOUD_SUCCESS,
        result: data,
      });
    } catch (err) {
      dispatch({
        type: types.LOAD_WORD_CLOUD_ERROR,
        result: err,
      });
    }
  };
};

export const postBacktrackWordcloud = (body) => {
	return new Promise((resolve, reject) => {
		const userToken = JSON.parse(localStorage.getItem("userToken"));

		return fetchPostV2('dashboard/wordcloud/register', userToken.token, body).then((data) => resolve(data));
	});
};

export const getMediaCountArticle = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_MED_COUNT_ARTICLE,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));
  
      let data = await fetchPost("dashboard/media-count/articles", userToken.token, body);
  
      data = await data.json();
  
      dispatch({
        type: types.LOAD_MED_COUNT_ARTICLE_SUCCESS,
        result: data,
      });
    } catch (err) {
      dispatch({
        type: types.LOAD_MED_COUNT_ARTICLE_ERROR,
        result: err,
      });
    }
  }
}