import { Tooltip } from "antd";
import {
  Drawer,
  Row,
  Col,
  ColumnList,
  Tag,
  Button,
  Input,
  gutter,
} from "components";
import SaveArticle from "modules/clipping/saveArticle";
import { Fragment, useEffect } from "react";

import { stringPrice } from "constant/formatter";
import { keywordSet } from "utils/keywordSet";

function DetailArticle({
  clippingDrawer,
  setClippingDrawer,
  clipListPop,
  setclipListPop,
  saveArticlePop,
  keyword,
}) {
  return (
    <Drawer
      title={clippingDrawer.title}
      placement="right"
      visible={clipListPop}
      onClose={() => {
        setclipListPop(false);
        setClippingDrawer({});
      }}
    >
      <Row>
        <Col xs={24} md={12} lg={12} xl={12}>
          <ColumnList bold title="date" content={clippingDrawer.datee} />
          <ColumnList
            bold
            title="media"
            content={
              <Button type="link" target="_BLANK">
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
            content={stringPrice(clippingDrawer.rate_bw)}
          />
          <ColumnList
            bold
            title="ad value"
            content={stringPrice(clippingDrawer.rate_fc)}
          />
        </Col>
        {saveArticlePop ? (
          <Col span={24}>
            <SaveArticle options={saveArticleSeries} />
          </Col>
        ) : (
          <Fragment>
            <Col span={24}>
              {
                clippingDrawer.file_pdf?.split(".m")[1] == "p4" && <video src={clippingDrawer.file_pdf} controls>Your browser does not support HTML5 video.</video>
              }
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
  );
}

export default DetailArticle;
