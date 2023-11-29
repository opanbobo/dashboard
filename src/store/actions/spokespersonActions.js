import * as types from "store/types";
import { fetchPost, fetchPostDemo } from "../fetch";

import cookieCutter from "cookie-cutter";

export const getSpokepersonList = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_SPOKEPERSON_LIST,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchPostDemo("influencer/", userToken.token, {
        ...body,
        tone: body.tonee,
      });
      data = await data.json();

      dispatch({
        type: types.LOAD_SPOKEPERSON_LIST_SUCCESS,
        result: data,
      });
    } catch (err) {
      dispatch({
        type: types.LOAD_SPOKEPERSON_LIST_ERROR,
        result: err,
      });
    }
  };
};

export const getSpokepersonDetail = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_SPOKEPERSON_DETAIL,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchPost("user/article-by-id", userToken.token, body);
      data = await data.json();

      dispatch({
        type: types.LOAD_SPOKEPERSON_DETAIL_SUCCESS,
        result: data,
      });
    } catch (err) {
      dispatch({
        type: types.LOAD_SPOKEPERSON_DETAIL_ERROR,
        result: err,
      });
    }
  };
};

export const updateSpokepersonTone = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_SPOKEPERSON_TONE_UPDATE,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchPostDemo(
        "user/update-tone/",
        userToken.token,
        body
      );
      data = await data.json();

      dispatch({
        type: types.LOAD_SPOKEPERSON_TONE_UPDATE_SUCCESS,
        result: data,
      });
    } catch (err) {
      dispatch({
        type: types.LOAD_SPOKEPERSON_TONE_UPDATE_ERROR,
        result: err,
      });
    }
  };
};

export const getSpokepersonStatistic = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_SPOKEPERSON_STATISTIC,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchPostDemo(
        "influencer-count-by-aliases/",
        userToken.token,
        {
          ...body,
          tone: body.tonee,
        }
      );
      data = await data.json();

      dispatch({
        type: types.LOAD_SPOKEPERSON_STATISTIC_SUCCESS,
        result: data,
      });
    } catch (err) {
      dispatch({
        type: types.LOAD_SPOKEPERSON_STATISTIC_ERROR,
        result: err,
      });
    }
  };
};

export const getSpokepersonStatisticClick = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_SPOKEPERSON_STATISTIC_CLICK,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchPostDemo("influencer-tones/", userToken.token, {
        end_date: body.end_date,
        page: body.page,
        max_size: body.max_size,
        start_date: body.start_date,
        tone: body.tone,
        influencer: body.influencer,
        order: body.order,
        category_id: body.category_id,
        category_set: body.category_set,
      });
      data = await data.json();

      dispatch({
        type: types.LOAD_SPOKEPERSON_STATISTIC_CLICK_SUCCESS,
        result: data,
      });
    } catch (err) {
      dispatch({
        type: types.LOAD_SPOKEPERSON_STATISTIC_CLICK_ERROR,
        result: err,
      });
    }
  };
};

export const postBtSpoke = (body) => {
  return new Promise((resolve, reject) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));

    return fetch("http://206.189.89.203:4945/v2/bot_backtrack", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userToken.token}`,
      },
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .then((data) => resolve(data))
      .catch((err) => resolve(err));
  });
};

export const excellSpoke = (body) => {
  return new Promise((resolve, reject) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));

    return fetchPostDemo(
      "generate-spokesperson-excel/",
      userToken.token,
      body
    ).then((data) => resolve(data));
  });
};
