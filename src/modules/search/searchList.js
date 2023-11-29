import { useState, Fragment } from "react";
import { Divider, notification } from "antd";
import {
  Pagination,
  Empty,
  ColumnList,
  Drawer,
  Row,
  Col,
  Button,
  Input,
} from "components";
import { prettyPrice, stringPrice } from "constant/formatter";
import { getKeywordArticle, getNewsClipping, saveArticleAct, updateNewsClippingSummary, updateNewsClippingTitle, updateNewsClippingTone } from "store/actions/newsClippingActions";
import EditDrawer from "modules/clipping/EditDrawer";
import { updateIssue } from "store/actions/issueActions";
import { useDispatch } from "react-redux";

const SearchList = ({ data = [], pagination, dataPag, searchForm, handleSearch }) => {
	const dispatch = useDispatch();

  const [modalDetail, setmodalDetail] = useState(false);
  const [searchDetail, setsearchDetail] = useState({});
  const [keyword, setKeyword] = useState([]);

	const [saveArticlePop, setsaveArticlePop] = useState(false);
	const [summaryEdit, setsummaryEdit] = useState(false);
	const [buttonLoading, setbuttonLoading] = useState(false);

  const handleModal = (id, value) => {
    getKeywordArticle({
      article_id: value.article_id,
    })
      .then((data) => data.json())
      .then((data) => {
        setKeyword(data.data);
        setmodalDetail(true);
        setsearchDetail(value);
      })
      .catch((err) => console.log(err));
  };

	const handleSubmitEditingModal = async (newTitle, newTone, newContent, newIssue, newSubCategories) => {
		try {
			setbuttonLoading(true);

			let data = null;

			data = await saveArticleAct({
				article_id: searchDetail.article_id,
				category_ids: searchDetail.categories,
				datee: searchDetail.datee.split(' ')[0],
				media_id: searchDetail.media_id,
				tone: newTone,
				advalue_fc: searchDetail.rate_fc,
				circulation: searchDetail.circulation,
				advalue_bw: searchDetail.rate_bw,
			});

			setmodalDetail(false);
			setsearchDetail({});
			setsaveArticlePop(false);
			handleSearch(searchForm);
			setbuttonLoading(false);
			notification.success({
				message: 'Data has been Updated',
				duration: 3,
			});
		} catch (err) {
			console.log(err);
			notification.error({
				message: 'Please check your update request!!',
				duration: 3,
			});
		}
	};

  return (
    <>
      <div style={{ padding: "12px 0" }}>
        {data == 0 ? (
          <div
            style={{
              display: "flex",
              minHeight: 500,
              width: "100%",
              maxHeight: 600,
              overflowY: "auto",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Empty description="Please Search Article" />
          </div>
        ) : (
          data.map((item) => {
            return (
              <>
                <ColumnList
                  key={item.article_id}
                  ellipsis
                  title={
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        width: "90vw",
                        maxWidth: "90vw",
                        position: "relative",
                        flexDirection: "column",
                        "&:hover": {
                          background: "red",
                        },
                      }}
                    >
                      <h5
                        style={{ margin: 0, cursor: "pointer" }}
                        onClick={() => handleModal(item.article_id, item)}
                      >
                        {item.title}
                      </h5>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          minWidth: "100%",
                          margin: "6px 0",
                        }}
                      >
                        <a
                          style={{ textTransform: "initial" }}
                          href={item.file_pdf}
                          target="_BLANK"
                          rel="noreferrer"
                        >
                          {item.media_name}
                        </a>
                        <div>{item.datee}</div>
                      </div>
                    </div>
                  }
                  content={item.content}
                />
                <Divider />
              </>
            );
          })
        )}
        <>{data == 0 ? null : <Pagination size="small" {...pagination} />}</>
      </div>

      {/* <Drawer
        title={searchDetail.title}
        visible={modalDetail}
        onClose={() => {
          setsearchDetail({});
          setmodalDetail(false);
        }}
      >
        <Row>
          <Col xs={24} md={12} lg={12} xl={12}>
            <ColumnList bold title="date" content={searchDetail.datee} />
            <ColumnList
              bold
              title="media"
              content={
                // eslint-disable-next-line react/jsx-no-target-blank
                <a
                  style={{ cursor: "pointer" }}
                  target="_BLANK"
                  href={searchDetail.file_pdf}
                >
                  {searchDetail.media_name}
                </a>
              }
            />
            <ColumnList
              bold
              title="journalist"
              content={searchDetail.journalist}
            />
          </Col>
          <Col xs={24} md={12} lg={12} xl={12}>
            <ColumnList
              bold
              title="news value"
              content={stringPrice(searchDetail.rate_bw)}
            />
            <ColumnList
              bold
              title="ad value"
              content={stringPrice(searchDetail.rate_fc)}
            />
          </Col>
          <Col span={24}>
            {searchDetail.file_pdf?.split(".")[1] == "mp4" && (
              <video
                src={
                  "https://input.digivla.id/media_tv/" +
                  searchDetail.file_pdf.split("-")[0] +
                  "/" +
                  searchDetail.file_pdf.split("-")[1] +
                  "/" +
                  searchDetail.file_pdf.split("-")[2] +
                  "/" +
                  searchDetail.file_pdf
                }
                controls
              >
                Your browser does not support HTML5 video.
              </video>
            )}
            <Fragment>
              <div
                style={{ textAlign: "justify" }}
                dangerouslySetInnerHTML={{
                  __html: searchDetail.content,
                  // __html: searchDetail.content?.replace(
                  // 	new RegExp(
                  // 		searchDetail.headline
                  // 			?.join('')
                  // 			.split('\\')
                  // 			.join('')
                  // 			.split('"')
                  // 			.filter((e) => e && e !== ' ')
                  // 			.join('|'),
                  // 		'gi',
                  // 	),
                  // 	(match) => `<b class="highlight-text">${match}</b>`,
                  // ),
                }}
              ></div>
            </Fragment>

            <Fragment>
              <Col span={24}>
                <Input
                  id="editor"
                  type="textarea"
                  style={{ borderStyle: "dashed" }}
                  autoSize={{ minRows: 8, maxRows: 8 }}
                  defaultValue={searchDetail?.content}
                  readOnly
                />
              </Col>
              <Col span={24}>
                {searchDetail.file_pdf?.split(".")[1] == "mp4" && (
                  <video
                    src={
                      "https://input.digivla.id/media_tv/" +
                      searchDetail.file_pdf.split("-")[0] +
                      "/" +
                      searchDetail.file_pdf.split("-")[1] +
                      "/" +
                      searchDetail.file_pdf.split("-")[2] +
                      "/" +
                      searchDetail.file_pdf
                    }
                    controls
                  >
                    Your browser does not support HTML5 video.
                  </video>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: searchDetail.content?.replace(
                      new RegExp(
                        keyword
                          ?.join("")
                          .split("\\")
                          .join("")
                          .split('"')
                          .filter((e) => e && e !== " ")
                          .join("|"),
                        "gi"
                      ),
                      (match) => `<b class="highlight-text">${match}</b>`
                    ),
                  }}
                ></div>
              </Col>
            </Fragment>
          </Col>
        </Row>
      </Drawer> */}

      {modalDetail ? (
        <EditDrawer
          setclipEditingPop={setmodalDetail}
          setEditingDrawerTemp={setsearchDetail}
          clipEditingPop={modalDetail}
          editingDrawerTemp={searchDetail}
          handleSubmitEditingModal={handleSubmitEditingModal}
          summaryEdit={summaryEdit}
          setsummaryEdit={setsummaryEdit}
          setsaveArticlePop={setsaveArticlePop}
          saveArticlePop={saveArticlePop}
          buttonLoading={buttonLoading}
          setbuttonLoading={setbuttonLoading}
          keyword={keyword}
					search={true}
        />
      ) : null}
    </>
  );
};

export default SearchList;
