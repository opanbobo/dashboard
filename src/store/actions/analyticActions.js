import * as types from "../types";
import { fetchPost, fetchPostInsight } from "../fetch";
import cookieCutter from "cookie-cutter";

export const getMediaVisibility = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_MEDIA_VISIBILITY,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchPost(
        "dashboard/media-visibility",
        userToken.token,
        body
      );

      data = await data.json();

      dispatch({
        type: types.LOAD_MEDIA_VISIBILITY_SUCCESS,
        result: data,
      });
    } catch (err) {
      dispatch({
        type: types.LOAD_MEDIA_VISIBILITY_ERROR,
        result: err,
      });
    }
  };
};

export const getCoverageTonality = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_COVERAGE_TONALITY,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchPost("dashboard/tones", userToken.token, body);

      data = await data.json();

      data.data.widget = data.data.total.map((mention) => ({
        id: mention.key,
        type:
          mention.key == 1
            ? "positive"
            : mention.key == 0
            ? "neutral"
            : "negative",
        label: `${
          mention.key == 1
            ? "positive"
            : mention.key == 0
            ? "neutral"
            : "negative"
        } mention`,
        description: "since last week",
        total: mention.total_now,
        status: mention.status,
        percent: mention.comparison,
      }));

      return dispatch({
        type: types.LOAD_COVERAGE_TONALITY_SUCCESS,
        result: data,
      });
    } catch (err) {
      return dispatch({
        type: types.LOAD_COVERAGE_TONALITY_ERROR,
        result: err,
      });
    }
  };
};

export const getTrendingHighLights = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_TRENDING_HIGHLIGHTS,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchPost(
        "dashboard/high-lights",
        userToken.token,
        body
      );

      data = await data.json();

      return dispatch({
        type: types.LOAD_TRENDING_HIGHLIGHTS_SUCCESS,
        result: data,
      });
    } catch (err) {
      return dispatch({
        type: types.LOAD_TRENDING_HIGHLIGHTS_ERROR,
        result: err,
      });
    }
  };
};

export const getToneCategory = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_TONE_CATEGORY,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchPost(
        "dashboard/tone-by-category",
        userToken.token,
        body
      );

      data = await data.json();

      return dispatch({
        type: types.LOAD_TONE_CATEGORY_SUCCESS,
        result: data,
      });
    } catch (err) {
      return dispatch({
        type: types.LOAD_TONE_CATEGORY_ERROR,
        result: err,
      });
    }
  };
};

export const getToneMedia = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_TONE_MEDIA,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data = await fetchPost(
        "dashboard/tone-by-media",
        userToken.token,
        body
      );

      data = await data.json();

      return dispatch({
        type: types.LOAD_TONE_MEDIA_SUCCESS,
        result: data,
      });
    } catch (err) {
      return dispatch({
        type: types.LOAD_TONE_MEDIA_ERROR,
        result: err,
      });
    }
  };
};

export const getEWS = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_EWS,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let temp = await fetchPost(
        "dashboard/tone-by-media-tier",
        userToken.token,
        body
      );

      temp = await temp.json();

      temp = temp;

      let datacategories = [];
      let datadate = [];
      let dataseries = [];

      temp.data.forEach((element) => {
        datacategories.push(element.category_id);
        element.dates.forEach((item) => {
          if (!datadate.includes(item.date)) {
            datadate.push(item.date);
          }
        });
        let category_id = [];
        for (let i = 0; i < temp.data.length; i++) {
          let datesArr = [];
          for (let j = 0; j < temp.data[i].dates.length; j++) {
            let positive = 0;
            let negative = 0;
            for (let k = 0; k < temp.data[i].dates[j].tones.length; k++) {
              if (temp.data[i].dates[j].tones[k].tonality > 0) {
                positive = temp.data[i].dates[j].tones[k].summary_by_tier;
              } else if (temp.data[i].dates[j].tones[k].tonality < 0) {
                negative = temp.data[i].dates[j].tones[k].summary_by_tier;
              }
            }
            let val = positive - negative;
            if (val < 0) {
              val = 0 - val;
              if (val > 15) {
                val = 15;
              }
            } else if (negative > 0) {
              val = 1;
            } else {
              val = 0;
            }
            datesArr.push(val);
          }
          category_id.push({
            name: temp.data[i].category_id,
            data: datesArr,
          });
        }
        dataseries = category_id;
      });

      return dispatch({
        type: types.LOAD_EWS_SUCCESS,
        result: {
          categories: datacategories,
          date: datadate,
          series: dataseries,
        },
      });
    } catch (err) {
      return dispatch({
        type: types.LOAD_EWS_ERROR,
        result: err,
      });
    }
  };
};

