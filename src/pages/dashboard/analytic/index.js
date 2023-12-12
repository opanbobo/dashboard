import { useState, useEffect, createRef, useRef, useMemo } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { Divider } from "antd";

import {
  Tabset,
  Widget,
  Card,
  ColumnList,
  Row,
  Col,
  Button,
  Dropdown,
  notification,
  Modal,
  ApexChart,
  Checkbox,
} from "components";
import { WidgetSeries } from "constant/mock/data";
import { BarHorizontal, LineOptions } from "constant/mock/options";

import breakPointOberver from "constant/mediaQuery";

import SummaryTone from "modules/analytic/summaryTone";
import EarlyWarning from "modules/ews";
import MediaTabs from "modules/analytic/media";
import ToneTabs from "modules/analytic/tone";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadExcel,
  downloadPpt,
  getAnalyticArticle,
  getCoverageTonality,
  getEWS,
  getMediaVisibility,
  getToneCategory,
  getToneMedia,
  getTrendingHighLights,
} from "store/actions/analyticActions";

import Popchart from "modules/popup/popchart";
import DetailArticle from "modules/popup/detailArticle";
import { getKeywordArticle } from "store/actions/newsClippingActions";
import ExcelSelection from "modules/excell/excellSelection";
import { getExcelColumn } from "store/actions/excellcolActions";
import { getFilterCategory } from "store/actions/filterActions";

const breakPoints = {
  tablet: "(min-width: 300px) and (max-width: 780px)",
};

