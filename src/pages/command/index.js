import { useState, useEffect } from "react";
import breakPointOberver from "constant/mediaQuery";

import dynamic from "next/dynamic";
import CommandLayout from "components/layouts/commandLayout";
import styles from "styles/layout/command.module.scss";
import styles2 from 'styles/elements/commandMediaList.module.scss';

import airlangga from "assets/images/person/airlangga.jpeg";
import edwin from "assets/images/person/edwin.jpeg";
import erik from "assets/images/person/erik.jpeg";
import haru from "assets/images/person/haru.jpeg";
import jasmin from "assets/images/person/jasmin.jpeg";
import rully from "assets/images/person/rully.jpeg";
import sayed from "assets/images/person/sayed.jpeg";
import sunarso from "assets/images/person/sunarso.jpeg";
import toni from "assets/images/person/toni.jpeg";
import avatar from "assets/images/avatar.png";

import {
  Card,
  ColumnList,
  Image,
  Row,
  Col,
  Drawer,
  Tag,
  Empty,
  DatePicker,
  Button,
  notification,
} from "components";

import EarlyWarning from "modules/ews";
import Sparkline from "components/elements/sparkline";
import MediaList from "modules/dcc/mediaList";
import MediaTone from "modules/dcc/mediaTone";
import Geospatial from "pages/geospatial";
import MentionList from "modules/dcc/mentionList";
import { useDispatch, useSelector } from "react-redux";
import {
  getGeo,
  getGeoList,
  getGeoStatus,
  postBacktrack,
} from "store/actions/geospatialActions";
import {
  getWordcloud,
  postBacktrackWordcloud,
} from "store/actions/summaryActions";
import {
  getAnalyticArticle,
  getCoverageTonality,
  getEWS,
  getMediaCount,
  getToneMedia,
} from "store/actions/analyticActions";
import {
  getSpokepersonStatistic,
  getSpokepersonStatisticClick,
  getSpokepersonDetail,
} from "store/actions/spokespersonActions";

import Popchart from "modules/popup/popchart";
import {
  BarHorizontal,
  LineOptions,
  SparklineOptions,
} from "constant/mock/options";
import { getTopIssue } from "store/actions/issueActions";
import ModalChartList from "modules/spokperson/modalChartList";
import { getKeywordArticle } from "store/actions/newsClippingActions";

const Geo = dynamic(() => import("modules/dcc/geo"), { ssr: false });
const WordCloud = dynamic(() => import("modules/dcc/wordcloud"), {
  ssr: false,
});

const breakPoints = {
  1023: " (max-width: 1023px)",
  1024: "(max-width: 1024px)",
};

const ImageList = ({
  spokepersonStatistic,
  getSpokepersonStatisticClick,
  setDataList,
  setChartList,
  filter,
  dataList,
}) => {
  const dispatch = useDispatch();

  // return (
  //   <MentionList
  //     onLoading={spokepersonStatistic.loading}
  //     data={
  //       spokepersonStatistic.result.data
  //         ? spokepersonStatistic.result.data.map((item) => {
  //             // const foto = mockperson.findIndex((a) => a.name == item.influencer_name);
  //             return {
  //               label: item.influencer_name,
  //               image: (
  //                 <Image
  //                   key={item.influencer_name}
  //                   url={item.image ? "https://demo.digivla.id" : null}
  //                   src={item.image ? item.image : avatar}
  //                   // layout='fill'
  //                   objectFit="cover"
  //                   alt="person"
  //                   height={40}
  //                   width={40}
  //                   priority="true"
  //                   onClick={() => {
  //                     dispatch(
  //                       getSpokepersonStatisticClick({
  //                         ...filter.result,
  //                         page: 0,
  //                         max_size: 10,
  //                         tone: "all",
  //                         influencer: item.influencer_name,
  //                         order: "desc",
  //                       })
  //                     );

  //                     setChartList(true);
  //                     setDataList({
  //                       ...dataList,
  //                       ...item,
  //                     });
  //                   }}
  //                 />
  //               ),
  //             };
  //           })
  //         : []
  //     }
  //   />
  // );
};

