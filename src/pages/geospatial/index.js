import GeoLayout from "components/layouts/geoLayout";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { Card, Row, Col, ColumnList, Button, notification, Select, DatePicker } from "components";
import { MapSeries } from "constant/mock/data";

import {
  getGeo,
  getGeoList,
  getGeoStatus,
  postBacktrack,
} from "store/actions/geospatialActions";
import GeoDrawer from "modules/geo/geoDrawer";
import GeoList from "modules/geo/geoList";
import { getKeywordArticle } from "store/actions/newsClippingActions";

const Geo = dynamic(() => import("modules/dcc/geo"), { ssr: false });

const Geospatial = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filter);
  const geospatial = useSelector((state) => state.geo);
  const { filter } = filters;
  const { geo, geoList } = geospatial;

  const [openList, setopenList] = useState(false);
  const [articleData, setarticleData] = useState({});

  const [openDetail, setopenDetail] = useState(false);
  const [articleDetail, setarticleDetail] = useState({});
  const [keyword, setKeyword] = useState([]);
  const [backtrackStatus, setBacktrackStatus] = useState(false);
  const [doneCheck, setDoneCheck] = useState(false);
  const [btDate, setBtDate] = useState("");
  const [defaultFilter, setdefaultFilter] = useState({
    type_location: "article",
  });

  const handleCancel = (body) => {
    setopenList(false);
    setarticleData({});
  };

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
              ...defaultFilter,
              ...filter.result,
            })
          );
        }

        setDoneCheck(true);
      })
      .catch((err) => console.log(err));
  }, [filter, defaultFilter]);

  const optionGeo = {
    series: [
      {
        data: MapSeries,
        states: {
          hover: {
            color: "#BADA55",
          },
        },
        dataLabels: {
          enabled: false,
          format: "{point.name}",
        },
      },
    ],
  };

  const handleList = (id, value) => {
    setopenList(true);
    dispatch(
      getGeoList({
        ...defaultFilter,
        page: 0,
        max_size: 10,
        geo_loc: id,
        ...filter.result,
      })
    );
    setarticleData({
      key: id,
      ...value,
      page: 0,
      max_size: 10,
    });
  };

  const handleDetail = (id, value) => {
    getKeywordArticle({
      article_id: value.article_id,
    })
      .then((data) => data.json())
      .then((data) => {
        setarticleDetail(value);
        setKeyword(data.data);
        setopenDetail(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card
      title={`Geospatial by ${defaultFilter.type_location}`}
      onLoading={!doneCheck}
      extra={
        backtrackStatus ? (
          <Select
            placeholder="type location"
            defaultValue={defaultFilter.type_location}
            optionFilterProp="children"
            onChange={(value) => {
              setdefaultFilter({
                ...defaultFilter,
                type_location: value,
              });
            }}
            options={[
              { value: "article", label: "Article" },
              { value: "media", label: "Media" },
            ]}
          />
        ) : null
      }
    >
      {!backtrackStatus ? (
        <Row align="middle">
          <Col>Please select date for backtrack:</Col>
          <Col>
            <DatePicker onChange={(e) => setBtDate(e.format("YYYY-MM-DD"))} />
            <Button
              onClick={() => {
                postBacktrack({
                  backtrack_date: btDate,
                })
                  .then((data) => data.json())
                  .then((data) => {
                    if (data.message == "client_id is successfully registered") {
                      notification.success({ message: "Success backtrack" });

                      dispatch(
                        getGeo({
                          ...defaultFilter,
                          ...filter.result,
                        })
                      );

                      setBacktrackStatus(true);
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
        <Row align="middle" justify="center" style={{ minHeight: 500 }}>
          <Col xs={24} sm={24} md={24} lg={24} xl={16}>
            <Row align="bottom" justify="center" style={{ minHeight: 500 }}>
              <Col span={24}>
                <Geo
                  options={geo.result.data ? geo.result.data : []}
                  clickEvent={(e, value) => {
                    handleList(e);
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8}>
            <Card
              title="Top City"
              onLoading={geo.loading}
              extra={
                geo.result.top_location
                  ? `Total Article: ${geo.result.top_location.total_top_location_article}`
                  : null
              }
            >
              {geo.result.top_location
                ? geo.result.top_location.location.map((item, idx) => {
                    return (
                      <ColumnList
                        style={citylist(idx)}
                        key={idx}
                        title={
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handleList(item.key, item)}
                          >
                            {item.key}
                          </span>
                        }
                        content={item.value}
                      />
                    );
                  })
                : null}
            </Card>
          </Col>
          <GeoList
            articleData={articleData}
            openList={openList}
            geoList={geoList}
            handleCancel={handleCancel}
            handleDetail={handleDetail}
            setarticleData={setarticleData}
            defaultFilter={defaultFilter}
          />
          <GeoDrawer
            openDetail={openDetail}
            setopenDetail={setopenDetail}
            articleDetail={articleDetail}
            setarticleDetail={setarticleDetail}
            keyword={keyword}
          />
        </Row>
      )}
    </Card>
  );
};

const citylist = (idx) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: idx % 2 ? "rgba(54, 65, 76, 0.1)" : null,
    padding: 6,
    marginBottom: 6,
  };
};

Geospatial.layout = GeoLayout;

export default Geospatial;
