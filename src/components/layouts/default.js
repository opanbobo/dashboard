import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  MainHeader,
  Menu,
  Modal,
  Button,
  Form,
  ColumnList,
  Row,
  Col,
  Select,
  DatePicker,
  Card
} from "components";
import { routes, feature } from "constant/routes";
// import 'moment/locale/id';
// import locale from 'antd/es/date-picker/locale/id_ID';

import Logo from "assets/images/logo-icon.png";
import LogoArta from "assets/images/asp.png";
import styles from "styles/layout/default.module.scss";
import { filtertoneMock } from "constant/mock/data";
import {
  getFilterCategory,
  getFilterMedia,
  getFilterSubCategory,
  getFilterSubMedia,
  setFilter,
} from "store/actions/filterActions";
import { useRouter } from "next/router";
import moment from "moment";

const ModalFilter = ({ filterModal, setfilterModal }) => {
  const dispatch = useDispatch();
  const [customPeriod, setcustomPeriod] = useState(false);
  const filters = useSelector((state) => state.filter);
  const { filter, category, media, subCategory, subMedia } = filters;

  const [formData, setFormData] = useState(filter.result);

  const openCustom = () => setcustomPeriod(true);

  useEffect(() => {
    if (formData.date_type == "Custom") {
      setcustomPeriod(true);
    }
  }, []);

  return (
    <Card title="Dashboard Filter">
      <Form>
        <Row>
          <Col xs={12} md={4} lg={4} xl={4}>
            <Form.Item>
              <label htmlFor="periodic">Periodic</label>

              <Select
                showArrow={true}
                placeholder="select periodic"
                defaultValue={formData.date_type}
                disabled={customPeriod}
                onChange={(value) => {
                  if (value == "yesterday") {
                    let date = new Date();
                    let yesterday = date.setDate(date.getDate() - 1);

                    setFormData({
                      ...formData,
                      start_date: new Date(yesterday)
                        .toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" })
                        .split(" ")[0],
                      end_date: new Date()
                        .toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" })
                        .split(" ")[0],
                      date_type: value,
                    });
                  } else if (value == "week") {
                    let date = new Date();
                    let yesterday = date.setDate(date.getDate() - 7);

                    setFormData({
                      ...formData,
                      start_date: new Date(yesterday)
                        .toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" })
                        .split(" ")[0],
                      end_date: new Date()
                        .toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" })
                        .split(" ")[0],
                      date_type: value,
                    });
                  } else if (value == "month") {
                    let date = new Date();
                    let yesterday = date.setDate(date.getDate() - 30);

                    setFormData({
                      ...formData,
                      start_date: new Date(yesterday)
                        .toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" })
                        .split(" ")[0],
                      end_date: new Date()
                        .toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" })
                        .split(" ")[0],
                      date_type: value,
                    });
                  } else if (value == "year") {
                    let date = new Date();
                    let yesterday = date.setDate(date.getDate() - 365);

                    setFormData({
                      ...formData,
                      start_date: new Date(yesterday)
                        .toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" })
                        .split(" ")[0],
                      end_date: new Date()
                        .toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" })
                        .split(" ")[0],
                      date_type: value,
                    });
                  }
                }}
              >
                <Select.Option key="yesterday" value="yesterday">
                  Yesterday
                </Select.Option>
                <Select.Option key="week" value="week">
                  Last Week
                </Select.Option>
                <Select.Option key="month" value="month">
                  Last Month
                </Select.Option>
                <Select.Option key="year" value="year">
                  Last Year
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} md={4} lg={4} xl={4}>
            <Form.Item>
              <label htmlFor="categories">Category</label>
              <Select
                id="categories"
                placeholder="select category"
                optionFilterProp="children"
                onChange={(value) => {
                  dispatch(getFilterSubCategory(value));

                  setFormData({
                    ...formData,
                    category_set: value,
                    category_id: "all",
                  });
                }}
                defaultValue={formData.category_set}
                optionLabelProp="label"
                options={
                  category.result.results?.map((item) => {
                    return {
                      key: item.category_set,
                      value: item.category_set,
                      label: item.descriptionz,
                    };
                  }) || []
                }
              />
            </Form.Item>
          </Col>
          <Col xs={12} md={4} lg={4} xl={4}>
            
            <Form.Item>
              <label htmlFor="subcategory">Sub Category</label>
              <Select
                id="subcategory"
                placeholder="select sub-category"
                optionFilterProp="children"
                defaultValue={formData.category_id}
                optionLabelProp="label"
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    category_id: value,
                  });
                }}
                options={
                  subCategory.result.results?.map((item) => {
                    return {
                      value: item.category_id,
                      label: item.label ? item.label : item.category_id,
                    };
                  }) || []
                }
              />
            </Form.Item>
            {/* <Form.Item>
              <label htmlFor="submedia">Sub Media</label>
              <Select
                id="submedia"
                placeholder="select sub-media"
                optionFilterProp="children"
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    media_id: value,
                  });
                }}
                defaultValue={formData.media_id}
                optionLabelProp="label"
                options={
                  subMedia.result.results?.map((item) => {
                    return {
                      value: item.media_id,
                      label: item.media_name,
                    };
                  }) || []
                }
              />
            </Form.Item> */}

          </Col>
          <Col xs={12} md={4} lg={4} xl={4}>
            <Form.Item>
              <label htmlFor="media">Media</label>
              <Select
                id="media"
                placeholder="select media"
                optionFilterProp="children"
                defaultValue={formData.user_media_type_id}
                optionLabelProp="label"
                onChange={(value) => {
                  dispatch(getFilterSubMedia(value));

                  setFormData({
                    ...formData,
                    user_media_type_id: value,
                    media_id: 0,
                  });
                }}
                options={
                  media.result.results?.map((item) => {
                    return {
                      value: item.user_media_type_id,
                      label: item.user_media_type_name_def,
                    };
                  }) || []
                }
              />
            </Form.Item>

          </Col>
          <Col xs={12} md={4} lg={4} xl={4}>
            <Form.Item>
              <label htmlFor="tone">Tone</label>
              <Select
                id="tone"
                placeholder="select tone"
                optionFilterProp="children"
                defaultValue={
                  formData.tonee == undefined ? null : formData.tonee
                }
                optionLabelProp="label"
                onChange={(value) => {
                  if (value == null) {
                    setFormData({
                      ...formData,
                      tonee: undefined,
                    });
                  } else {
                    setFormData({
                      ...formData,
                      tonee: value,
                    });
                  }
                }}
                options={filtertoneMock.map((item) => {
                  return { value: item.value, label: item.label };
                })}
              />
            </Form.Item>

          </Col>
          {customPeriod ? (
            <Col span={24}>
              <label htmlFor="custom">Custom Periodic</label>
              <Row gutter={12}>
                <Col xs={12} md={4} lg={4} xl={4}>
                  <Form.Item>
                    <DatePicker
                      defaultValue={moment(formData.start_date)}
                      locale={"id_ID"}
                      placeholder="start date"
                      name="start_date"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          start_date: e.format("YYYY-MM-DD"),
                          date_type: "Custom",
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} md={4} lg={4} xl={4}>
                  <Form.Item>
                    <DatePicker
                      defaultValue={moment(formData.end_date)}
                      locale={"id_ID"}
                      placeholder="end date"
                      name="end_date"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          end_date: e.format("YYYY-MM-DD"),
                          date_type: "Custom",
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          ) : null}
          <Col xs={12} md={4} lg={4} xl={4}>
            <Form.Item>
              <label htmlFor="tone">&nbsp;</label>
              <div style={{width: '100%', display: 'flex', gap: '8px'}}>
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => {
                    dispatch(
                      setFilter({
                        ...filter.result,
                        ...formData,
                      })
                    );

                    // setfilterModal(false);
                  }}
                >
                  Set Filter
                </Button>
                <>
                  {customPeriod ? (
                    <Button key="custom" onClick={() => setcustomPeriod(false)}>
                      Close Custom
                    </Button>
                  ) : (
                    <Button key="custom" onClick={openCustom}>
                      Custom
                    </Button>
                  )}
                </>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