const CommandCenter = () => {
  const dispatch = useDispatch();
  const [breakPoint, isBreakPoint] = useState();

  const geospatial = useSelector((state) => state.geo);
  const sum = useSelector((state) => state.summary);
  const analytic = useSelector((state) => state.analytic);
  const filters = useSelector((state) => state.filter);
  const spokesperson = useSelector((state) => state.spokeperson);
  const issues = useSelector((state) => state.issues);

  const { geo, geoList } = geospatial;
  const { wordCloud } = sum;
  const { filter } = filters;
  const { spokepersonStatistic, spokepersonStatisticClick, spokepersonDetail } =
    spokesperson;
  const { issueTop } = issues;
  const { ews, coverageTonality, toneMedia, article, articlePositive, articleNegative, articleNeutral, mediaListCount } =
    analytic;

  const [modalAnalytic, setModalAnalytic] = useState(false);
  const [articleData, setArticleData] = useState({});
  const [chartList, setChartList] = useState(false);
  const [openDetail, setopenDetail] = useState(false);
  const [btWcDate, setBtWcDate] = useState("");
  const [dataList, setDataList] = useState({
    page: 0,
    max_size: 10,
  });
  const [articleDetail, setArticleDetail] = useState({});
  const [keyword, setKeyword] = useState([]);
  const [backtrackStatus, setBacktrackStatus] = useState(false);
  const [doneCheck, setDoneCheck] = useState(false);
  const [btDate, setBtDate] = useState("");

  const mockperson = [
    { img: airlangga, name: "Airlangga" },
    { img: airlangga, name: "Menko Airlangga" },
    {
      img: airlangga,
      name: "Menteri Koordinator Bidang Perekonomian Airlangga Hartarto",
    },
    { img: edwin, name: "Edwin" },
    { img: erik, name: "Erick" },
    { img: haru, name: "Haru" },
    { img: jasmin, name: "Jasmin" },
    { img: rully, name: "Rully" },
    { img: sayed, name: "Sayed" },
    { img: sunarso, name: "Sunarso" },
    { img: toni, name: "Toni" },
  ];

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));

    getGeoStatus({
      client_id: userToken.client_id,
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.message == "registered") {
          setBacktrackStatus(true);

          dispatch(
            getGeo({
              type_location: "article",
              ...filter.result,
            })
          );
        }

        setDoneCheck(true);
      })
      .catch((err) => console.log(err));
    // dispatch(
    //   getGeo({
    //     start_date: filter.result.start_date,
    //     end_date: filter.result.end_date,
    //     type_location: "article",
    //     category_id: filter.result.category_id,
    //     category_set: filter.result.category_set,
    //   })
    // );

    dispatch(
      getWordcloud({
        ...filter.result,
        total_word: 40,
      })
    );

    dispatch(getCoverageTonality(filter.result));

    dispatch(getEWS(filter.result));

    dispatch(getToneMedia(filter.result));

    dispatch(
      getSpokepersonStatistic({
        ...filter.result,
        limit: 10,
        page: 0,
      })
    );

    dispatch(getMediaCount(filter.result));

    dispatch(
      getTopIssue({
        ...filter.result,
        limit: 5,
      })
    );
  }, [filter]);

  useEffect(() => {
    breakPointOberver(breakPoints, isBreakPoint);
  }, [breakPoint]);

  const getMediaSelection = (raw) => {
    let negative = [];
    let positive = [];
    let neutral = [];
    let favorite = [];

    raw.forEach((item) => {
      item.tones.forEach((tone) => {
        if (tone.negative > -1) {
          negative.push(tone.negative);
        } else if (tone.positive > -1) {
          positive.push(tone.positive);
        } else if (tone.neutral > -1) {
          neutral.push(tone.neutral);
        } else {
          favorite.push(
            tone["media favorability index"] == undefined
              ? 0
              : tone["media favorability index"]
          );
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
      // {
      //   name: "Media Favorability Index",
      //   data: favorite,
      // },
    ];
  };

  const handleAnalyticDetail = (body) => {
    if (body.type == "media") {

      console.log(body.data.x)
      // dispatch(
      //   getAnalyticArticle({
      //     ...filter.result,
      //     maxSize: body.maxSize,
      //     page: body.page,
      //     media_id: toneMedia.result.data[body.data.x].media_id,
      //     tone: `${body.data.y - 1}`,
      //   })
      // );

      // setArticleData({
      //   ...body,
      //   desc: {
      //     Media: toneMedia.result.data[body.data.x].media_name,
      //     Tone:
      //       body.data.y - 1 == 1
      //         ? "Positive"
      //         : body.data.y - 1 == -1
      //         ? "Negative"
      //         : "Neutral",
      //   },
      // });

    } else if (body.type == "ews") {
      dispatch(
        getAnalyticArticle({
          ...filter.result,
          maxSize: body.maxSize,
          page: body.page,
          category_id: ews.result.series[body.data.y].name,
          start_date: ews.result.date[body.data.x],
          end_date: ews.result.date[body.data.x],
        })
      );

      setArticleData({
        ...body,
        desc: {
          Category: ews.result.series[body.data.y].name,
          Date: ews.result.date[body.data.x],
        },
      });
    } else if (body.type == "geo") {
      dispatch(
        getGeoList({
          ...filter.result,
          max_size: body.maxSize,
          page: body.page,
          geo_loc: body.geo_loc,
          type_location: "article",
        })
      );

      setArticleData({
        ...body,
        desc: {
          Location: body.geo_loc,
        },
      });
    } else if (body.type == "tone") {
      dispatch(
        getAnalyticArticle({
          ...filter.result,
          tone:
            body.data.x == "Neutral"
              ? "0"
              : body.data.x == "Positive"
              ? "1"
              : "-1",
          maxSize: body.maxSize,
          page: body.page,
          start_date: body.data.y,
          end_date: body.data.y,
        })
      );

      setArticleData({
        ...body,
        desc: {
          Tone: body.data.x,
          Date: body.data.y,
        },
      });
    }

    setModalAnalytic(true);
  };

  const handleAnalyticDetailClose = (body) => {
    setArticleData({});
    setModalAnalytic(false);
  };

  const handleClickChart = (itemData) => {
    dispatch(
      getSpokepersonDetail({
        article_id: itemData.article_id,
      })
    );
    getKeywordArticle({
      article_id: itemData.article_id,
    })
      .then((data) => data.json())
      .then((data) => {
        setKeyword(data.data);
        setArticleDetail(itemData);
        setopenDetail(true);
      })
      .catch((err) => console.log(err));
  };

  const paginationHandler = (newPage, newSize) => {
    dispatch(
      getSpokepersonStatisticClick({
        ...filter.result,
        page: newPage - 1,
        max_size: newSize,
        tone: "all",
        influencer: dataList.influencer_name,
        order: "desc",
      })
    );

    setDataList({
      ...dataList,
      page: newPage - 1,
      max_size: newSize,
    });
  };

  const ModalDetailArticle = () => {
    return (
      <Drawer
        title={articleDetail.influencer_name}
        placement="right"
        visible={openDetail && !spokepersonDetail.loading}
        onClose={() => {
          setopenDetail(false);
          setArticleDetail({});
        }}
      >
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <ColumnList title="date:" content={articleDetail.datee} />
            <ColumnList
              title="sentiment:"
              content={
                <Tag
                  style={{ margin: 0 }}
                  color={
                    articleDetail.tone == "1"
                      ? "success"
                      : "processing" && articleDetail.tone == "-1"
                      ? "error"
                      : "processing"
                  }
                >
                  {articleDetail.tone == 1
                    ? "Positive"
                    : articleDetail.tone == -1
                    ? "Negative"
                    : "Neutral"}
                </Tag>
              }
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <ColumnList title="media:" content={`${articleDetail.media}`} />
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <div
                  style={{
                    overflowY: "scroll",
                    maxHeight: 300,
                    border: "1px dashed rgba(54, 65, 76, 0.3)",
                    padding: 6,
                    borderRadius: 3,
                  }}
                >
                  {articleDetail.quotes}
                </div>
              </Col>
              <Col span={24}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: spokepersonDetail.result.data?.content.replace(
                      new RegExp(
                        articleDetail.quotes,
                        // keyword
                        //   ?.join("")
                        //   .split("\\")
                        //   .join("")
                        //   .split('"')
                        //   .filter((e) => e && e !== " ")
                        //   .join("|"),
                        "gi"
                      ),
                      (match) => `<b class="highlight-text">${match}</b>`
                    ),
                  }}
                ></div>
                {/* <div
									style={{
										overflowY: 'scroll',
										maxHeight: 300,
										border: '1px dashed rgba(54, 65, 76, 0.3)',
										padding: 6,
										borderRadius: 3,
									}}
								>
									{spokepersonDetail.result.data?.content}
								</div> */}
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Tag color="processing">{articleDetail.category_id}</Tag>
          </Col>
        </Row>
      </Drawer>
    );
  };

  const ModalAnalytic = () => {
    return (
      <Popchart
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
          visible: modalAnalytic && !article.loading && !geoList.loading,
          closable: true,
          onCancel: handleAnalyticDetailClose,
        }}
        onLoading={
          articleData.type == "geo" ? geoList.loading : article.loading
        }
        data={
          articleData.type == "geo"
            ? geoList.result.data
              ? geoList.result.data.map((item) => {
                  return {
                    id: item.article_id,
                    title: item.title,
                    content: item.content,
                    detail: item,
                  };
                })
              : []
            : article.result.data
            ? article.result.data.map((item) => {
                return {
                  id: item.article_id,
                  title: item.title,
                  content: item.content,
                  detail: item,
                };
              })
            : []
        }
        pagination={{
          showSizeChanger: true,
          total:
            articleData.type == "geo"
              ? geoList.result.recordsTotal
              : article.result.recordsTotal,
          showTotal: (total) => `Total ${total} data`,
          defaultPageSize: articleData.maxSize
            ? article.maxSize
            : article.max_size,
          defaultCurrent: articleData.page + 1,
          onChange: (page, pageSize) =>
            handleAnalyticDetail({
              ...articleData,
              page: page - 1,
              maxSize: pageSize,
            }),
        }}
      />
    );
  };

  const IssueList = () => {
    let list = [];
    for (const key in issueTop.result.data?.top_issue) {
      list.push({
        value: issueTop.result.data?.top_issue[key],
        title: key,
      });
    }
    return (
      <>
        {list.length > 0 ? (
          list.map((item, idx) => (
            <ColumnList key={idx} title={item.title} content={item.value} />
          ))
        ) : (
          <Empty description="Please set Filter First" />
        )}
        {/* {list.map((item, idx) => (
					<ColumnList key={idx} title={item.title} content={item.value} />
				))} */}
      </>
    );
  };

  return (
    <div className={styles["command-wrapper"]}>
      <div className={styles.toprow}>
        <div className={styles.topcol}>
          <Row>
            <Col xs={24} md={24} lg={24} xl={24}>
              {/* <Row style={{ height: "100%" }}> */}
                {/* <Col xs={24} md={24} lg={13} xl={16}> */}
                  <MediaList
                    // style={{ height: "100%" }}
                    // bodyStyle={{ height: "100%" }}
                    data={
                      mediaListCount.result.data
                        ? mediaListCount.result.data.map((item) => {
                            return item;
                          })
                        : []
                    }

                    children={
                      <div
                        className={styles2['list-item']}
                        >
                        <div className={styles2['item-total']}>{
                          coverageTonality?.result?.data
                            ? coverageTonality.result.data.chart_bar.reduce((a, b) => {
                                return { doc_count: a.doc_count + b.doc_count };
                              }).doc_count
                            : 0
                          }
                        </div>
                        <div className={styles2['item-label']}>Total Article</div>
                      </div>
                    }
                  />
                  <p style={{marginBottom: '12px'}}></p>
                  <Card>
                    <Geospatial />
                  </Card>
                {/* </Col> */}
                {/* <Col xs={24} md={24} lg={11} xl={8}>
                </Col> */}
              {/* </Row> */}
              <p style={{marginBottom: '12px'}}></p>
              {/* <Row> */}
                {/* <Col xs={24} md={24} lg={12} xl={13}>
                  <ImageList
                    bodyStyle={{ padding: 6}}
                    spokepersonStatistic={spokepersonStatistic}
                    getSpokepersonStatisticClick={getSpokepersonStatisticClick}
                    setDataList={setDataList}
                    setChartList={setChartList}
                    filter={filter}
                    dataList={dataList}
                  />
                </Col> spokeperson di takeout
                */}
                {/* <Col xs={24} md={24} lg={12} xl={24}>
                  <Sparkline
                    className="total-msb"
                    onLoading={coverageTonality.loading}
                    bodyStyle={{ padding: 6 }}
                    style={{height: '100%', color: 'white'}}
                    title="media sentiment breakdown"
                    type="up"
                    total={
                      coverageTonality.result.data
                        ? coverageTonality.result.data.chart_bar.reduce((a, b) => {
                            return { doc_count: a.doc_count + b.doc_count };
                          }).doc_count
                        : 0
                    }
                    percentage={8}
                    height={130}
                    charts={{
                      type: "line",
                      events: {
                        markerClick(e, chart, config) {
                          handleAnalyticDetail({
                            type: "tone",
                            page: 0,
                            maxSize: 10,
                            order_by: "datee",
                            order: "desc",
                            data: {
                              x: config.w.config.series[config.seriesIndex].name,
                              y: ews.result.date[config.dataPointIndex],
                            },
                          });
                        },
                      },
                      series: coverageTonality.result.data
                        ? coverageTonality.result.data.chart_bar.map((item) => {
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
                              color:
                                item.key == 1
                                  ? "#06d6a0"
                                  : item.key == -1
                                  ? "#ff6b6b"
                                  : "#1990ff",
                            };
                          })
                        : [],
                      options: {
                        stroke: {
                          width: 2,
                          lineCap: "butt",
                        },
                        // colors: ['#06d6a0', '#1990ff', '#ff6b6b'],
                        grid: SparklineOptions.options.grid,
                        yaxis: {
                          show: false,
                        },
                        legend: SparklineOptions.options.legend,
                        xaxis: {
                          type: "date",
                          categories: ews.result.date || [],
                        },
                      },
                      chartOptions: SparklineOptions.chart,
                    }}
                  />
                </Col> */}
               {/* </Row> */}
            </Col>
            <Col xs={24} md={24} lg={8} xl={8}>
              <Row>
                {/* <Col span={24} style={{ display: 'none' }}>
                  <Card
                    title="top issue"
                    // style={{ height: "100%" }}
                    // bodyStyle={{ height: "100%" }}
                    className={styles["dcc-card-list"]}
                    onLoading={issueTop.loading}
                  >
                    <IssueList />
                  </Card>
                </Col> */}
                <Col span={24}>
                  <Card
                    // style={{ height: "100%" }}
                    // bodyStyle={{ height: "100%" }}
                    onLoading={wordCloud.loading}
                    className={styles["dcc-card"]}
                  >
                    {wordCloud.result.total_word ? (
                      <WordCloud
                        className={styles["chart-word"]}
                        options={{
                          series: [
                            {
                              type: "wordcloud",
                              // data: wordCloud.result.data ? wordCloud.result.data : [],
                              data: wordCloud.result.data
                                ? wordCloud.result.data.map((word) => ({
                                    name: word.name,
                                    weight: word.weight,
                                    color: `rgba(25, 144, 255,${
                                      word.weight > 20
                                        ? 1
                                        : 0.3 && word.weight <= 15
                                        ? 0.3
                                        : 1
                                    })`,
                                  }))
                                : [],
                              style: {
                                fontFamily: `Noto Sans, sans-serif`,
                                textTransform: "capitalize",
                                color: 'white',
                              },
                              minFontSize: 10,
                            },
                          ],
                          chart: {
                            backgroundColor: '#2b2d3e',
                          },
                        }}
                      />
                    ) : (
                      <Row>
                        <Col>Please select date for backtrack:</Col>
                        <Col>
                          <DatePicker
                            onChange={(e) =>
                              setBtWcDate(e.format("YYYY-MM-DD"))
                            }
                          />
                          <Button
                            onClick={() => {
                              postBacktrackWordcloud({
                                backtrack_date: btWcDate,
                              })
                                .then((data) => data.json())
                                .then((data) => {
                                  if (
                                    data.message ==
                                    "vdadi successfully registered..."
                                  ) {
                                    notification.success({
                                      message: "Success backtrack",
                                    });

                                    dispatch(
                                      getWordcloud({
                                        start_date: filter.result.start_date,
                                        end_date: filter.result.end_date,
                                        total_word: 40,
                                      })
                                    );
                                  } else {
                                    notification.error({
                                      message: "Error when add backtrack date",
                                    });
                                  }
                                })
                                .catch((err) =>
                                  notification.error({
                                    message: "Error when add backtrack date",
                                  })
                                );
                            }}
                          >
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={24} lg={16} xl={16}>
            <div className={styles.botrow}>
                <Row>
                  <Col xs={24} md={24} lg={24} xl={24}>
                    <Card onLoading={toneMedia.loading} title={'Top 10 Media'}>
                      <div
                        style={{
                          overflowY: 'scroll',
                          overflowX: 'hidden',
                          maxHeight: 362,
                          border: '1px dashed rgba(54, 65, 76, 0.3)',
                          padding: 6,
                          borderRadius: 3,
                        }}>
      <MediaTone
        charts={{
          data: toneMedia.result.data || [],
          onDonutClick: function (dataPointIndex, seriesIndex) {
            handleAnalyticDetail({
              type: "media",
              page: 0,
              maxSize: 10,
              order_by: "datee",
              order: "desc",
              data: {
                x: dataPointIndex,
                y: seriesIndex,
              },
              dataPointIndex, // Optional: Pass the indices directly
              seriesIndex,
            });
          },
          chartOptions: {
            labels: ['Positive', 'Negative', 'Neutral'],
            width: 100,
            tooltip: {
              theme: 'light',
              fillSeriesColor: true,
            },
            legend: {
              position: "top",
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: false,
                    total: {
                      showAlways: false,
                      show: false,
                    }
                  }
                }
              }
            },
          },
        }}
      />
                      </div>
                  </Card>
                  {/* </Col>
                  <Col xs={24} md={24} lg={12} xl={12}> */}
                  {/* <p style={{marginBottom: '12px'}}></p> */}
                    {/* <Card onLoading={ews.loading}>
                      <EarlyWarning
                        charts={{
                          series: ews.result.series || [],
                          events: {
                            markerClick(e, chart, config) {
                              handleAnalyticDetail({
                                type: "ews",
                                page: 0,
                                maxSize: 10,
                                order_by: "datee",
                                order: "desc",
                                data: {
                                  x: config.dataPointIndex,
                                  y: config.seriesIndex,
                                },
                              });
                            },
                          },
                          options: {
                            title: {
                              text: "Early Warning System",
                              floating: false,
                              offsetY: 5,
                              align: "left",
                              style: LineOptions.title.style,
                            },
                            tooltip: {
                              shared: true,
                              enabled: true,
                            },
                            markers: LineOptions.markers,
                            stroke: LineOptions.stroke,
                            colors: LineOptions.colors,
                            xaxis: {
                              categories: ews.result.date || [],
                            },
                            legend: {
                              show: false,
                            },
                            yaxis: {
                              show: true,
                              tickAmount: 3,
                              min: 0,
                              max: 20,
                              labels: {
                                formatter: function (value, index) {
                                  if (value >= 0 && value <= 5) {
                                    return "Potential";
                                  } else if (value > 5 && value <= 10) {
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
                    </Card> */}
                  </Col>
                </Row>
              </div>
              <p style={{marginBottom: '12px'}}></p>
              <ModalDetailArticle />
              <ModalChartList
                chartList={chartList}
                setChartList={setChartList}
                spokepersonStatisticClick={spokepersonStatisticClick}
                dataList={dataList}
                paginationHandler={paginationHandler}
                setDataList={setDataList}
                handleClickChart={handleClickChart}
              />
              <ModalAnalytic />
              
            </Col>
          </Row>
        </div>
        {/* <div className={styles.leftcol}>
        </div> */}
        {/* <div className={styles.midcol}>
        </div> */}
      </div>
    </div>
  );
};

CommandCenter.layout = (page) => <CommandLayout>{page}</CommandLayout>;

export default CommandCenter;