export const getAnalyticArticle = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_ANALYTIC_ARTICLE,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data;

      if (body.tone) {
        data = await fetchPost(
          "dashboard/article-by-tone",
          userToken.token,
          body
        );
      } else {
        data = await fetchPost("user/editing/", userToken.token, {
          ...body,
          tone: body.tonee,
        });
      }

      data = await data.json();

      return dispatch({
        type: types.LOAD_ANALYTIC_ARTICLE_SUCCESS,
        result: data,
      });
    } catch (err) {
      return dispatch({
        type: types.LOAD_ANALYTIC_ARTICLE_ERROR,
        result: err,
      });
    }
  };
};

export const getAnalyticArticlePositive = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_ANALYTIC_ARTICLE_POSITIVE,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data;

      if (body.tone) {
        data = await fetchPost(
          "dashboard/article-by-tone",
          userToken.token,
          body
        );
      } else {
        data = await fetchPost("user/editing/", userToken.token, {
          ...body,
          tone: body.tonee,
        });
      }

      data = await data.json();

      return dispatch({
        type: types.LOAD_ANALYTIC_ARTICLE_SUCCESS_POSITIVE,
        result: data,
      });
    } catch (err) {
      return dispatch({
        type: types.LOAD_ANALYTIC_ARTICLE_ERROR,
        result: err,
      });
    }
  };
};

export const getAnalyticArticleNeutral = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_ANALYTIC_ARTICLE_NEUTRAL,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data;

      if (body.tone) {
        data = await fetchPost(
          "dashboard/article-by-tone",
          userToken.token,
          body
        );
      } else {
        data = await fetchPost("user/editing/", userToken.token, {
          ...body,
          tone: body.tonee,
        });
      }

      data = await data.json();

      return dispatch({
        type: types.LOAD_ANALYTIC_ARTICLE_SUCCESS_NEUTRAL,
        result: data,
      });
    } catch (err) {
      return dispatch({
        type: types.LOAD_ANALYTIC_ARTICLE_ERROR,
        result: err,
      });
    }
  };
};

export const getAnalyticArticleNegative = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_ANALYTIC_ARTICLE_NEGATIVE,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      let data;

      if (body.tone) {
        data = await fetchPost(
          "dashboard/article-by-tone",
          userToken.token,
          body
        );
      } else {
        data = await fetchPost("user/editing/", userToken.token, {
          ...body,
          tone: body.tonee,
        });
      }

      data = await data.json();

      return dispatch({
        type: types.LOAD_ANALYTIC_ARTICLE_SUCCESS_NEGATIVE,
        result: data,
      });
    } catch (err) {
      return dispatch({
        type: types.LOAD_ANALYTIC_ARTICLE_ERROR,
        result: err,
      });
    }
  };
};

export const getMediaCount = (body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.LOAD_MEDIA_COUNT,
      });
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      let data = await fetchPost(
        "dashboard/media-count",
        userToken.token,
        body
      );

      data = await data.json();

      return dispatch({
        type: types.LOAD_MEDIA_COUNT_SUCCESS,
        result: data,
      });
    } catch (err) {
      return dispatch({
        type: types.LOAD_MEDIA_COUNT_ERROR,
        result: err,
      });
    }
  };
};

export const downloadPpt = (body) => {
  return new Promise((resolve, reject) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));

    return fetchPost("user/downloads/pptx", userToken.token, body).then(
      (data) => resolve(data)
    );
  });
};

export const downloadExcel = (body) => {
  return new Promise((resolve, reject) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));

    if (body.logoType)
      return fetchPostInsight(
        "dashboard/download-excel",
        userToken.token,
        body
      ).then((data) => resolve(data));

    return fetchPost("dashboard/download-excel", userToken.token, body).then(
      (data) => resolve(data)
    );
  });
};