const Analytic = () => {
  const dispatch = useDispatch();
  const analytic = useSelector((state) => state.analytic);
  const filters = useSelector((state) => state.filter);
  const excellconfig = useSelector((state) => state.excellconfig);

  const {
    mediaVisibility,
    coverageTonality,
    trendingHighLights,
    toneCategory,
    toneMedia,
    ews,
    article,
  } = analytic;
  const { filter, category } = filters;
  const { excelCol } = excellconfig;

  const [modal, setModal] = useState(false);
  const [modalLoading, setmodalLoading] = useState(true);
  const [articleData, setArticleData] = useState({});
  const [trendingDetail, setTrendingDetail] = useState({});
  const [modalTrending, setModalTrending] = useState(false);

  const [modalPpt, setModalPpt] = useState(false);
  const [modalExcel, setModalExcel] = useState(false);

  const [testLoading, settestLoading] = useState(true);
  const [keyword, setKeyword] = useState([]);
  const [excelLoading, setExcelLoading] = useState(false);

  const [breakPoint, setbreakPoint] = useState();

  const [indeterminate, setIndeterminate] = useState(true);
  const [excelColumn, setExcelColumn] = useState({
    ...filter.result,
    columns: [],
  });
  const [excelCategory, setExcelCategory] = useState({
    ...filter.result,
    columns: [],
  });

  useEffect(() => {
    breakPointOberver(breakPoints, setbreakPoint);
  }, [breakPoint]);

  const excelCat = useMemo(() => {
    return (
      category.result.results
        ?.filter((e) => e.category_set !== 0)
        .map((e) => ({
          ...e,
          checked: false,
        })) || []
    );
  }, [category]);

  useEffect(() => {
    dispatch(getMediaVisibility(filter.result));

    dispatch(getCoverageTonality(filter.result));

    dispatch(getTrendingHighLights(filter.result));

    dispatch(getToneCategory(filter.result));

    dispatch(getToneMedia(filter.result));

    dispatch(getEWS(filter.result));
  }, [filter]);

  useEffect(() => {
    setTimeout(() => {
      setmodalLoading(false);
    }, 200);
  }, [modalLoading]);

  useEffect(() => {
    setTimeout(() => {
      settestLoading(false);
    }, 100000);
  }, [testLoading]);

  const handleClikable = (body) => {
    const bodyDateStart = body.data.x;
    let bodyDateEnd = body.data.x;
    const tempD = new Date(body.data.x);

    const bodyDateStartY = body.data.y;
    let bodyDateEndY = body.data.y;
    const tempDY = new Date(body.data.y);

    const d1 = new Date(filter.result.start_date);
    const d2 = new Date(filter.result.end_date);

    if (Math.abs(d1 - d2) / 86400000 > 31) {
      if (body.type !== "tonality") {
        let month = body.data.x.split("-");

        const lastDayOfMonth = new Date(
          tempD.getFullYear(),
          tempD.getMonth() + 1,
          0
        ).getDate();
        month[2] = lastDayOfMonth;
        month = month.join("-");
        bodyDateEnd = month;
      } else {
        let monthY = body.data.y.split("-");

        const lastDayOfMonthY = new Date(
          tempDY.getFullYear(),
          tempDY.getMonth() + 1,
          0
        ).getDate();

        monthY[2] = lastDayOfMonthY;
        monthY = monthY.join("-");
        bodyDateEndY = monthY;
      }
    }

    if (body.type == "visibility") {
      dispatch(
        getAnalyticArticle({
          ...filter.result,
          category_id: body.data.y,
          start_date: bodyDateStart,
          end_date: bodyDateEnd,
          page: body.page,
          maxSize: body.maxSize,
        })
      );

      setArticleData({
        ...body,
        desc: {
          Category: body.data.y,
          "Start Date": bodyDateStart,
          "End Date": bodyDateEnd,
        },
      });
    } else if (body.type == "pie") {
      dispatch(
        getAnalyticArticle({
          ...filter.result,
          category_id: body.data.y,
          start_date: filter.result.start_date,
          end_date: filter.result.end_date,
          page: body.page,
          maxSize: body.maxSize,
        })
      );

      setArticleData({
        ...body,
        desc: {
          Category: body.data.y,
        },
      });
    } else if (body.type == "pie-cov") {
      dispatch(
        getAnalyticArticle({
          ...filter.result,
          tone: body.data.y,
          start_date: filter.result.start_date,
          end_date: filter.result.end_date,
          page: body.page,
          maxSize: body.maxSize,
        })
      );

      setArticleData({
        ...body,
        desc: {
          Tone:
            body.data.y == 1
              ? "Positive"
              : body.data.y == -1
              ? "Negative"
              : "Neutral",
        },
      });
    } else if (body.type == "coverage") {
      dispatch(
        getAnalyticArticle({
          ...filter.result,
          tone: body.data.y,
          start_date: bodyDateStart,
          end_date: bodyDateEnd,
          page: body.page,
          maxSize: body.maxSize,
        })
      );

      setArticleData({
        ...body,
        desc: {
          Tone:
            body.data.y == 1
              ? "Positive"
              : body.data.y == -1
              ? "Negative"
              : "Neutral",
          "Start Date": bodyDateStart,
          "End Date": bodyDateEnd,
        },
      });
    } else if (body.type == "coverage-bar") {
      dispatch(
        getAnalyticArticle({
          ...filter.result,
          tone: body.data.x,
          media_id: body.data.y,
          start_date: filter.result.start_date,
          end_date: filter.result.end_date,
          page: body.page,
          maxSize: body.maxSize,
        })
      );

      setArticleData({
        ...body,
        desc: {
          Tone:
            body.data.x == 1
              ? "Positive"
              : body.data.x == -1
              ? "Negative"
              : "Neutral",
          Date: body.data.media_name,
        },
      });
    } else if (body.type == "coverage-barhor") {
      dispatch(
        getAnalyticArticle({
          ...filter.result,
          category_id: body.data.y,
          tone: body.data.x,
          start_date: filter.result.start_date,
          end_date: filter.result.end_date,
          page: body.page,
          maxSize: body.maxSize,
        })
      );

      setArticleData({
        ...body,
        desc: {
          Tone:
            body.data.x == 1
              ? "Positive"
              : body.data.x == -1
              ? "Negative"
              : "Neutral",
          Category: body.data.y,
        },
      });
    } else if (body.type == "ews") {
      dispatch(
        getAnalyticArticle({
          ...filter.result,
          category_id: body.data.y,
          start_date: bodyDateStart,
          end_date: bodyDateEnd,
          page: body.page,
          maxSize: body.maxSize,
        })
      );

      setArticleData({
        ...body,
        desc: {
          Category: body.data.y,
          "Start Date": bodyDateStart,
          "End Date": bodyDateEnd,
        },
      });
    } else if (body.type == "tonality") {
      dispatch(
        getAnalyticArticle({
          ...filter.result,
          tone: body.data.x,
          start_date: bodyDateStartY,
          end_date: bodyDateEndY,
          page: body.page,
          maxSize: body.maxSize,
        })
      );

      setArticleData({
        ...body,
        desc: {
          Tone:
            body.data.x == 1
              ? "Positive"
              : body.data.x == -1
              ? "Negative"
              : "Neutral",
          "Start Date": bodyDateStartY,
          "End Date": bodyDateEndY,
        },
      });
    }

    setModal(true);
  };

  const ModalChart = () => {
    return (
      <Popchart
        onDetailClick={(e) => {
          setArticleDetail(e);
          setDetailOpen(true);
        }}
        onLoading={article.loading}
        modal={{
          title: `Article List ${
            articleData.desc
              ? "(" +
                Object.keys(articleData.desc).map(
                  (key) => key + ": " + articleData.desc[key]
                ) +
                ")"
              : ""
          }`,
          visible: modal && !article.loading,
          close: () => setModal(false),
        }}
        data={
          article.result.data?.map((item) => {
            return {
              id: item.article_id,
              title: item.title,
              content: item.content,
              detail: item,
            };
          }) || []
        }
        pagination={{
          showSizeChanger: true,
          total: article.result.recordsTotal || 0,
          showTotal: (total) => `Total ${article.result.recordsTotal} data`,
          defaultPageSize: articleData.maxSize || 0,
          defaultCurrent: articleData.page + 1 || 0,
          onChange: (page, pageSize) =>
            handleClikable({
              ...articleData,
              page: page - 1,
              maxSize: pageSize,
            }),
        }}
      />
    );
  };

  const getMediaSelection = (raw) => {
    let negative = [];
    let positive = [];
    let neutral = [];

    raw.forEach((item) => {
      item.tones.forEach((tone) => {
        if (tone.negative) {
          negative.push(tone.negative);
        } else if (tone.positive) {
          positive.push(tone.positive);
        } else if (tone.neutral) {
          neutral.push(tone.neutral);
        }
      });
    });

    return [
      {
        name: "Negative",
        data: negative,
      },
      {
        name: "Neutral",
        data: neutral,
      },
      {
        name: "Positive",
        data: positive,
      },
    ];
  };

  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    // const a = document.createElement('a');
    // a.href = image;
    // a.download = createFileName(extension, name);
    // a.click();
  };

  const downloadScreenshot = async () => {
    notification.info({
      message:
        "Currently downloading the power point. Please wait for a while because this process will take some time until the process is complete, thank you",
    });

    let datatemp = [];
    let refArray = [ref, ref2, ref3, ref4, ref5, ref6];

    for (let i = 0; i < refArray.length; i++) {
      const a = await takeScreenShot(refArray[i].current);
      datatemp.push(a);
    }

    downloadPpt(datatemp)
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          window.open(data.data);
        }
      })
      .catch((err) => {
        notification.error({ message: err.message });
      });
  };

  const handleDownloadPpt = () => {
    setModalPpt(true);
  };

  const changeAllExcelColumn = (e) => {
    e.target.checked
      ? setExcelColumn({
          ...excelColumn,
          columns: excelCol.result.data.map((e) => e.name),
        })
      : setExcelColumn({
          ...excelColumn,
          columns: [],
        });
  };

  const changeAllExcelCategory = (e) => {
    e.target.checked
      ? setExcelCategory({
          ...excelCategory,
          columns: excelCat.map((e) => e.category_set),
        })
      : setExcelCategory({
          ...excelCategory,
          columns: [],
        });
  };

  const changeExcelColumn = (list) => {
    setExcelColumn({
      ...excelColumn,
      columns: list,
    });
  };

  const changeExcelCategory = (list) => {
    setExcelCategory({
      ...excelCategory,
      columns: list,
    });
  };

  const logoType = useMemo(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

    return origin === "https://ojk.media-insight.id";
  }, []);

  const handleExcelDownload = () => {
    setExcelLoading(true);
    downloadExcel({
      url: logoType,
      columns: excelColumn.columns,
      ...filter.result,
      category_set: excelCategory.columns.join(","),
    })
      .then((data) => data.json())
      .then((data) => {
        window.open(data.data);
        setExcelLoading(false);
        setModalExcel(false);
        setExcelColumn({
          ...filter.result,
          columns: [],
        });
      })
      .catch((err) => {
        notification.error({ message: "Error when download excel!" });
        setExcelLoading(false);
        setModalExcel(false);
        setExcelColumn({
          ...filter.result,
          columns: [],
        });
      });
  };

  const downloadMenu = (
    <>
      <Button
        style={downloadBtn}
        icons="FilePptFilled"
        shape="round"
        type="primary"
        danger="true"
        onClick={() => {
          handleDownloadPpt();
        }}
      >
        PPT File
      </Button>
      <span style={{ margin: "4px 0" }}></span>
      <Button
        style={{ background: "#06d6a0", border: "#06d6a0" }}
        icons="FileExcelFilled"
        shape="round"
        type="primary"
        onClick={() => {
          dispatch(getExcelColumn(filter.result));
          dispatch(getFilterCategory());
          setModalExcel(true);

          if (filter.result.category_set !== 0) {
            setExcelCategory({
              ...excelCategory,
              columns: [filter.result.category_set],
            });
          } else {
            setExcelCategory({
              ...excelCategory,
              columns: excelCat.map((e) => e.category_set),
            });
          }
        }}
      >
        Excel File
      </Button>
    </>
  );

  const ModalPpt = () => {
    return (
      <Modal
        title="Download PPT File"
        closable
        onCancel={() => setModalPpt(false)}
        visible={modalPpt}
        onOk={() => {
          downloadScreenshot();
        }}
      >
        <Row>
          <Col span={24}>
            <div ref={ref}>
              <Card title={"Visibility Chart"}>
                <ApexChart
                  type="line"
                  {...{
                    title: "visibility chart",
                    series: mediaVisibility.result.data
                      ? mediaVisibility.result.data.map((item) => {
                          return {
                            name: item.key,
                            data: item.category_id_per_day.buckets.map(
                              (bucket) => {
                                return bucket.doc_count;
                              }
                            ),
                          };
                        })
                      : [],
                    chartOptions: LineOptions.chartOptions,
                    options: {
                      // colors: ['#36414c', '#1990ff', '#06d6a0', '#ff6b6b', '#ffe66d', '#e76f51', '#495867'],
                      markers: LineOptions.markers,
                      xaxis: {
                        categories:
                          mediaVisibility.result.data?.length > 0
                            ? mediaVisibility.result.data[0].category_id_per_day.buckets.map(
                                (item) => {
                                  return item.key_as_string;
                                }
                              )
                            : [],
                      },
                      legend: LineOptions.legend,
                    },
                  }}
                />
              </Card>
            </div>
          </Col>
          <Col span={24}>
            <div ref={ref2}>
              <Card title={"Visibility Pie"}>
                <ApexChart
                  id="pie"
                  type="pie"
                  {...{
                    title: "visibility pie",
                    series: mediaVisibility.result.data
                      ? mediaVisibility.result.data.map((item) => {
                          return item.doc_count;
                        })
                      : [],
                    options: {
                      labels: mediaVisibility.result.data
                        ? mediaVisibility.result.data.map((item) => item.key)
                        : [],
                    },
                    chartOptions: {
                      type: "pie",
                      height: 300,
                    },
                  }}
                />
              </Card>
            </div>
          </Col>
          <Col span={24}>
            <div ref={ref3}>
              <Card title={"Coverage Tone"}>
                <ApexChart
                  id="coverage"
                  type="bar"
                  {...{
                    title: "coverage tone",
                    series: coverageTonality.result.data
                      ? coverageTonality.result.data.chart_bar
                          .sort((a, b) => (a.key > b.key && 1) || -1)
                          .map((item) => {
                            return {
                              name:
                                item.key == 1
                                  ? "Positive"
                                  : item.key == 0
                                  ? "Neutral"
                                  : "Negative",
                              data: item.tone_per_day.buckets.map(
                                (bucket) => bucket.doc_count
                              ),
                            };
                          })
                      : [],
                    chartOptions: BarHorizontal.chartOptions,
                    options: {
                      colors: BarHorizontal.colors,
                      plotOptions: {
                        bar: {
                          horizontal: false,
                          borderRadius: 6,
                        },
                      },
                      xaxis: {
                        categories: coverageTonality.result.data
                          ? coverageTonality.result.data.chart_bar[0].tone_per_day.buckets.map(
                              (bucket) => bucket.key_as_string
                            )
                          : [],
                      },
                      legend: BarHorizontal.legend,
                    },
                  }}
                />
              </Card>
            </div>
          </Col>
          <Col span={24}>
            <div ref={ref4}>
              <Card title={"Tone by Media Selection"}>
                <ApexChart
                  id="selection"
                  type="bar"
                  {...{
                    title: "tone by media selection",
                    series: toneMedia.result.data
                      ? getMediaSelection(toneMedia.result.data)
                      : [],
                    chartOptions: BarHorizontal.chartOptions,
                    options: {
                      colors: BarHorizontal.colors,
                      plotOptions: BarHorizontal.plotOptions,
                      xaxis: {
                        categories: toneMedia.result.data
                          ? toneMedia.result.data.map((item) => item.media_name)
                          : [],
                      },
                      legend: BarHorizontal.legend,
                    },
                  }}
                />
              </Card>
            </div>
          </Col>
          <Col span={24}>
            <div ref={ref5}>
              <Card title={"Tone by Category"}>
                <ApexChart
                  id="media"
                  type="bar"
                  {...{
                    title: "tone by category",
                    series: toneCategory.result.data
                      ? getMediaSelection(toneCategory.result.data)
                      : [],
                    chartOptions: BarHorizontal.chartOptions,
                    options: {
                      colors: BarHorizontal.colors,
                      plotOptions: {
                        bar: {
                          horizontal: false,
                          borderRadius: 6,
                        },
                      },
                      xaxis: {
                        categories: toneCategory.result.data
                          ? toneCategory.result.data
                              .filter((item) => {
                                if (item.tones.length > 0) {
                                  return 1;
                                } else {
                                  return 0;
                                }
                              })
                              .map((selected) => selected.category_id)
                          : [],
                      },
                      legend: BarHorizontal.legend,
                    },
                  }}
                />
              </Card>
            </div>
          </Col>
          <div style={{ width: "100%" }} ref={ref6}>
            <Card onLoading={ews.loading} title="Early Warning System">
              <EarlyWarning
                height={300}
                width={"100%"}
                charts={{
                  series: ews.result.series,
                  options: {
                    tooltip: {
                      shared: true,
                    },
                    markers: LineOptions.markers,
                    stroke: LineOptions.stroke,
                    colors: LineOptions.colors,
                    xaxis: {
                      categories: ews.result.date,
                    },
                    yaxis: {
                      show: true,
                      tickAmount: 3,
                      min: 0,
                      max: 20,
                      labels: {
                        formatter: function (value, index) {
                          if (value == 0 && value < 5) {
                            return "Potential";
                          } else if (value > 5 && value < 9) {
                            return "Emerging";
                          } else if (value > 10 && value < 20) {
                            return "Current";
                          } else {
                            return "Crisis";
                          }
                        },
                      },
                    },
                  },
                }}
              />
            </Card>
          </div>
        </Row>
      </Modal>
    );
  };

  const overStyles = {
    background: "transparent",
  };

  const downloadBtn = {
    boxShadow: "3px 0px 20px -12px rgba(54, 65, 76, 0.5)",
  };

  const Tabs = [
    {
      key: "1",
      title: "Media Visibility",
      content: (
        <div id="media-visibility-chart">
          <MediaTabs
            onLoading={mediaVisibility.loading}
            visibility={{
              title: "visibility chart",
              series: mediaVisibility.result.data
                ? mediaVisibility.result.data.map((item) => {
                    return {
                      name: item.key,
                      data: item.category_id_per_day.buckets.map((bucket) => {
                        return bucket.doc_count;
                      }),
                    };
                  })
                : [],
              chartOptions: LineOptions.chartOptions,
              events: {
                markerClick(e, chart, config) {
                  return handleClikable({
                    type: "visibility",
                    page: 0,
                    maxSize: 10,
                    order_by: "datee",
                    order: "desc",
                    data: {
                      x: mediaVisibility.result.data[config.seriesIndex]
                        .category_id_per_day.buckets[config.dataPointIndex]
                        .key_as_string,
                      y: mediaVisibility.result.data[config.seriesIndex].key,
                    },
                  });
                },
              },
              options: {
                // colors: ['#36414c', '#1990ff', '#06d6a0', '#ff6b6b', '#ffe66d', '#e76f51', '#495867'],
                markers: LineOptions.markers,
                xaxis: {
                  categories:
                    mediaVisibility.result.data?.length > 0
                      ? mediaVisibility.result.data[0].category_id_per_day.buckets.map(
                          (item) => {
                            return item.key_as_string;
                          }
                        )
                      : [],
                },
                legend: LineOptions.legend,
              },
            }}
            pie={{
              title: "visibility pie",
              series: mediaVisibility.result.data
                ? mediaVisibility.result.data.map((item) => {
                    return item.doc_count;
                  })
                : [],
              options: {
                labels: mediaVisibility.result.data
                  ? mediaVisibility.result.data.map((item) => item.key)
                  : [],
              },
              chartOptions: {
                type: "pie",
                height: 300,
              },
              events: {
                dataPointSelection(e, chart, config) {
                  return handleClikable({
                    type: "pie",
                    page: 0,
                    maxSize: 10,
                    order_by: "datee",
                    order: "desc",
                    data: {
                      y: mediaVisibility.result.data[config.dataPointIndex].key,
                    },
                  });
                },
              },
            }}
            headline={
              <div
                style={{ overflowY: "auto", overflowX: "hidden", height: 300 }}
              >
                <Row>
                  {trendingHighLights.result.data?.map((item) => {
                    return (
                      <Col span={24} key={item.article_id}>
                        <ColumnList
                          ellipsis
                          title={item.title}
                          content={item.content}
                          onClick={() => {
                            getKeywordArticle({
                              article_id: item.article_id,
                            })
                              .then((data) => data.json())
                              .then((data) => {
                                setTrendingDetail(item);
                                setModalTrending(true);
                                setKeyword(data.data);
                              })
                              .catch((err) => console.log(err));
                          }}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            }
          />
        </div>
      ),
    },
    {
      key: "2",
      title: "Coverage Tone",
      content: (
        <div id="coverage-tone-chart">
          <ToneTabs
            onLoading={coverageTonality.loading}
            onLoadingMedia={toneMedia.loading}
            onLoadingCategory={toneCategory.loading}
            coverage={{
              title: "coverage tone",
              series: coverageTonality.result.data
                ? coverageTonality.result.data.chart_bar
                    .sort((a, b) => (a.key > b.key && 1) || -1)
                    .map((item) => {
                      return {
                        name:
                          item.key == 1
                            ? "Positive"
                            : item.key == 0
                            ? "Neutral"
                            : "Negative",
                        data: item.tone_per_day.buckets.map(
                          (bucket) => bucket.doc_count
                        ),
                      };
                    })
                : [],
              chartOptions: BarHorizontal.chartOptions,
              events: {
                dataPointSelection(e, chart, config) {
                  console.log(filters);
                  return handleClikable({
                    type: "coverage",
                    page: 0,
                    maxSize: 10,
                    order_by: "datee",
                    order: "desc",
                    data: {
                      y:
                        config.seriesIndex == "2"
                          ? "1"
                          : config.seriesIndex == "0"
                          ? "-1"
                          : "0",
                      x: coverageTonality.result.data.chart_bar.find((item) => {
                        const temp =
                          config.seriesIndex == "2"
                            ? "1"
                            : config.seriesIndex == "0"
                            ? "-1"
                            : "0";

                        if (item.key == temp) {
                          return item;
                        } else {
                          return -1;
                        }
                      }).tone_per_day.buckets[config.dataPointIndex]
                        .key_as_string,
                    },
                  });
                },
              },
              options: {
                colors: BarHorizontal.colors,
                plotOptions: {
                  bar: {
                    horizontal: false,
                    borderRadius: 6,
                  },
                },
                xaxis: {
                  categories: coverageTonality.result.data
                    ? coverageTonality.result.data.chart_bar[0].tone_per_day.buckets.map(
                        (bucket) => bucket.key_as_string
                      )
                    : [],
                },
                legend: BarHorizontal.legend,
              },
            }}

            // YUDI

            positive={{
              title: "Positive",
            }}
            neutral={{
              title: "Neutral",
            }}
            negative={{
              title: "Negative",
            }}
            // END YUDI

            pie={{
              title: "Coverage pie",
              series: coverageTonality.result.data
                ? coverageTonality.result.data.chart_bar
                    .sort((a, b) => (a.key > b.key && 1) || -1)
                    .map((item) => {
                      return item.doc_count;
                    })
                : [],
              options: {
                labels: ["Negative", "Neutral", "Positive"],
                colors: BarHorizontal.colors,
                legend: {
                  position: "right",
                  horizontalAlign: "center",
                  verticalAlign: "center",
                  markers: {
                    width: 8,
                    height: 8,
                    radius: 2,
                    offsetY: 0,
                  },
                },
              },
              chartOptions: {
                type: "pie",
                height: 300,
              },
              events: {
                dataPointSelection(e, chart, config) {
                  return handleClikable({
                    type: "pie-cov",
                    page: 0,
                    maxSize: 10,
                    order_by: "datee",
                    order: "desc",
                    data: {
                      y: coverageTonality.result.data.chart_bar.sort(
                        (a, b) => (a.key > b.key && 1) || -1
                      )[config.dataPointIndex].key,
                    },
                  });
                },
              },
            }}
            selection={{
              title: "tone by media selection",
              series: toneMedia.result.data
                ? getMediaSelection(toneMedia.result.data)
                : [],
              chartOptions: BarHorizontal.chartOptions,
              events: {
                dataPointSelection(e, chart, config) {
                  return handleClikable({
                    type: "coverage-bar",
                    page: 0,
                    maxSize: 10,
                    order_by: "datee",
                    order: "desc",
                    data: {
                      y: toneMedia.result.data[config.dataPointIndex].media_id,
                      x: config.seriesIndex - 1,
                    },
                    media_name:
                      toneMedia.result.data[config.dataPointIndex].media_name,
                  });
                },
              },
              options: {
                colors: BarHorizontal.colors,
                plotOptions: BarHorizontal.plotOptions,
                xaxis: {
                  categories: toneMedia.result.data
                    ? toneMedia.result.data.map((item) => item.media_name)
                    : [],
                },
                legend: BarHorizontal.legend,
              },
            }}
            media={{
              title: "tone by category",
              series: toneCategory.result.data
                ? getMediaSelection(toneCategory.result.data)
                : [],
              chartOptions: BarHorizontal.chartOptions,
              events: {
                click(e, chart, config) {
                  return handleClikable({
                    type: "coverage-barhor",
                    page: 0,
                    maxSize: 10,
                    order_by: "datee",
                    order: "desc",
                    data: {
                      y: toneCategory.result.data[config.dataPointIndex]
                        .category_id,
                      x: config.seriesIndex - 1,
                    },
                  });
                },
              },
              options: {
                colors: BarHorizontal.colors,
                plotOptions: {
                  bar: {
                    horizontal: false,
                    borderRadius: 6,
                  },
                },
                xaxis: {
                  categories: toneCategory.result.data
                    ? toneCategory.result.data
                        .filter((item) => {
                          if (item.tones.length > 0) {
                            return 1;
                          } else {
                            return 0;
                          }
                        })
                        .map((selected) => selected.category_id)
                    : [],
                },
                legend: BarHorizontal.legend,
              },
            }}
          />
        </div>
      ),
    },
    // {
    //   key: "3",
    //   title: "Early Warning",
    //   content: (
    //     <div id="ews-chart">
    //       <Card onLoading={ews.loading} title="Early Warning System">
    //         <EarlyWarning
    //           height={350}
    //           charts={{
    //             series: ews.result.series,
    //             events: {
    //               markerClick(e, chart, config) {
    //                 handleClikable({
    //                   type: "ews",
    //                   page: 0,
    //                   maxSize: 10,
    //                   order_by: "datee",
    //                   order: "desc",
    //                   data: {
    //                     x: ews.result.date[config.dataPointIndex],
    //                     y: ews.result.series[config.seriesIndex].name,
    //                   },
    //                 });
    //               },
    //             },
    //             options: {
    //               tooltip: {
    //                 shared: true,
    //               },
    //               markers: LineOptions.markers,
    //               stroke: LineOptions.stroke,
    //               colors: LineOptions.colors,
    //               xaxis: {
    //                 categories: ews.result.date,
    //               },
    //               yaxis: {
    //                 show: true,
    //                 tickAmount: 3,
    //                 min: 0,
    //                 max: 20,
    //                 labels: {
    //                   formatter: function (value, index) {
    //                     if (value >= 0 && value <= 5) {
    //                       return "Potential";
    //                     } else if (value > 5 && value <= 10) {
    //                       return "Emerging";
    //                     } else if (value > 10 && value < 20) {
    //                       return "Current";
    //                     } else {
    //                       return "Crisis";
    //                     }
    //                   },
    //                 },
    //               },
    //             },
    //           }}
    //         />
    //       </Card>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div style={{ height: "100%", marginBottom: "1rem" }}>
      <div
        style={{
          position: "absolute",
          zIndex: 999,
          right: 20,
          bottom: breakPoint == "tablet" ? "30%" : 100,
        }}
      >
        <Dropdown
          direction="vertical"
          trigger="hover"
          overlayStyle={overStyles}
          placement="topCenter"
          overlayHeight="100%"
          overlay={downloadMenu}
        >
          <Button
            loading={excelLoading}
            style={downloadBtn}
            onClick={(e) => e.preventDefault()}
            type="primary"
            icons="DownloadOutlined"
            shape="round"
          >
            Download
          </Button>
        </Dropdown>
      </div>
      <Row>
        <Col md={24} lg={6}>
          <Row>
            {!coverageTonality.result.data
              ? WidgetSeries.map((item) => {
                  return (
                    <Col xs={24} md={8} lg={24} xl={24} key={item.id}>
                      <Widget
                        onLoading={coverageTonality.loading}
                        id={item.id}
                        type={item.type}
                        label={item.label}
                        description={item.description}
                        total={item.total}
                        status={item.status}
                        percent={`${item.percent}%`}
                      />
                    </Col>
                  );
                })
              : coverageTonality.result.data.widget.map((item) => {
                  return (
                    <Col
                      xs={24}
                      md={8}
                      lg={24}
                      xl={24}
                      order={
                        item.type == "positive"
                          ? 1
                          : 2 && item.type == "negative"
                          ? 3
                          : 2 && item.type == "neutral"
                          ? 2
                          : 2
                      }
                      key={item.id}
                    >
                      <Widget
                        onLoading={coverageTonality.loading}
                        id={item.id}
                        type={item.type}
                        label={item.label}
                        description={item.description}
                        total={item.total}
                        status={item.status}
                        percent={`${item.percent}%`}
                      />
                    </Col>
                  );
                })}
          </Row>
        </Col>
        <Col xs={24} md={24} lg={18}>
          <Card onLoading={coverageTonality.loading}>
            <div id="coverage-tonality-chart">
              <SummaryTone
                height={290}
                charts={{
                  events: {
                    markerClick(e, chart, config) {
                      return handleClikable({
                        type: "tonality",
                        page: 0,
                        maxSize: 10,
                        order_by: "datee",
                        order: "desc",
                        data: {
                          x: config.seriesIndex - 1,
                          y: ews.result.date[config.dataPointIndex],
                        },
                      });
                    },
                  },
                  options: {
                    title: {
                      text: "Media Sentiment Breakdown",
                      align: "left",
                      offsetY: 5,
                      floating: true,
                      style: {
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#263238",
                      },
                    },
                    tooltip: {
                      shared: true,
                    },
                    markers: LineOptions.markers,
                    xaxis: {
                      categories: coverageTonality.result.data
                        ? coverageTonality.result.data.chart_bar[0].tone_per_day.buckets.map(
                            (item) => {
                              return item.key_as_string;
                            }
                          )
                        : [" "],
                    },
                    stroke: LineOptions.stroke,
                    colors: ["#ff6b6b", "#1990ff", "#06d6a0"],
                    legend: {
                      position: "top",
                      horizontalAlign: "right",
                      markers: LineOptions.legend.markers,
                    },
                  },
                  series: coverageTonality.result.data
                    ? coverageTonality.result.data.chart_bar
                        .sort((a, b) => (a.key > b.key && 1) || -1)
                        .map((item) => {
                          return {
                            name:
                              item.key == 1
                                ? "Positive"
                                : item.key == -1
                                ? "Negative"
                                : "Neutral",
                            data: item.tone_per_day.buckets.map(
                              (bucket) => bucket.doc_count
                            ),
                          };
                        })
                    : [],
                }}
              />
            </div>
          </Card>
        </Col>
        <Divider />
        <Col span={24} style={extStyle}>
          <Tabset style={extStyle} defaultActiveKey="1" data={Tabs} />
        </Col>
      </Row>

      <DetailArticle
        clippingDrawer={trendingDetail}
        setClippingDrawer={setTrendingDetail}
        clipListPop={modalTrending}
        setclipListPop={setModalTrending}
        saveArticlePop={false}
        keyword={keyword}
      />

      <ModalChart />
      <ModalPpt />

      <Modal
        title="Download Excell File"
        closable
        onCancel={() => setModalExcel(false)}
        visible={modalExcel}
        footer={[
          <Button
            key="reset"
            type="dashed"
            danger
            disabled={
              (excelColumn.columns.length == 0) &
              (excelCategory.columns.length == 0)
                ? true
                : false
            }
            onClick={() => {
              setExcelColumn({ ...filter.result, columns: [] });
              setExcelCategory({ ...filter.result, columns: [] });
            }}
          >
            Reset
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={
              (excelColumn.columns.length > 0) &
              (excelCategory.columns.length > 0)
                ? false
                : true
            }
            loading={excelLoading}
            onClick={() => {
              handleExcelDownload();
            }}
          >
            Download File
          </Button>,
        ]}
      >
        <p>Columns:</p>
        <ExcelSelection
          id="columns"
          selectall={{
            indeterminate: indeterminate,
            onChange: changeAllExcelColumn,
            checked: excelColumn.columns.length == excelCol.result.data?.length,
            label: `Select All (${excelColumn.columns.length}/${excelCol.result.data?.length})`,
          }}
          group={{
            onChange: changeExcelColumn,
            value: excelColumn.columns,
            options: excelCol.result.data
              ? excelCol.result.data.map((item) => {
                  return {
                    value: item.name,
                    label: item.name,
                    checked: item.checked,
                  };
                })
              : [],
          }}
        />

        <p style={{ marginTop: "20px" }}>Categories:</p>
        <ExcelSelection
          id="columns"
          selectall={{
            indeterminate: indeterminate,
            onChange: changeAllExcelCategory,
            checked: excelCategory.columns.length == excelCat.length,
            label: `Select All (${excelCategory.columns.length}/${excelCat.length})`,
          }}
          group={{
            onChange: changeExcelCategory,
            value: excelCategory.columns,
            options: excelCat
              ? excelCat?.map((item) => {
                  return {
                    value: item.category_set,
                    label: item.descriptionz,
                    checked: item.checked,
                  };
                })
              : [],
          }}
        />
        <div style={{ margin: "6px 0 0" }}>
          <b>Note:</b> you can only download the columns that are selected.
        </div>
      </Modal>
    </div>
  );
};

const extStyle = {
  height: "90%",
};

export default Analytic;
