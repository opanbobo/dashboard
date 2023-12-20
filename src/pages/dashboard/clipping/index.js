import { Fragment, useState, useEffect, useMemo } from "react";
import {
  Tabset,
  ColumnList,
  Button,
  Tooltip,
  Dropdown,
  Space,
  Tag,
  Input,
  Row,
  Col,
  gutter,
  Modal,
  Icon,
  Popconfirm,
  notification,
} from "components";
import { prettyPrice } from "constant/formatter";
import breakPointOberver from "constant/mediaQuery";

import ClippingList from "modules/clipping/clippingList";
import ClippingEdit from "modules/clipping/clippingEdit";
import SaveArticle from "modules/clipping/saveArticle";
import { saveArticleSeries, tagCategorySeries } from "constant/mock/data";

import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  createTopIssue,
  deleteArticle,
  getIssueAuto,
  getKeywordArticle,
  getNewsClipping,
  newsClippingDownloadDocxs,
  newsClippingDownloadPdf,
  newsClippingSendEmail,
  saveArticleAct,
  setNewsClipping,
  updateNewsClippingSummary,
  updateNewsClippingTitle,
  updateNewsClippingTone,
  updateNewsClippingTones,
  addSponsorArticle,
  sponsorPromise,
  addArticleSponsor,
} from "store/actions/newsClippingActions";

import EditDrawer from "modules/clipping/EditDrawer";
import { AutoComplete } from "antd";
import { updateIssue } from "store/actions/issueActions";
import keywordsCleansing from "utils/CleansingKeywords";
import { keywordSet } from "utils/keywordSet";
const Drawer = dynamic(() => import("components/elements/drawer"));

const breakPoints = {
  tablet: "(max-width: 450px)",
  ellipsis: "(max-width: 1024px)",
  tags: "(max-width: 800px)",
};

const sponsorMock = ["sponsorship 1", "sponsorship 2", "sponsorship 3"];

