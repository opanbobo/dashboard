import * as types from "../types";
import { fetchGet } from "../fetch";
import cookieCutter from "cookie-cutter";

export const setFilter = (body) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOAD_FILTER,
      result: body
    });
  };
};

export const getFilterMedia = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_FILTER_MEDIA,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchGet("user/medias/", userToken.token);

      data = await data.json();

      data.results.unshift({ user_media_type_id: 0, user_media_type_name_def: "All Media" });

      dispatch({
        type: types.LOAD_FILTER_MEDIA_SUCCESS,
        result: data,
      });
    } catch (err) {
      dispatch({
        type: types.LOAD_FILTER_MEDIA_ERROR,
        result: err,
      });
    }
  };
};

export const getFilterSubMedia = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_FILTER_SUB_MEDIA,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchGet(`user/submedias/${body}?page=1`, userToken.token);

      data = await data.json();

      data.results.unshift({ media_id: "0", media_name: "All Sub Media" });

      dispatch({
        type: types.LOAD_FILTER_SUB_MEDIA_SUCCESS,
        result: data,
      });
    } catch (err) {
      dispatch({
        type: types.LOAD_FILTER_SUB_MEDIA_ERROR,
        result: err,
      });
    }
  };
};

export const getFilterCategory = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_FILTER_CATEGORY,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchGet("user/categories/", userToken.token);

      data = await data.json();

      data.results.unshift({ category_set: 0, descriptionz: "All Category" });

      dispatch({
        type: types.LOAD_FILTER_CATEGORY_SUCCESS,
        result: data,
      });
    } catch (err) {
      dispatch({
        type: types.LOAD_FILTER_CATEGORY_ERROR,
        result: err,
      });
    }
  };
};

export const getFilterSubCategory = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_FILTER_SUB_CATEGORY,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchGet(`user/subcategories/${body}`, userToken.token);

      data = await data.json();

      data.results.unshift({ category_id: "all", label: "All Sub Category" });

      dispatch({
        type: types.LOAD_FILTER_SUB_CATEGORY_SUCCESS,
        result: data,
      });
    } catch (err) {
      dispatch({
        type: types.LOAD_FILTER_SUB_CATEGORY_ERROR,
        result: err,
      });
    }
  };
};