const DefaultLayout = ({
  header,
  commandClass,
  children,
  background,
  clientLogo,
  avatar,
  ...props
}) => {
  const dispatch = useDispatch();
  const [filterModal, setfilterModal] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const router = useRouter();
  const filters = useSelector((state) => state.filter);
  const { filter } = filters;

  const handleSearch = () => {
    router.push("/dashboard/search");
  };

  const logoType = useMemo(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

		return origin === "https://ojk.media-insight.id" ? LogoArta : Logo
  }, []);

  useEffect(() => {
    dispatch(getFilterCategory());
    dispatch(getFilterMedia());
    dispatch(getFilterSubCategory(filter.result.category_set));
    dispatch(getFilterSubMedia(filter.result.user_media_type_id));
  }, []);

  const userToken = localStorage.getItem("userToken");
  console.log("Nilai userToken:", userToken);
  const parsedToken = JSON.parse(userToken);
  console.log("Nilai logo:", parsedToken.comp_icon);

  return (
    <div className={`${styles["layout-wrap"]} ${toggleMenu ? styles["hidden-menu"] : ''}`}>
      <div className={styles["layout-side"]} onTouchStart={() => {setToggleMenu(true)}}>
        <Menu
          logo={logoType}
          feature={feature.filter((item) =>
            JSON.parse(localStorage.getItem("userToken")).menu_v3.find(
              (temp) => temp == item.label
            )
          )}
          data={routes.filter((item) =>
            JSON.parse(localStorage.getItem("userToken")).menu_v3.find(
              (temp) => temp == item.label
            )
          )}
        />
      </div>
      <div
        className={`${styles["layout-main"]} ${
          commandClass && styles["command-content"]
        }`}
      >
        {header && (
          <MainHeader
            className={styles["main-head"]}
            url="https://api.skema.co.id/media/"
            // logo={JSON.parse(localStorage.getItem("userToken")).comp_icon}
            logo={parsedToken.comp_icon}
            filters={{ onClick: () => setfilterModal(true) }}
            onClick={() => setToggleMenu(!toggleMenu) }
            search={{ onClick: handleSearch }}
            style={{ color: 'white', padding: '0 20px'}}
            {...props}
          />
        )}
        <div
          className={styles["main-content"]}
          style={{ background: background, padding: '20px' }}
        >
          <ModalFilter/>
          <p></p>
          {children}
        </div>
      </div>
      {filterModal ? (
        <ModalFilter
          filterModal={filterModal}
          setfilterModal={setfilterModal}
        />
      ) : null}
    </div>
  );
};

const modalstyle = {
  padding: 12,
};

export default DefaultLayout;
