import {
  Button,
  Col,
  ColumnList,
  Drawer,
  Input,
  Radio,
  Row,
  Tag,
  Tooltip,
  gutter,
} from "components";
import SaveArticle from "./saveArticle";
import { prettyPrice, stringPrice } from "constant/formatter";
import { Fragment, useState } from "react";
import { saveArticleSeries } from "constant/mock/data";
import {
  categoriesDistinct,
  deleteSubCat,
  setNewsClipping,
} from "store/actions/newsClippingActions";
import { notification } from "antd";

import {
  newsClippingDownloadDocxs,
  newsClippingDownloadPdf,
  sponsorPromise,
} from "store/actions/newsClippingActions";
import { useDispatch, useSelector } from "react-redux";
import { keywordSet } from "utils/keywordSet";

const EditDrawer = ({
  setclipEditingPop,
  setEditingDrawerTemp,
  clipEditingPop,
  handleSubmitEditingModal,
  summaryEdit,
  setsummaryEdit,
  saveArticlePop,
  setsaveArticlePop,
  buttonLoading,
  setbuttonLoading,
  editingDrawerTemp,
  keyword,
  search,
  sponsor,
  sponsorCol,
}) => {
  const dispatch = useDispatch();
  const newsClippingList = useSelector(
    (state) => state.newsClipping.newsClippingList
  );
  const [editTitle, setEditTitle] = useState(editingDrawerTemp.title);
  const [editTone, setEditTone] = useState(editingDrawerTemp.tone || 0);
  const [editSummary, setEditSummary] = useState(editingDrawerTemp.summary);
  const [editIssue, setEditIssue] = useState(editingDrawerTemp.issue);
  const [categoriesDistinctData, setCategoriesDistinctData] = useState([]);
  const [sponsorData, setSponsorData] = useState([]);
  const [allSponsorData, setAllSponsorData] = useState([]);

  const userLogo = JSON.parse(localStorage.getItem("userToken"));

  const handleDownloadArticle = () => {
    newsClippingDownloadDocxs({
      logo_name: userLogo.comp_icon,
      articles: [
        {
          article_id: editingDrawerTemp.article_id,
          title: editingDrawerTemp.title,
          datee: editingDrawerTemp.datee,
          content: editingDrawerTemp.content,
          page: editingDrawerTemp.page,
          file_pdf: editingDrawerTemp.file_pdf,
          journalist: editingDrawerTemp.journalist,
          rate_bw: editingDrawerTemp.rate_bw,
          rate_fc: editingDrawerTemp.rate_fc,
          tone: 0,
          media_name: editingDrawerTemp.media_name,
          media_type: editingDrawerTemp.media_type,
        },
      ],
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          window.open(data.data);
        }
      })
      .catch((err) => err);
  };

  const handleDownloadPdf = (body) => {
    newsClippingDownloadPdf({
      doc_type: body,
      logo_name: userLogo.comp_icon,
      articles: [
        {
          article_id: editingDrawerTemp.article_id,
          title: editingDrawerTemp.title,
          datee: editingDrawerTemp.datee,
          content: editingDrawerTemp.content,
          page: editingDrawerTemp.page,
          file_pdf: editingDrawerTemp.file_pdf,
          journalist: editingDrawerTemp.journalist,
          rate_bw: editingDrawerTemp.rate_bw,
          rate_fc: editingDrawerTemp.rate_fc,
          tone: 0,
          media_name: editingDrawerTemp.media_name,
          media_type: editingDrawerTemp.media_type,
        },
      ],
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          window.open(data.data.link);
        }
      })
      .catch((err) => err);
  };

  return (
    <Drawer
      title={editingDrawerTemp.title}
      placement="top"
      height={550}
      onClose={() => {
        setclipEditingPop(false);
        setEditingDrawerTemp({});
        setEditTitle("");
        setEditTone(null);
        setsaveArticlePop(false);
      }}
      visible={clipEditingPop}
      footer={
        <Button
          loading={buttonLoading}
          type="primary"
          style={{ float: "right" }}
          onClick={() => {
            handleSubmitEditingModal(
              editTitle,
              editTone,
              editSummary,
              editIssue,
              editingDrawerTemp.categories,
              editingDrawerTemp.sponsor
            );
          }}
        >
          Submit
        </Button>
      }
    >
      <Row>
        {!search && (
          <Col span={24}>
            <Input
              type="textarea"
              autoSize={{ minRows: 1, maxRows: 2 }}
              defaultValue={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            />
          </Col>
        )}

        <Col xs={24} md={12} lg={12} xl={12}>
          <ColumnList bold title="date" content={editingDrawerTemp.datee} />
          <ColumnList
            bold
            title="media"
            content={
              // <Button type='link' target='_BLANK' href='https://www.merdeka.com/'>
              editingDrawerTemp.media_name
              // </Button>
            }
          />
          {editingDrawerTemp.file_pdf?.split("/").length > 1 && (
            <ColumnList
              bold
              title="option"
              content={
                <a
                  style={{ width: "100%", margin: 0 }}
                  onClick={() => window.open(editingDrawerTemp.file_pdf)}
                >
                  Preview
                </a>
              }
            />
          )}
        </Col>
        {!search && (
          <Col xs={24} md={12} lg={12} xl={12}>
            <ColumnList
              bold
              title="news value"
              content={prettyPrice(editingDrawerTemp.advalue_bw)}
            />
            <ColumnList
              bold
              title="ad value"
              content={prettyPrice(editingDrawerTemp.advalue_fc)}
            />
          </Col>
        )}

        {search && (
          <Col xs={24} md={12} lg={12} xl={12}>
            <ColumnList
              bold
              title="news value"
              content={stringPrice(editingDrawerTemp.rate_bw)}
            />
            <ColumnList
              bold
              title="ad value"
              content={stringPrice(editingDrawerTemp.rate_fc)}
            />
            <ColumnList
              bold
              title="download"
              content={
                <Row>
                  <Col span={12}>
                    <Button
                      size="small"
                      type="primary"
                      danger={true}
                      block={true}
                      onClick={() => handleDownloadPdf(1)}
                    >
                      PDF
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      size="small"
                      type="primary"
                      block={true}
                      onClick={handleDownloadArticle}
                    >
                      DOC
                    </Button>
                  </Col>
                </Row>
              }
            />
          </Col>
        )}

        {!search && (
          <Col span={24}>
            <ColumnList
              bold
              ellipsis
              title="sentiment"
              content={
                <Radio
                  type="group"
                  value={editTone}
                  onChange={(e) => {
                    setEditTone(e.target.value);
                  }}
                  options={[
                    { value: 1, label: "Positive" },
                    { value: 0, label: "Neutral" },
                    { value: -1, label: "negative" },
                  ]}
                />
              }
            />
          </Col>
        )}

        {sponsor}

        {editingDrawerTemp.issue ? (
          <Col span={24}>
            <ColumnList
              title="edit issue"
              content={
                <Input
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setEditIssue(e.target.value);
                  }}
                  defaultValue={editIssue}
                />
              }
            />
          </Col>
        ) : null}

        <Col span={24}>
          <Row>
            {!search && (
              <Col xs={24} md={12} lg={12} xl={12}>
                <Button
                  block="true"
                  size="default"
                  type="dashed"
                  icons={summaryEdit ? "RollBackOutlined" : "EditOutlined"}
                  onClick={() => setsummaryEdit(!summaryEdit)}
                >
                  {summaryEdit ? "Back" : "Edit Content"}
                </Button>
              </Col>
            )}

            <Col xs={24} md={12} lg={12} xl={12}>
              <Button
                block="true"
                size="default"
                type="dashed"
                icons={saveArticlePop ? "RollBackOutlined" : "SaveOutlined"}
                onClick={() => {
                  if (!saveArticlePop) {
                    categoriesDistinct()
                      .then((data) => data.json())
                      .then((data) => {
                        setCategoriesDistinctData(data.results);
                      });

                    sponsorPromise()
                      .then((data) => data.json())
                      .then((data) => {
                        setAllSponsorData(data.data);
                      })
                      .catch((err) => err);
                  }
                  setsaveArticlePop(!saveArticlePop);
                }}
              >
                {saveArticlePop ? "Detail" : "Save"} Article
              </Button>
            </Col>
          </Row>
        </Col>
        {summaryEdit ? (
          <Fragment>
            <Col span={24}>
              <Input
                id="editor"
                type="textarea"
                style={{ borderStyle: "dashed" }}
                autoSize={{ minRows: 8, maxRows: 8 }}
                defaultValue={editSummary}
                onChange={(e) => setEditSummary(e.target.value)}
              />
            </Col>
            <Col span={24}>
              <Button
                loading={buttonLoading}
                type="primary"
                icons="SaveOutlined"
                onClick={() => {
                  setbuttonLoading(true);

                  setTimeout(() => {
                    setsummaryEdit(!summaryEdit);
                    setbuttonLoading(false);
                  }, 500);
                }}
              >
                Content
              </Button>
            </Col>
          </Fragment>
        ) : saveArticlePop ? (
          <Col span={24}>
            {search && (
              <Col span={24}>
                <ColumnList
                  bold
                  title="sentiment"
                  content={
                    <Radio
                      type="group"
                      value={editTone}
                      onChange={(e) => {
                        setEditTone(e.target.value);
                      }}
                      options={[
                        { value: 1, label: "Positive" },
                        { value: 0, label: "Neutral" },
                        { value: -1, label: "negative" },
                      ]}
                    />
                  }
                />
              </Col>
            )}
            <SaveArticle
              title="subcategories"
              options={categoriesDistinctData.map((e) => e.category_id)}
              defaultValue={editingDrawerTemp.categories}
              onChange={(e) => {
                setEditingDrawerTemp({
                  ...editingDrawerTemp,
                  categories: e,
                });
              }}
            />
            {/* {sponsor } */}
            {sponsorCol && (
              <SaveArticle.Sponsor
                title="Sponsorship"
                options={allSponsorData.map((e) => e.name)}
                defaultValue={editingDrawerTemp.sponsor.map((e) => e.name)}
                onChange={(e) => {
                  setEditingDrawerTemp({
                    ...editingDrawerTemp,
                    sponsor: allSponsorData.filter((f) =>
                      e.find((g) => g == f.name)
                    ),
                  });
                }}
              />
            )}
          </Col>
        ) : (
          <Fragment>
            {!search && (
              <Col span={24}>
                <Input
                  id="editor"
                  type="textarea"
                  style={{ borderStyle: "dashed" }}
                  autoSize={{ minRows: 8, maxRows: 8 }}
                  defaultValue={editSummary}
                  readOnly
                />
              </Col>
            )}

            <Col span={24}>
              {editingDrawerTemp.file_pdf?.split(".m")[1] == "p4" && (
                <video
                  // src={
                  //   "https://input.digivla.id/media_tv/" +
                  //   editingDrawerTemp.file_pdf.split("-")[0] +
                  //   "/" +
                  //   editingDrawerTemp.file_pdf.split("-")[1] +
                  //   "/" +
                  //   editingDrawerTemp.file_pdf.split("-")[2] +
                  //   "/" +
                  //   editingDrawerTemp.file_pdf
                  // }
                  src={editingDrawerTemp.file_pdf}
                  controls
                >
                  Your browser does not support HTML5 video.
                </video>
              )}
              <div
                dangerouslySetInnerHTML={{
                  __html: keywordSet(keyword, editingDrawerTemp.content),
                }}
              ></div>
            </Col>
          </Fragment>
        )}

        <Col span={24}>
          {editingDrawerTemp.categories?.map((tags) => {
            return (
              <Tooltip key={tags} title={tags}>
                <Tag
                  style={{ margin: 3 }}
                  color="processing"
                  closable
                  onClose={() => {
                    deleteSubCat({
                      article_id: editingDrawerTemp.article_id,
                      category_id: tags,
                    })
                      .then((data) => data.json())
                      .then((data) => {
                        notification.success({
                          message: "Success delete subcat",
                        });

                        dispatch(
                          setNewsClipping({
                            ...newsClippingList,
                            data: newsClippingList.result.data.map((e) => {
                              if (
                                e.article_id == editingDrawerTemp.article_id
                              ) {
                                return {
                                  ...e,
                                  categories: data.data,
                                };
                              } else {
                                return e;
                              }
                            }),
                          })
                        );
                      })
                      .catch((err) => {
                        notification.error({
                          message: "Error delete sub category!",
                        });
                      });
                    setEditingDrawerTemp({
                      ...editingDrawerTemp,
                      categories: editingDrawerTemp.categories
                        .map((e) => (e == tags ? null : e))
                        .filter((e) => e),
                    });
                  }}
                >
                  {tags}
                </Tag>
              </Tooltip>
            );
          })}
        </Col>
      </Row>
    </Drawer>
  );
};

export default EditDrawer;