const Clipping = () => {
  const dispatch = useDispatch();
  const [breakPoint, isBreakPoint] = useState();

  const ID_BU = JSON.parse(localStorage.getItem("userToken"));

  const newsClipping = useSelector((state) => state.newsClipping);
  const filters = useSelector((state) => state.filter);
  const issues = useSelector((state) => state.issues);
  const { filter } = filters;
  const { newsClippingList, issueAuto } = newsClipping;

  const [selectedRowClipping, setSelectedClipping] = useState([]);
  const [selectedRowEditing, setSelectedEditing] = useState([]);

  const [modalCreate, setmodalCreate] = useState(false);
  const [modalUpdateIssue, setmodalUpdateIssue] = useState(false);
  const [modalSendEmail, setmodalSendEmail] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [pageEditing, setPageEditing] = useState(0);
  const [pageSizeEditing, setPageSizeEditing] = useState(10);

  const [newIssue, setNewIssue] = useState("");
  const [newTopic, setNewTopic] = useState("");

  const [sponsorCol, setSponsorCol] = useState(false);
  const [sponsorList, setSponsorList] = useState([]);

  useEffect(() => {
    breakPointOberver(breakPoints, isBreakPoint);
  }, [breakPoint]);

  useEffect(() => {
    dispatch(getIssueAuto());
    if (ID_BU.comp_id == 1198) {
      setSponsorCol(true);
    }
  }, []);

  useEffect(() => {
    dispatch(
      getNewsClipping({
        ...filter.result,
        maxSize: 10,
        page: 0,
      })
    );
  }, [filter]);

  const [clipEditSelection, setclipEditSelection] = useState("checkbox");

  const [clipListPop, setclipListPop] = useState(false);
  const [clipEditingPop, setclipEditingPop] = useState(false);

  const [saveArticlePop, setsaveArticlePop] = useState(false);
  const [summaryEdit, setsummaryEdit] = useState(false);

  const [disabled, setdisabled] = useState(true);
  const [loading, setloading] = useState(true);
  const [buttonLoading, setbuttonLoading] = useState(false);

  const [clippingDrawer, setClippingDrawer] = useState({});
  const [editingDrawerTemp, setEditingDrawerTemp] = useState({});

  const [clippingEmail, setclippingEmail] = useState("");
  const [searchClipping, setsearchClipping] = useState("");
  const [searchEditing, setsearchEditing] = useState("");
  const [keyword, setKeyword] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 500);
  }, [loading]);

  const logoType = useMemo(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

    return origin === "https://ojk.media-insight.id";
  }, []);

  const handleSubmitEditingModal = async (
    newTitle,
    newTone,
    newContent,
    newIssue,
    newSubCategories
  ) => {
    try {
      setbuttonLoading(true);

      let data = null;

      if (!(editingDrawerTemp.title == newTitle)) {
        data = await updateNewsClippingTitle({
          category_id: editingDrawerTemp.category_id,
          article_id: editingDrawerTemp.article_id,
          title: newTitle,
        });
      }

      data = await updateNewsClippingTone({
        category_id: editingDrawerTemp.category_id,
        article_id: editingDrawerTemp.article_id,
        tone: newTone,
      });
      // if (!(editingDrawerTemp.tone == newTone)) {
      // }

      if (!(editingDrawerTemp.summary == newContent)) {
        data = await updateNewsClippingSummary({
          category_id: editingDrawerTemp.category_id,
          article_id: editingDrawerTemp.article_id,
          summary: newContent,
        });
      }

      if (!(editingDrawerTemp.issue == newIssue)) {
        data = await updateIssue({
          article_id: [editingDrawerTemp.article_id],
          topic: [editingDrawerTemp.issue],
          new_topic: newIssue,
        });
      }

      data = await saveArticleAct({
        article_id: editingDrawerTemp.article_id,
        category_ids: editingDrawerTemp.categories,
        datee: editingDrawerTemp.datee.split(" ")[0],
        media_id: editingDrawerTemp.media_id,
        tone: editingDrawerTemp.tone,
        advalue_fc: editingDrawerTemp.rate_fc,
        circulation: editingDrawerTemp.circulation,
        advalue_bw: editingDrawerTemp.rate_bw,
      });

      if (editingDrawerTemp.sponsor) {
        data = await addArticleSponsor({
          article_ids: [editingDrawerTemp.article_id],
          sponsor_ids: editingDrawerTemp.sponsor.map((e) => e.id),
        });
      }

      setclipEditingPop(false);
      setEditingDrawerTemp({});
      setsaveArticlePop(false);
      dispatch(
        getNewsClipping({
          ...filter.result,
          maxSize: pageSizeEditing,
          page: pageEditing,
        })
      );
      setbuttonLoading(false);
      notification.success({
        message: "Data has been Updated",
        duration: 3,
      });
    } catch (err) {
      notification.error({
        message: "Please check your update request!!",
        duration: 3,
      });
    }
  };

  const handlePdf = (body) => {
    const user = JSON.parse(localStorage.getItem("userToken"));

    newsClippingDownloadPdf({
      doc_type: body,
      logo_name: user.comp_icon,
      articles: selectedRowClipping,
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          window.open(data.data.link);
          setSelectedClipping([]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleWord = () => {
    const user = JSON.parse(localStorage.getItem("userToken"));

    newsClippingDownloadDocxs({
      logo_name: user.comp_icon,
      articles: selectedRowClipping,
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          window.open(data.data);
          setSelectedClipping([]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleMultipleUpdate = (tone) => {
    updateNewsClippingTones({
      category_id: selectedRowEditing.map((item) => item.category_id),
      article_id: selectedRowEditing.map((item) => item.article_id),
      tone,
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          dispatch(
            setNewsClipping({
              ...newsClippingList.result,
              data: newsClippingList.result.data.map((e) => {
                if (data.data.length) {
                  if (data.data.find((et) => et.article_id == e.article_id)) {
                    return {
                      ...e,
                      ...data.data.find((et) => et.article_id == e.article_id),
                    };
                  } else {
                    return e;
                  }
                } else {
                  if (data.data.article_id == e.article_id) {
                    return {
                      ...e,
                      ...data.data,
                    };
                  } else {
                    return e;
                  }
                }
              }),
            })
          );

          setSelectedEditing([]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (type) => {
    deleteArticle(
      type == "edit"
        ? selectedRowEditing.map((item) => ({ article_id: item.article_id }))
        : selectedRowClipping.map((item) => ({ article_id: item.article_id }))
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          dispatch(
            getNewsClipping({
              ...filter.result,
              maxSize: pageSizeEditing,
              page: pageEditing,
            })
          );

          if (type == "edit") {
            setSelectedEditing([]);
            notification.success({
              message: `Article from ${selectedRowEditing.map(
                (item) => item.media_name
              )} has been delete`,
              duration: 3,
            });
          } else {
            setSelectedClipping([]);
            notification.success({
              message: `Article from ${selectedRowClipping.map(
                (item) => item.media_name
              )} has been delete`,
              duration: 3,
            });
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const downloadMenu = (
    <>
      <Button type="dashed" icons="ScanOutlined" onClick={() => handlePdf(0)}>
        Scan File
      </Button>
      <Button type="dashed" icons="FileWordOutlined" onClick={handleWord}>
        Word File
      </Button>
      <Button
        type="dashed"
        icons="PrinterOutlined"
        onClick={() => handlePdf(1)}
      >
        Print File
      </Button>
    </>
  );

  const updateMenu = (
    <>
      <Button onClick={() => handleMultipleUpdate(1)}>Positive</Button>
      <Button onClick={() => handleMultipleUpdate(0)}>Neutral</Button>
      <Button onClick={() => handleMultipleUpdate(-1)}>Negative</Button>
    </>
  );

  const handleUpdateIssue = (value) => {
    updateIssue({
      article_id: editingDrawerTemp.article_id,
      topic: editingDrawerTemp.issue,
      new_topic: value,
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          dispatch(
            getNewsClipping({
              ...filter.result,
              maxSize: pageSizeEditing,
              page: pageEditing,
            })
          );

          setSelectedEditing([]);
          setNewTopic("");
          notification.success({
            message: `Issue from ${editingDrawerTemp.article_id} has been update`,
            description: `Old Issue: ${editingDrawerTemp.issue} <br/> New Issue: ${value}`,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setSelectedEditing([]);
        setNewTopic("");
        notification.error({
          message: "Please check your update request",
        });
      });
  };

  const handleSendEmail = (value) => {
    if (value) {
      newsClippingSendEmail({
        data: selectedRowClipping.map((item) => ({
          article_id: item.article_id,
          category_id: item.category_id,
        })),
        email: value,
      })
        .then((data) => data.json())
        .then(() => {
          setSelectedClipping([]);
          setmodalSendEmail(false);
          setclippingEmail("");

          notification.success({
            message: "E-mail has been send",
          });
        });
    } else {
      notification.error({
        message: "E-mail address is Empty!!!",
      });
    }
  };

  const handleEditing = (id, value) => {
    getKeywordArticle({
      article_id: value.article_id,
    })
      .then((data) => data.json())
      .then((data) => {
        setKeyword(data.data);
        setEditingDrawerTemp(value);
        setclipEditingPop(true);
      })
      .catch((err) => console.log(err));
  };

  const handleClipping = (value) => {
    getKeywordArticle({
      article_id: value.article_id,
    })
      .then((data) => data.json())
      .then((data) => {
        setKeyword(data.data);
        setClippingDrawer(value);
        setclipListPop(true);
      })
      .catch((err) => console.log(err));
  };

  const handleOpenIssue = (id, value) => {
    setEditingDrawerTemp(value);
    setmodalUpdateIssue(true);
  };

  const handleOpenEmail = (id) => {
    setmodalSendEmail(true);
  };

  return (
    <>
      <Tabset
        style={{ height: "100%" }}
        tabPosition="top"
        data={[
          {
            key: 1,
            title: "News List",
            content: (
              <ClippingList
                cards={{ onLoading: newsClippingList.loading }}
                info={
                  <Row justify="space-between" align="middle">
                    <Col span={24}>
                      <Row align="middle" justify="start">
                        <Col flex="200px">
                          <Input
                            size="small"
                            placeholder="search"
                            defaultValue={searchClipping}
                            onChange={(e) => setsearchClipping(e.target.value)}
                          />
                        </Col>
                        <Col flex="auto">
                          <Button
                            size="small"
                            type="primary"
                            icons="SearchOutlined"
                            onClick={() => {
                              dispatch(
                                getNewsClipping({
                                  ...filter.result,
                                  page: 0,
                                  maxSize: 10,
                                  term: searchClipping,
                                })
                              );
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col flex={100}>
                      <label style={{ textTransform: "capitalize" }}>
                        article found: {selectedRowClipping.length} /{" "}
                        {newsClippingList.result.recordsTotal || 0}
                      </label>
                    </Col>
                    <Col flex="auto">
                      <Space>
                        <Button
                          type="dashed"
                          icons="MailOutlined"
                          disabled={
                            selectedRowClipping.length <= 0 ? disabled : null
                          }
                          onClick={() => handleOpenEmail(selectedRowClipping)}
                        >
                          Email File
                        </Button>
                        <Dropdown
                          overlay={downloadMenu}
                          direction="horizontal"
                          trigger="click"
                          placement="bottomCenter"
                          disabled={
                            selectedRowClipping.length <= 0 ? disabled : null
                          }
                        >
                          <Button
                            block="true"
                            icons="DownloadOutlined"
                            onClick={(e) => e.preventDefault()}
                          >
                            Download
                          </Button>
                        </Dropdown>
                        <Popconfirm
                          title="Are you sure to delete this?"
                          onConfirm={() => handleDelete("clip")}
                          onCancel={() => {
                            setSelectedClipping([]);
                          }}
                        >
                          <Button
                            disabled={
                              selectedRowClipping.length <= 0 ? disabled : null
                            }
                            icons="DeleteOutlined"
                            type="dashed"
                            danger="true"
                          />
                        </Popconfirm>
                      </Space>
                    </Col>
                  </Row>
                }
                tables={{
                  data: newsClippingList.result.data
                    ? newsClippingList.result.data
                    : [],
                  pagination: {
                    showSizeChanger: true,
                    total: newsClippingList.result.recordsTotal,
                    showTotal: (total) => `Total ${total} article`,
                    current: page + 1,
                    pageSize: pageSize,
                    onChange: (page, pageSize) => {
                      dispatch(
                        getNewsClipping(
                          {
                            ...filter.result,
                            page: page - 1,
                            maxSize: pageSize,
                            term: searchClipping ? searchClipping : undefined,
                          },
                          setPage(page - 1),
                          setPageSize(pageSize)
                        )
                      );
                    },
                  },
                  rowSelection: {
                    type: "checkbox",
                    onSelectAll: (selected, selectedRows, changeRows) => {
                      if (selected) {
                        let data = selectedRowClipping.filter(
                          (e) =>
                            !changeRows.find(
                              (f) => e.article_id == f.article_id
                            )
                        );

                        setSelectedClipping(data.concat(changeRows));
                      } else {
                        let data = selectedRowClipping.filter(
                          (e) =>
                            !changeRows.find(
                              (f) => e.article_id == f.article_id
                            )
                        );

                        setSelectedClipping(data);
                      }
                    },
                    onSelect: (record, selected, selectedRows, nativeEvent) => {
                      const data = selectedRowClipping.find(
                        (row) => row.article_id == record.article_id
                      );

                      const temp = data
                        ? selectedRowClipping.filter(
                            (e) => e.article_id !== record.article_id
                          )
                        : [...selectedRowClipping, record];

                      setSelectedClipping(temp);
                    },
                    getCheckboxProps: (record) => ({
                      rowKey: record.article_id,
                    }),
                    selectedRowKeys: selectedRowClipping.map(
                      (item) => item.article_id
                    ),
                  },
                  rowKey: (record) => record.article_id,
                  expandable: {
                    expandedRowRender: (record) => (
                      <div style={{ padding: "0 4px" }}>
                        <p style={{ fontWeight: 500, marginBottom: 3 }}>
                          {record.title}
                        </p>

                        <p style={{ fontWeight: 500, marginBottom: 3 }}>
                          Issue:
                          <span style={{ fontWeight: "normal", marginLeft: 3 }}>
                            <Tag
                              icons="InfoCircleOutlined"
                              color={record.issue != null ? "processing" : ""}
                            >
                              <span style={{ textTransform: "capitalize" }}>
                                {record.issue != null
                                  ? record.issue
                                  : "undifined"}
                              </span>
                            </Tag>
                          </span>
                        </p>
                        <p style={{ ...textEllipis, textAlign: "justify" }}>
                          <p style={{ fontWeight: 500, marginBottom: 3 }}>
                            Content:
                          </p>
                          {record.content}
                        </p>
                        {sponsorCol && (
                          <div>
                            <p style={{ fontWeight: 500, marginBottom: 3 }}>
                              Sponsorship:
                            </p>
                            {record.sponsor.map((item) => (
                              <Tag key={item.id} icons="InfoCircleOutlined">
                                {item.name}
                              </Tag>
                            ))}
                          </div>
                        )}
                      </div>
                    ),
                    rowExpandable: (record) =>
                      record.media_name !== "Not Expandable",
                  },
                  column: [
                    {
                      title: "Clipping List",
                      render: (record) => (
                        <Fragment>
                          <ColumnList title="Date" content={record.datee} />
                          <ColumnList
                            title="Media"
                            content={record.media_name}
                          />
                          <ColumnList
                            bold
                            title="headline"
                            ellipsis
                            content={record.title}
                          />
                          <ColumnList title="action" type="action">
                            <Button
                              size="small"
                              icons="EditTwotone"
                              onClick={() => {
                                handleClipping(record);
                              }}
                            />
                            <Button
                              size="small"
                              type="action"
                              icons="FileSyncOutlined"
                              onClick={() => window.open(record.preview_link)}
                            />
                          </ColumnList>
                        </Fragment>
                      ),
                      responsive: ["xs"],
                    },
                    {
                      title: "Date",
                      dataIndex: "datee",
                      width: 160,
                      responsive: ["md"],
                      sorter: (a, b) => a.datee - b.datee,
                    },
                    {
                      title: "Media",
                      dataIndex: "media_name",
                      width: 200,
                      responsive: ["md"],
                      sorter: (a, b) =>
                        a.media_name.length - b.media_name.length,
                      render: (text, record) => {
                        return (
                          <a
                            href={record.file_pdf}
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(
                                record.file_pdf.split(".")[1] == "pdf"
                                  ? (logoType ? "https://api.media-insight.id/media/pdf_images/" : "https://api.digivla.id/media/pdf_images/") +
                                      record.datee
                                        .split(" ")[0]
                                        .split("-")
                                        .join("/") +
                                      "/" +
                                      record.file_pdf
                                  : record.file_pdf
                              );
                            }}
                          >
                            {text}
                          </a>
                        );
                      },
                    },
                    {
                      title: "Headline",
                      dataIndex: "title",
                      ellipsis: breakPoint == "ellipsis" ? true : false,
                      responsive: ["md"],
                    },
                    {
                      title: "Issue",
                      dataIndex: "issue",
                      width: 100,
                      responsive: ["md"],
                      sorter: (a, b) => a.issue - b.issue,
                    },
                    {
                      title: "Action",
                      key: "action",
                      width: 90,
                      align: "center",
                      responsive: ["md"],
                      render: (text, record) => (
                        <ColumnList type="action">
                          <Tooltip title="edit article" placement="left">
                            <Button
                              size="small"
                              icons="EditOutlined"
                              onClick={() => {
                                handleClipping(record);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="preview article" placement="left">
                            <Button
                              size="small"
                              icons="FileSyncOutlined"
                              onClick={() => window.open(record.preview_link)}
                            />
                          </Tooltip>
                        </ColumnList>
                      ),
                    },
                  ],
                }}
              />
            ),
          },
          {
            key: 2,
            title: "Updating",
            content: (
              <ClippingEdit
                cards={{ onLoading: newsClippingList.loading }}
                info={
                  <Row justify="space-between" align="middle">
                    <Col span={24}>
                      <Row align="middle" justify="start">
                        <Col flex="200px">
                          <Input
                            size="small"
                            placeholder="search"
                            defaultValue={searchEditing}
                            onChange={(e) => setsearchEditing(e.target.value)}
                          />
                        </Col>
                        <Col flex="auto">
                          <Button
                            size="small"
                            type="primary"
                            icons="SearchOutlined"
                            onClick={() => {
                              dispatch(
                                getNewsClipping({
                                  ...filter.result,
                                  page: 0,
                                  maxSize: 10,
                                  term: searchEditing,
                                })
                              );
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col flex={100}>
                      <label style={{ textTransform: "capitalize" }}>
                        article found: {selectedRowEditing.length} /{" "}
                        {newsClippingList.result.recordsTotal}
                      </label>
                    </Col>
                    <Col flex="auto">
                      <Space>
                        <Button
                          block="true"
                          type="primary"
                          disabled={
                            selectedRowEditing.length <= 0 ? disabled : null
                          }
                          onClick={() => {
                            setmodalCreate(true);
                            setNewIssue("");
                          }}
                          icons="InfoCircleOutlined"
                        >
                          {breakPoint != "tablet" ? <>Issue</> : ""}
                        </Button>

                        <Modal
                          title={"Create Issue"}
                          visible={modalCreate}
                          footer={[
                            <Button
                              key="submit"
                              type="primary"
                              onClick={() => {
                                createTopIssue({
                                  article_id: selectedRowEditing.map(
                                    (item) => item.article_id
                                  ),
                                  date: selectedRowEditing.map(
                                    (item) => item.datee
                                  ),
                                  title: selectedRowEditing.map(
                                    (item) => item.title
                                  ),
                                  media_id: selectedRowEditing.map(
                                    (item) => item.media_id
                                  ),
                                  category_id: selectedRowEditing.map(
                                    (item) => item.category_id
                                  ),
                                  topic: newIssue,
                                })
                                  .then((data) => data.json())
                                  .then((data) => {
                                    notification.success({
                                      message: "Success add issue",
                                    });

                                    return updateIssue({
                                      article_id: selectedRowEditing
                                        .map((item) => {
                                          if (item.issue) {
                                            return item.article_id;
                                          }
                                        })
                                        .filter((item) => item),
                                      new_topic: newIssue,
                                    });
                                  })
                                  .then((data) => data.json())
                                  .then((data) => {
                                    setmodalCreate(false);
                                    setSelectedEditing([]);

                                    notification.success({
                                      message: "Success edit issue",
                                    });

                                    dispatch(
                                      getNewsClipping({
                                        ...filter.result,
                                        maxSize: pageSizeEditing,
                                        page: pageEditing,
                                        term: searchEditing,
                                      })
                                    );
                                  })
                                  .catch((err) => console.log(err));
                              }}
                            >
                              Submit
                            </Button>,
                            <Button
                              key="back"
                              type="dashed"
                              danger="true"
                              onClick={() => {
                                setmodalCreate(false);
                              }}
                            >
                              Cancel
                            </Button>,
                          ]}
                        >
                          <Row>
                            <Col span={24}>
                              <label htmlFor="Input">Issue</label>
                              <AutoComplete
                                options={issueAuto.result.data?.map((item) => ({
                                  value: item,
                                }))}
                                onSelect={(e) => setNewIssue(e)}
                                onChange={(e) => setNewIssue(e)}
                                style={{ width: "100%" }}
                                placeholder="Issue Name"
                                id="influencer_name"
                                filterOption={(inputValue, option) =>
                                  option?.value
                                    .toUpperCase()
                                    .indexOf(inputValue.toUpperCase()) !== -1
                                }
                              />
                            </Col>
                          </Row>
                        </Modal>

                        <Dropdown
                          overlay={updateMenu}
                          direction="horizontal"
                          trigger="click"
                          placement="bottomCenter"
                          disabled={
                            selectedRowEditing.length <= 0 ? disabled : null
                          }
                        >
                          <Button
                            block="true"
                            icons="CheckCircleOutlined"
                            onClick={(e) => e.preventDefault()}
                          >
                            Update Tone
                          </Button>
                        </Dropdown>
                        <Popconfirm
                          title="Are you sure to delete this?"
                          onConfirm={() => handleDelete("edit")}
                          onCancel={() => {
                            setSelectedEditing([]);
                          }}
                        >
                          <Button
                            disabled={
                              selectedRowEditing.length <= 0 ? disabled : null
                            }
                            icons="DeleteOutlined"
                            type="dashed"
                            danger="true"
                          />
                        </Popconfirm>
                      </Space>
                    </Col>
                  </Row>
                }
                tables={{
                  data: newsClippingList.result.data,
                  pagination: {
                    showSizeChanger: true,
                    total: newsClippingList.result.recordsTotal,
                    showTotal: (total) => `Total ${total} article`,
                    current: pageEditing + 1,
                    pageSize: pageSizeEditing,
                    onChange: (editingPage, editingPageSize) => {
                      dispatch(
                        getNewsClipping(
                          {
                            ...filter.result,
                            page: editingPage - 1,
                            maxSize: editingPageSize,
                            term: searchEditing ? searchEditing : undefined,
                          },
                          setPageEditing(editingPage - 1),
                          setPageSizeEditing(editingPageSize)
                        )
                      );
                    },
                  },
                  rowSelection: {
                    type: clipEditSelection,
                    onChange: (selectedRowKeys, selectedRows) => {
                      setSelectedEditing(selectedRows);
                    },
                    getCheckboxProps: (record) => ({
                      rowKey: record.article_id,
                    }),
                    selectedRowKeys: selectedRowEditing.map(
                      (item) => item.article_id
                    ),
                  },
                  rowKey: (record) => record.article_id,
                  expandable: {
                    expandedRowRender: (record) => (
                      <div style={{ padding: "0 4px" }}>
                        <p style={{ fontWeight: 500, marginBottom: 3 }}>
                          {record.title}
                        </p>

                        <p style={{ fontWeight: 500, marginBottom: 3 }}>
                          Tone:
                          <span style={{ fontWeight: "normal", marginLeft: 3 }}>
                            <Tag
                              icons="InfoCircleOutlined"
                              color={
                                record.tone == 1
                                  ? "success"
                                  : "processing" && record.tone == -1
                                  ? "error"
                                  : "processing"
                              }
                            >
                              {record.tone == 1
                                ? "Positive"
                                : record.tone == -1
                                ? "Negative"
                                : "Neutral"}
                            </Tag>
                          </span>
                        </p>
                        <p style={{ fontWeight: 500, marginBottom: 3 }}>
                          Issue:
                          <span style={{ fontWeight: "normal", marginLeft: 3 }}>
                            <Tag
                              icons="InfoCircleOutlined"
                              color={record.issue != null ? "processing" : ""}
                            >
                              <span style={{ textTransform: "capitalize" }}>
                                {record.issue != null
                                  ? record.issue
                                  : "undifined"}
                              </span>
                            </Tag>
                          </span>
                        </p>
                        <p style={{ ...textEllipis, textAlign: "justify" }}>
                          <p style={{ fontWeight: 500, marginBottom: 3 }}>
                            Content:
                          </p>
                          {record.content}
                        </p>
                        {sponsorCol && (
                          <div>
                            <p style={{ fontWeight: 500, marginBottom: 3 }}>
                              Sponsorship:
                            </p>
                            {record.sponsor.map((item) => (
                              <Tag key={item.id} icons="InfoCircleOutlined">
                                {item.name}
                              </Tag>
                            ))}
                          </div>
                        )}
                      </div>
                    ),
                    rowExpandable: (record) =>
                      record.media_name !== "Not Expandable",
                  },
                  column: [
                    {
                      title: "Clipping List",
                      render: (record) => (
                        <Fragment>
                          <ColumnList
                            title="Date"
                            ellipsis
                            content={record.datee}
                          />
                          <ColumnList
                            title="Media"
                            ellipsis
                            content={record.media_name}
                          />
                          <ColumnList
                            title="Issue"
                            ellipsis
                            content={record.issue}
                          />
                          <ColumnList
                            title="Tone"
                            ellipsis
                            content={
                              <Tag
                                icons="InfoCircleOutlined"
                                color={
                                  record.tone == 1
                                    ? "success"
                                    : "processing" && record.tone == -1
                                    ? "error"
                                    : "processing"
                                }
                              >
                                {record.tone == 1
                                  ? "Positive"
                                  : record.tone == -1
                                  ? "Negative"
                                  : "Neutral"}
                              </Tag>
                            }
                          />
                          <ColumnList title="action" type="action">
                            <Button
                              size="small"
                              icons="EditOutlined"
                              onClick={() => {
                                setclipEditingPop(true);
                              }}
                            />
                          </ColumnList>
                        </Fragment>
                      ),
                      responsive: ["xs"],
                    },
                    {
                      title: "Date",
                      dataIndex: "datee",
                      width: 150,
                      responsive: ["md"],
                      sorter: (a, b) => a.datee - b.datee,
                    },
                    {
                      title: "Media",
                      dataIndex: "media_name",
                      width: "25%",
                      sorter: (a, b) =>
                        a.media_name.length - b.media_name.length,
                      responsive: ["md"],
                      filters: [
                        {
                          text: "Negative",
                          value: -1,
                        },
                        {
                          text: "Neutral",
                          value: 0,
                        },
                        {
                          text: "Positive",
                          value: 1,
                        },
                      ],
                      onFilter: (value, record) => record.tone == value,
                      render: (text, record) => {
                        return (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              // justifyContent: 'space-between',
                              flexWrap: "wrap",
                            }}
                          >
                            <Tag
                              size="small"
                              color={
                                record.tone == 1
                                  ? "success"
                                  : "processing" && record.tone == -1
                                  ? "error"
                                  : "processing"
                              }
                            >
                              {record.tone == 1
                                ? "Positive"
                                : record.tone == -1
                                ? "Negative"
                                : "Neutral"}
                            </Tag>

                            <a
                              href={record.file_pdf}
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                  record.file_pdf.split(".")[1] == "pdf"
                                    ? (logoType ? "https://api.media-insight.id/media/pdf_images/" : "https://api.digivla.id/media/pdf_images/") +
                                        record.datee
                                          .split(" ")[0]
                                          .split("-")
                                          .join("/") +
                                        "/" +
                                        record.file_pdf
                                    : record.file_pdf
                                );
                              }}
                            >
                              {text}
                            </a>
                          </span>
                        );
                      },
                    },

                    {
                      title: "Headline",
                      dataIndex: "title",
                      width: "50%",
                      responsive: ["md"],
                      ellipsis: true,
                      render: (text, record) => {
                        return (
                          <>
                            {record.flags && (
                              <Tooltip title="user change this article tone">
                                <Icon
                                  style={{ marginRight: 3, color: "#1990ff" }}
                                  type="InfoCircleOutlined"
                                />
                              </Tooltip>
                            )}
                            {record.title}
                          </>
                        );
                      },
                    },
                    {
                      title: "Issue",
                      dataIndex: "issue",
                      key: "issue",
                      width: 100,
                      responsive: ["lg"],
                      render: (text, record) => {
                        return (
                          <Tag color={text != null ? "processing" : "primary"}>
                            <span style={{ textTransform: "capitalize" }}>
                              {text != null ? text : "issue"}
                            </span>
                          </Tag>
                        );
                      },
                    },
                    {
                      title: "Action",
                      key: "action",
                      width: 90,
                      align: "center",
                      responsive: ["md"],
                      render: (text, record) => (
                        <ColumnList type="action">
                          <Tooltip title="edit article" placement="left">
                            <Button
                              size="small"
                              icons="EditOutlined"
                              onClick={() =>
                                handleEditing(record.article_id, record)
                              }
                            />
                          </Tooltip>
                          {/* {selectedRowEditing.length >0 ? (
														<Button
															size='small'
															type='primary'
															icons='CommentOutlined'
															onClick={() => handleOpenIssue(record.article_id, record)}
														/>
													) : (
														<Tooltip title='edit article' placement='left'>
															<Button
																size='small'
																icons='EditOutlined'
																onClick={() => handleEditing(record.article_id, record)}
															/>
														</Tooltip>
													)} */}
                        </ColumnList>
                      ),
                    },
                  ],
                }}
              />
            ),
          },
        ].filter((e) => {
          let dataTemp = JSON.parse(localStorage.getItem("userToken"));

          if (dataTemp.usr_comp_level == 1) {
            return e.key == 2 ? false : true;
          } else {
            return true;
          }
        })}
      />

      <Modal
        visible={modalSendEmail}
        footer={[
          <Button
            key="cancel"
            type="dashed"
            danger="true"
            onClick={() => {
              setmodalSendEmail(false);
            }}
          >
            cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => handleSendEmail(clippingEmail)}
          >
            Send
          </Button>,
        ]}
      >
        <Row>
          <Col span={24}>
            <p>
              If more than 1 email is to be sent then use a comma (,) to
              separate the email. Examples: abc@mail.com, def@mail.com
            </p>

            <label htmlFor="input">E-mail</label>
            <Input
              type="textarea"
              onChange={(e) => setclippingEmail(e.target.value)}
              defaultValue={clippingEmail}
            />
          </Col>
        </Row>
      </Modal>

      {/* modal add issue */}
      <Modal
        visible={modalUpdateIssue}
        title={editingDrawerTemp.issue}
        footer={[
          <Button
            key="cancel"
            type="dashed"
            danger="true"
            onClick={() => {
              setmodalUpdateIssue(false);
            }}
          >
            cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => handleUpdateIssue(newTopic)}
          >
            Submit
          </Button>,
        ]}
      >
        <Input
          onChange={(e) => setNewTopic(e.target.value)}
          value={newTopic}
          defaultValue={editingDrawerTemp.issue}
        />
      </Modal>

      {/* action clipping list */}
      <Drawer
        title={clippingDrawer.title}
        placement="right"
        visible={clipListPop}
        onClose={() => {
          setclipListPop(false);
        }}
      >
        <Row>
          <Col xs={24} md={12} lg={12} xl={12}>
            <ColumnList bold title="date" content={clippingDrawer.datee} />
            <ColumnList
              bold
              title="media"
              content={
                <Button
                  type="link"
                  target="_BLANK"
                  href={clippingDrawer.preview_link}
                >
                  {clippingDrawer.media_name}
                </Button>
              }
            />
            <ColumnList
              bold
              title="sentiment"
              content={
                <Tag>
                  {clippingDrawer.tone == 1
                    ? "Positive"
                    : clippingDrawer.tone == -1
                    ? "Negative"
                    : "Neutral"}
                </Tag>
              }
            />
          </Col>
          <Col xs={24} md={12} lg={12} xl={12}>
            <ColumnList
              bold
              title="news value"
              content={prettyPrice(clippingDrawer.advalue_bw)}
            />
            <ColumnList
              bold
              title="ad value"
              content={prettyPrice(clippingDrawer.advalue_fc)}
            />
          </Col>
          {sponsorCol && (
            <Col span={24}>
              <ColumnList
                bold
                ellipsis
                title="Sponsorship:"
                content={clippingDrawer.sponsor?.map((item) => (
                  <Tag key={item.id}>{item.name}</Tag>
                ))}
              />
            </Col>
          )}
          {saveArticlePop ? (
            <Col span={24}>
              <SaveArticle options={saveArticleSeries} />
            </Col>
          ) : (
            <Fragment>
              <Col span={24}>
                {clippingDrawer.file_pdf?.split(".m")[1] == "p4" && (
                  <video
                    // src={
                    //   "https://input.digivla.id/media_tv/" +
                    //   clippingDrawer.file_pdf.split("-")[0] +
                    //   "/" +
                    //   clippingDrawer.file_pdf.split("-")[1] +
                    //   "/" +
                    //   clippingDrawer.file_pdf.split("-")[2] +
                    //   "/" +
                    //   clippingDrawer.file_pdf
                    // }
                    src={clippingDrawer.file_pdf}
                    controls
                  >
                    Your browser does not support HTML5 video.
                  </video>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: keywordSet(keyword, clippingDrawer.content),
                  }}
                ></div>
              </Col>
            </Fragment>
          )}
          <Col span={24}>
            {clippingDrawer.categories?.map((tags) => {
              return (
                <Tooltip key={tags} title={tags}>
                  <Tag style={{ margin: 3 }} color="processing">
                    {tags}
                  </Tag>
                </Tooltip>
              );
            })}
          </Col>
        </Row>
      </Drawer>

      {/* clipping editing */}
      {clipEditingPop ? (
        <EditDrawer
          setclipEditingPop={setclipEditingPop}
          setEditingDrawerTemp={setEditingDrawerTemp}
          clipEditingPop={clipEditingPop}
          editingDrawerTemp={editingDrawerTemp}
          handleSubmitEditingModal={handleSubmitEditingModal}
          summaryEdit={summaryEdit}
          setsummaryEdit={setsummaryEdit}
          setsaveArticlePop={setsaveArticlePop}
          saveArticlePop={saveArticlePop}
          buttonLoading={buttonLoading}
          setbuttonLoading={setbuttonLoading}
          keyword={keyword}
          sponsor={
            sponsorCol && (
              <Col span={24}>
                <ColumnList
                  bold
                  ellipsis
                  title="Sponsorship:"
                  content={editingDrawerTemp.sponsor.map((item) => (
                    <Tag key={item.id}>{item.name}</Tag>
                  ))}
                />
              </Col>
            )
          }
          sponsorCol={sponsorCol}
        />
      ) : null}
    </>
  );
};

const textEllipis = {
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default Clipping;
