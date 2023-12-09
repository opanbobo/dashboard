import SpokeLayout from "components/layouts/spokeLayout";
import { Fragment, useState, useEffect } from "react";

import styles from "styles/layout/spokeperson.module.scss";
import {
  gutter,
  Button,
  ColumnList,
  Row,
  Col,
  Tag,
  Image,
  Card,
  Tooltip,
  Drawer,
  Modal,
  Loading,
  DatePicker,
} from "components";

import { notification } from "antd";

import { BarHorizontal } from "constant/mock/options";
import breakPointOberver from "constant/mediaQuery";

import SpokeChart from "modules/spokperson/spokechart";
import SpokeTable from "modules/spokperson/spoketable";
import ModalChartList from "modules/spokperson/modalChartList";

import { useDispatch, useSelector } from "react-redux";
import {
  excellSpoke,
  getSpokepersonDetail,
  getSpokepersonList,
  getSpokepersonStatistic,
  getSpokepersonStatisticClick,
  postBtSpoke,
} from "store/actions/spokespersonActions";

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
import { getKeywordArticle } from "store/actions/newsClippingActions";

const breakPoints = {
  tablet: "(min-width: 300px) and (max-width: 500px)",
  desktop: "(min-width: 1024px)",
};

const Spokeperson = () => {
  const [breakPoint, isBreakPoint] = useState();
  const [dataList, setDataList] = useState({
    page: 0,
    max_size: 10,
  });
  const [dataTable, setDataTable] = useState({
    page: 0,
    max_size: 10,
  });

  const dispatch = useDispatch();
  const spokeperson = useSelector((state) => state.spokeperson);
  const {
    spokepersonList,
    spokepersonStatistic,
    spokepersonDetail,
    spokepersonStatisticClick,
  } = spokeperson;
  const filters = useSelector((state) => state.filter);
  const { filter } = filters;

  const [loading, setloading] = useState(true);
  const [chartsChange, setchartsChange] = useState(false);
  const [articleDetail, setArticleDetail] = useState({});
  const [openDetail, setopenDetail] = useState(false);
  const [chartList, setChartList] = useState(false);
  const [keyword, setKeyword] = useState([]);
  const [checkDone, setCheckDone] = useState(false);
  const [btDate, setBtDate] = useState("");
  const [btEDate, setBtEDate] = useState("");
  const [backtrack, setBacktrack] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);

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
    breakPointOberver(breakPoints, isBreakPoint);
  }, [breakPoint]);

  useEffect(() => {
    // const userToken = JSON.parse(localStorage.getItem("userToken"));

    // fetch("http://206.189.89.203:4945/v2/status", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Token ${userToken.token}`,
    //   },
    //   body: JSON.stringify({
    //     client_id: userToken.client_id,
    //   }),
    // })
    //   .then((data) => data.json())
    //   .then(() => {
    //     if (data.status == "not registered") {
    //     } else {

    //   );
    //       setBacktrack(true);
    //     }

    //     setCheckDone(true);
    dispatch(getSpokepersonList({ ...filter.result, page: 0, max_size: 10 }));
    dispatch(
      getSpokepersonStatistic({
        ...filter.result,
        limit: 10,
        page: 0,
        max_size: 10,
      })
    ).catch((err) => console.log(err));
  }, [filter]);

  const handleChart = () => {
    setchartsChange(!chartsChange);
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
        setArticleDetail(itemData);
        setopenDetail(true);
        setKeyword(data.data);
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
        influencer: dataList.label || dataList.influencer_name,
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
                        // 	?.join("")
                        // 	.split("\\")
                        // 	.join("")
                        // 	.split('"')
                        // 	.filter((e) => e && (e !== " "))
                        // 	.join("|"),
                        "gi"
                      ),
                      (match) => `<b class="highlight-text">${match}</b>`
                    ),
                  }}
                ></div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            {articleDetail.category_id?.map((item) => {
              return (
                <Tag key={item} color="processing">
                  {item}
                </Tag>
              );
            })}
            {/* <Tag color="processing">{articleDetail.category_id}</Tag> */}
          </Col>
        </Row>
      </Drawer>
    );
  };

  const HighlighPerson = ({ data, props }) => {
    const textEllipis = {
      display: "-webkit-box",
      maxWidth: "80%",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      textAlign: "center",
    };
    return (
      <>
        {!spokepersonStatistic.loading ? (
          <Row
            align="middle"
            justify={breakPoint == "tablet" ? "start" : "space-around"}
          >
            {data.map((item, idx) => {
              return (
                <Col xs={6} sm={4} md={2} lg={2} xl={2} key={idx}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Card
                      onLoading={spokepersonStatistic.loading}
                      {...props}
                      hoverable
                      style={{ height: 65, width: 65 }}
                      cover={item.image}
                      onClick={() => {
                        dispatch(
                          getSpokepersonStatisticClick({
                            ...filter.result,
                            page: 0,
                            max_size: 10,
                            tone: "all",
                            influencer: item.label || item.influencer_name,
                            order: "desc",
                          })
                        );

                        setDataList({
                          ...dataList,
                          ...item,
                        });
                        setChartList(true);
                      }}
                    />
                    <div style={textEllipis}>{item.label}</div>
                  </div>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Loading />
        )}
      </>
    );
  };

  return (
    <Row>
      {/* {!checkDone ? (
        <p>Checking Status...</p>
      ) : !backtrack ? (
        <Row align="middle">
          <Col>Please select date for backtrack:</Col>
          <Col>
            <Row>
              <Col>
                Start Date :
                <DatePicker onChange={(e) => setBtDate(e.format("YYYY-MM-DD"))} />
              </Col>
              <Col>
                End Date :
                <DatePicker onChange={(e) => setBtEDate(e.format("YYYY-MM-DD"))} />
              </Col>
            </Row>
            <Button
              onClick={() => {
                const userToken = JSON.parse(localStorage.getItem("userToken"));

                postBtSpoke({
                  "start_date":btDate,
                  "client_id":userToken.client_id,
                  "to_date":btEDate
              })
                  .then((data) => data.json())
                  .then((data) => {
                    if (data.message == "client_id is successfully registered") {
                      notification.success({ message: "Success backtrack" });

                      dispatch(
                        getSpokepersonList({ ...filter.result, page: 0, max_size: 10 })
                      );
                      dispatch(
                        getSpokepersonStatistic({
                          ...filter.result,
                          limit: 10,
                          page: 0,
                          max_size: 10,
                        })
                      );

                      setBacktrack(true);
                    } else {
                      notification.error({ message: "Error happen when add backtrack date!" })
                    }
                  })
                  .catch((err) => notification.error({ message: "Error happen when add backtrack date!" }));
              }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      ) : (
        <>
          <Col span={24}>
            <Row align="middle" justify="center">
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card title="spokeperson">
                  <HighlighPerson
                    data={
                      spokepersonStatistic.result.data
                        ? spokepersonStatistic.result.data.map((item) => {
                            const foto = mockperson.findIndex(
                              (a) => a.name == item.influencer_name
                            );
                            return {
                              label: item.influencer_name,
                              image: (
                                <Tooltip
                                  key={item.influencer_name}
                                  title={item.influencer_name}
                                  placement="bottom"
                                >
                                  <Image
                                    src={item.image ? item.image : avatar}
                                    url={
                                      item.image
                                        ? "https://demo.digivla.id"
                                        : null
                                    }
                                    layout="fill"
                                    objectFit="cover"
                                    alt="person"
                                    priority="true"
                                  />
                                </Tooltip>
                              ),
                            };
                          })
                        : []
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <SpokeChart
                  cards={{
                    title: "spokeperson breakdown",
                    onLoading: spokepersonStatistic.loading,
                    shadow: true,
                    extra: (
                      <Button size="small" type="link" onClick={handleChart}>
                        view
                      </Button>
                    ),
                  }}
                  charts={{
                    series: [
                      {
                        name: "negative",
                        data: spokepersonStatistic.result.data
                          ? spokepersonStatistic.result.data.map((item) => {
                              return item.count.negative;
                            })
                          : [],
                      },
                      {
                        name: "neutral",
                        data: spokepersonStatistic.result.data
                          ? spokepersonStatistic.result.data.map((item) => {
                              return item.count.netral;
                            })
                          : [],
                      },
                      {
                        name: "positive",
                        data: spokepersonStatistic.result.data
                          ? spokepersonStatistic.result.data.map((item) => {
                              return item.count.positive;
                            })
                          : [],
                      },
                    ],
                    events: {
                      dataPointSelection(e, chart, config) {
                        dispatch(
                          getSpokepersonStatisticClick({
                            ...filter.result,
                            page: 0,
                            max_size: 10,
                            tone: config.seriesIndex - 1,
                            influencer:
                              spokepersonStatistic.result.data[
                                config.dataPointIndex
                              ].influencer_name,
                            order: "desc",
                          })
                        );

                        setChartList(true);
                        setDataList({
                          ...dataList,
                          ...spokepersonStatistic.result.data[
                            config.dataPointIndex
                          ],
                        });
                      },
                    },
                    chartOptions: {
                      stacked: true,
                    },
                    options: {
                      colors: BarHorizontal.colors,
                      plotOptions: {
                        bar: {
                          horizontal: chartsChange,
                          borderRadius: 6,
                        },
                      },
                      xaxis: {
                        categories: spokepersonStatistic.result.data
                          ? spokepersonStatistic.result.data.map((item) => {
                              return item.influencer_name;
                            })
                          : [],
                      },
                      legend: BarHorizontal.legend,
                    },
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <SpokeTable
              cards={{
                onLoading: spokepersonList.loading,
                title: "spokeperson list",
                extra: `Total: ${spokepersonList.result.data?.length}`,
              }}
              tables={{
                data: spokepersonList.result.data
                  ? spokepersonList.result.data
                  : [],
                rowKey: (record) => {
                  return record.quotes;
                },
                expandable: {
                  expandedRowRender: (record) => (
                    <p style={{ margin: 0 }}>{record.quotes}</p>
                  ),
                  rowExpandable: (record) =>
                    record.influencer_name !== "Not Expandable",
                },
                pagination: {
                  total: spokepersonList.result.recordsTotal,
                  showTotal: (total) => `Total ${total} article`,
                  current: dataTable.page + 1,
                  pageSize: dataTable.max_size,
                  onChange: (editingPage, editingPageSize) => {
                    dispatch(
                      getSpokepersonList({
                        ...filter.result,
                        page: editingPage - 1,
                        max_size: editingPageSize,
                      })
                    );

                    setDataTable({
                      page: editingPage - 1,
                      max_size: editingPageSize,
                    });
                  },
                },
                column: [
                  {
                    title: "Spokeperson List",
                    render: (record) => (
                      <Fragment>
                        <ColumnList title="Date" content={record.datee} />
                        <ColumnList title="Media" content={record.media} />
                        <ColumnList
                          title="Spokeperson"
                          content={record.influencer_name}
                        />
                        <ColumnList title="tone" content={record.tone} />
                        <ColumnList title="action" type="action">
                          <Button size="small" icons="EditTwotone" />
                        </ColumnList>
                      </Fragment>
                    ),
                    responsive: ["xs"],
                  },
                  {
                    title: "Date",
                    dataIndex: "datee",
                    key: "datee",
                    width: 100,
                    responsive: ["md"],
                    sorter: (a, b) => a.datee - b.datee,
                  },
                  {
                    title: "Name",
                    dataIndex: "influencer_name",
                    key: "influencer_name",
                    ellipsis: true,
                    responsive: ["md"],
                    sorter: (a, b) =>
                      a.influencer_name.length - b.influencer_name.length,
                    // render: (text, record) => {
                    //   return <ColumnList>{record.influencer_name}</ColumnList>;
                    // },
                  },
                  {
                    title: "Media",
                    dataIndex: "media",
                    key: "media_id",
                    responsive: ["md"],
                    sorter: (a, b) => a.media_id - b.media_id,
                  },
                  {
                    title: "Tone",
                    dataIndex: "tones",
                    key: "tones",
                    width: 100,
                    responsive: ["md"],
                    sorter: (a, b) => a.tones - b.tones,
                    render: (text, record) => {
                      return (
                        <Tag
                          color={
                            record.tone == 0
                              ? "processing"
                              : record.tone == 1
                              ? "success"
                              : "error"
                          }
                        >
                          {record.tone < 0
                            ? "Negative"
                            : record.tone > 0
                            ? "Positive"
                            : "Neutral"}
                        </Tag>
                      );
                    },
                  },
                  {
                    title: "Action",
                    key: "action",
                    width: 60,
                    align: "center",
                    responsive: ["md"],
                    render: (text, record) => (
                      <ColumnList type="action">
                        <Button
                          size="small"
                          icons="EditOutlined"
                          onClick={() => {
                            setArticleDetail(record);
                            setopenDetail(true);
                            dispatch(
                              getSpokepersonDetail({
                                article_id: record.article_id,
                              })
                            );
                          }}
                        />
                      </ColumnList>
                    ),
                  },
                ],
              }}
            />
          </Col>
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
        </>
      )} */}
      <Col span={24}>
        <Row align="middle" justify="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card title="spokeperson">
              <HighlighPerson
                data={
                  spokepersonStatistic.result.data
                    ? spokepersonStatistic.result.data.map((item) => {
                        const foto = mockperson.findIndex(
                          (a) => a.name == item.influencer_name
                        );
                        return {
                          label: item.influencer_name,
                          image: (
                            <Tooltip
                              key={item.influencer_name}
                              title={item.influencer_name}
                              placement="bottom"
                            >
                              <Image
                                src={item.image ? item.image : avatar}
                                url={
                                  item.image ? "https://demo.digivla.id" : null
                                }
                                layout="fill"
                                objectFit="cover"
                                alt="person"
                                priority="true"
                              />
                            </Tooltip>
                          ),
                        };
                      })
                    : []
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <SpokeChart
              cards={{
                title: "spokeperson breakdown",
                onLoading: spokepersonStatistic.loading,
                shadow: true,
                extra: (
                  <Button size="small" type="link" onClick={handleChart}>
                    view
                  </Button>
                ),
              }}
              charts={{
                series: [
                  {
                    name: "negative",
                    data: spokepersonStatistic.result.data
                      ? spokepersonStatistic.result.data.map((item) => {
                          return item.count.negative;
                        })
                      : [],
                  },
                  {
                    name: "neutral",
                    data: spokepersonStatistic.result.data
                      ? spokepersonStatistic.result.data.map((item) => {
                          return item.count.netral;
                        })
                      : [],
                  },
                  {
                    name: "positive",
                    data: spokepersonStatistic.result.data
                      ? spokepersonStatistic.result.data.map((item) => {
                          return item.count.positive;
                        })
                      : [],
                  },
                ],
                events: {
                  dataPointSelection(e, chart, config) {
                    dispatch(
                      getSpokepersonStatisticClick({
                        ...filter.result,
                        page: 0,
                        max_size: 10,
                        tone: config.seriesIndex - 1,
                        influencer:
                          spokepersonStatistic.result.data[
                            config.dataPointIndex
                          ].influencer_name,
                        order: "desc",
                      })
                    );

                    setChartList(true);
                    setDataList({
                      ...dataList,
                      ...spokepersonStatistic.result.data[
                        config.dataPointIndex
                      ],
                    });
                  },
                },
                chartOptions: {
                  stacked: true,
                },
                options: {
                  colors: BarHorizontal.colors,
                  plotOptions: {
                    bar: {
                      horizontal: chartsChange,
                      borderRadius: 6,
                    },
                  },
                  xaxis: {
                    categories: spokepersonStatistic.result.data
                      ? spokepersonStatistic.result.data.map((item) => {
                          return item.influencer_name;
                        })
                      : [],
                  },
                  legend: BarHorizontal.legend,
                },
              }}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <SpokeTable
          cards={{
            onLoading: spokepersonList.loading,
            title: "spokeperson list",
            extra: `Total: ${spokepersonList.result.data?.length}`,
          }}
          tables={{
            data: spokepersonList.result.data
              ? spokepersonList.result.data
              : [],
            rowKey: (record) => {
              return record.quotes;
            },
            expandable: {
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.quotes}</p>
              ),
              rowExpandable: (record) =>
                record.influencer_name !== "Not Expandable",
            },
            pagination: {
              showSizeChanger: true,
              total: spokepersonList.result.recordsTotal,
              showTotal: (total) => `Total ${total} article`,
              current: dataTable.page + 1,
              pageSize: dataTable.max_size,
              onChange: (editingPage, editingPageSize) => {
                dispatch(
                  getSpokepersonList({
                    ...filter.result,
                    page: editingPage - 1,
                    max_size: editingPageSize,
                  })
                );

                setDataTable({
                  page: editingPage - 1,
                  max_size: editingPageSize,
                });
              },
            },
            column: [
              {
                title: "Spokeperson List",
                render: (record) => (
                  <Fragment>
                    <ColumnList title="Date" content={record.datee} />
                    <ColumnList title="Media" content={record.media} />
                    <ColumnList
                      title="Spokeperson"
                      content={record.influencer_name}
                    />
                    <ColumnList title="tone" content={record.tone} />
                    <ColumnList title="action" type="action">
                      <Button size="small" icons="EditTwotone" />
                    </ColumnList>
                  </Fragment>
                ),
                responsive: ["xs"],
              },
              {
                title: "Date",
                dataIndex: "datee",
                key: "datee",
                width: 100,
                responsive: ["md"],
                sorter: (a, b) => a.datee - b.datee,
              },
              {
                title: "Name",
                dataIndex: "influencer_name",
                key: "influencer_name",
                ellipsis: true,
                responsive: ["md"],
                sorter: (a, b) =>
                  a.influencer_name.length - b.influencer_name.length,
                // render: (text, record) => {
                //   return <ColumnList>{record.influencer_name}</ColumnList>;
                // },
              },
              {
                title: "Media",
                dataIndex: "media",
                key: "media_id",
                responsive: ["md"],
                sorter: (a, b) => a.media_id - b.media_id,
              },
              {
                title: "Tone",
                dataIndex: "tones",
                key: "tones",
                width: 100,
                responsive: ["md"],
                sorter: (a, b) => a.tones - b.tones,
                render: (text, record) => {
                  return (
                    <Tag
                      color={
                        record.tone == 0
                          ? "processing"
                          : record.tone == 1
                          ? "success"
                          : "error"
                      }
                    >
                      {record.tone < 0
                        ? "Negative"
                        : record.tone > 0
                        ? "Positive"
                        : "Neutral"}
                    </Tag>
                  );
                },
              },
              {
                title: "Action",
                key: "action",
                width: 60,
                align: "center",
                responsive: ["md"],
                render: (text, record) => (
                  <ColumnList type="action">
                    <Button
                      size="small"
                      icons="EditOutlined"
                      onClick={() => {
                        setArticleDetail(record);
                        setopenDetail(true);
                        dispatch(
                          getSpokepersonDetail({
                            article_id: record.article_id,
                          })
                        );
                      }}
                    />
                  </ColumnList>
                ),
              },
            ],
          }}
        />
      </Col>
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
      {/* 
      sesuai request hide
      <div
        style={{
          position: "absolute",
          zIndex: 999,
          right: 20,
          bottom: breakPoint == "tablet" ? "30%" : 100,
        }}
      >
        <Button
          style={downloadBtn}
          loading={excelLoading}
          onClick={(e) => {
            e.preventDefault();
            setExcelLoading(true);

            excellSpoke({
              ...filter.result
            }).then(data => data.json()).then(data => {
              if (data.code == 200) {
                window.open(data.data.filepath);

                setExcelLoading(false);
              } else {
                notification.error({ message: "Error when download excel" });

                setExcelLoading(false);
              }
            }).catch(err => {
              notification.error({ message: "Error when download excel" });

              setExcelLoading(false);
            });
          }}
          type="primary"
          icons="DownloadOutlined"
          shape="round"
        >
          Download
        </Button>
      </div> */}
    </Row>
  );
};

Spokeperson.layout = SpokeLayout;

export default Spokeperson;

const downloadBtn = {
  boxShadow: "3px 0px 20px -12px rgba(54, 65, 76, 0.5)",
};
