import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  ColumnList,
  Button,
  Modal,
  Input,
  Popconfirm,
  Row,
  Col,
  DatePicker,
  gutter,
  notification,
} from "components";

import FileBase64 from "react-file-base64";
import { Avatar } from "antd";

import {
  createAlias,
  getAlias,
  deleteAlias,
  updateAlias,
  updateAliasInfluencer,
} from "store/actions/aliasActions";

const { RangePicker } = DatePicker;

const Inp = ({ setinfluncerdetail, influncerdetail }) => {
  return (
    <Input
      onChange={(e) =>
        setinfluncerdetail({
          ...influncerdetail,
          influencer_new: e.target.value,
        })
      }
      value={influncerdetail.influencer_new}
      placeholder="influencer name"
    />
  );
};

const ModalEdit = ({
  influncerdetail,
  ismodaldetail,
  setismodaldetail,
  loading,
  handleUpdate,
  getFiles,
  setinfluncerdetail,
  aliasData,
  setaliasData,
  addaliasmodal,
  deletealiasmodal,
}) => {
  return (
    <Modal
      title={influncerdetail.influencer}
      visible={ismodaldetail}
      onClose={() => setismodaldetail(false)}
      footer={[
        <Button
          key="submit"
          loading={loading}
          type="primary"
          onClick={() => {
            handleUpdate();
          }}
        >
          Submit
        </Button>,
        <Button
          key="back"
          loading={loading}
          type="dashed"
          danger="true"
          onClick={() => {
            setismodaldetail(false);
            setinfluncerdetail({});
          }}
        >
          Cancel
        </Button>,
      ]}
    >
      <Row align="bottom" justify="center">
        <Col span={24}>
          <Row gutter={gutter} align="middle" justify="space-between">
            <Col flex="80px">
              <Avatar
                size={80}
                src={
                  influncerdetail.image
                    ? `https://demo.digivla.id${influncerdetail.image}?w=2048&q=75`
                    : null
                }
              />
            </Col>
            <Col span={12}>
              <label htmlFor="images">Upload Picture</label>
              <div>
                <FileBase64
                  id="images"
                  multiple={true}
                  onDone={(e) => getFiles(e)}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <label htmlFor="Input">Influencer Name</label>
          <Inp
            setinfluncerdetail={setinfluncerdetail}
            influncerdetail={influncerdetail}
          />
        </Col>

        <Col span={20}>
          <label htmlFor="Input">{influncerdetail.influencer} alias</label>
          <Input
            onChange={(e) => {
              setaliasData(e.target.value);
            }}
            id="aliases"
            value={aliasData}
            placeholder="aliases"
            suffixIcon="PlusCircleOutlined"
          />
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            block="true"
            icons="PlusCircleOutlined"
            onClick={(e) => addaliasmodal(e)}
          />
        </Col>
        <Col span={24}>
          {influncerdetail.aliases
            ? influncerdetail.aliases.map((item) => {
                return (
                  <ColumnList
                    key={item}
                    title={item}
                    content={
                      <Button
                        type="dashed"
                        danger="true"
                        icons="DeleteOutlined"
                        onClick={() => deletealiasmodal(item)}
                      />
                    }
                  />
                );
              })
            : null}
        </Col>
      </Row>
    </Modal>
  );
};

const InfluencerList = () => {
  const dispatch = useDispatch();
  const influencerConfig = useSelector((state) => state.influencerConfig);
  const aliases = useSelector((state) => state.aliases);

  const {
    configInfluencerList,
    configInfluencerCreate,
    configInfluencerDelete,
  } = influencerConfig;

  const { aliasCreate, aliasList, aliasDelete } = aliases;

  const [ismodaldetail, setismodaldetail] = useState(false);
  const [modalCreate, setmodalCreate] = useState(false);
  const [alias, setalias] = useState(false);
  const [loading, setloading] = useState(false);

  const [influncerdetail, setinfluncerdetail] = useState({});
  const [influencer, setinfluencer] = useState({
    influencer: "",
    aliases: [],
    name: "",
    influencer_new: "",
  });

  const [aliasData, setaliasData] = useState("");
  const [pagData, setPagData] = useState({
    page: 0,
    limit: 10,
  });

  useEffect(() => {
    dispatch(getAlias({ page: 0, limit: 10 }));
  }, []);

  const openCreate = () => setmodalCreate(true);

  const openDetail = (id, value) => {
    setismodaldetail(true);
    setinfluncerdetail({
      ...value,
      influencer_new: value.influencer,
      images_new: value.image,
    });
  };

  const getFiles = (files) => {
    setinfluncerdetail({
      ...influncerdetail,
      images_new: files,
    });
  };

  const handleCreate = (e, type) => {
    const newinfluncer = { ...influencer };
    newinfluncer[type] = e.target.value;
    setinfluencer(newinfluncer);
  };

  const createInfluencer = (e) => {
    if (influencer.influencer) {
      createAlias({
        name: influencer.influencer,
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.code == 200) {
            notification.success({ message: "Success create influencer" });

            setinfluencer({
              influencer: "",
              aliases: [],
              name: "",
            });
            dispatch(getAlias({ page: 0, limit: 50 }));
            setmodalCreate(false);
          } else {
            notification.success({ message: "Success create influencer" });
          }
        })
        .catch((err) => {
          notification.error({ message: "Error when trying to create data!" });
        });
    } else {
      notification.error({ message: "Error when trying to create data!" });
    }
  };

  const submitAlias = (e) => {
    console.log(aliasData);
    // createAlias({
    //   name: influencer.influencer,
    //   aliases: [...influencer.aliases, aliasData],
    // })
    //   .then((data) => data.json())
    //   .then((data) => {
    //     if (data.code == 200) {
    //       setinfluencer({ ...influencer, aliases: data.data.data.aliases });
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    let body = {};

    if (influncerdetail.influencer !== influncerdetail.influencer_new) {
      body = {
        name: influncerdetail.influencer,
        new_name: influncerdetail.influencer_new,
      };

      updateAlias(body)
        .then((data) => data.json())
        .then((data) => {
          notification.success({ message: "Success updating data" });

          setismodaldetail(false);
          dispatch(getAlias({ page: 0, limit: 50 }));
          setinfluncerdetail({});
        })
        .catch((err) =>
          notification.error({ message: "Error when updating data!" })
        );
    }

    if (influncerdetail.image !== influncerdetail.images_new) {
      body = {
        name: influncerdetail.influencer_new || influncerdetail.influencer,
        image_name: [
          {
            filename: influncerdetail.images_new[0].name,
            base64: influncerdetail.images_new[0].base64
              .split(";")[1]
              .split(",")[1],
          },
        ],
      };

      updateAlias(body)
        .then((data) => data.json())
        .then((data) => {
          notification.success({ message: "Success updating data" });

          setismodaldetail(false);
          dispatch(getAlias({ page: 0, limit: 50 }));
          setinfluncerdetail({});
        })
        .catch((err) =>
          notification.error({ message: "Error when updating data!" })
        );
    }

    setismodaldetail(false);
    dispatch(getAlias({ page: 0, limit: 50 }));

    // body = {
    //   name: influncerdetail.influencer !== influncerdetail.influencer_new ? influncerdetail.influencer : influncerdetail.influencer_new,
    //   aliases: influncerdetail.aliases,
    // };

    // updateAliasInfluencer(body)
    // .then((data) => data.json())
    //   .then((data) => {
    //     notification.success({ message: "Success updating data" });

    //     setismodaldetail(false);
    //     dispatch(getAlias({ page: 0, limit: 50 }));
    //     setinfluncerdetail({});
    //   })
    //   .catch((err) =>
    //     notification.error({ message: "Error when updating data!" })
    //   );
  };

  const deleteInfluencer = (id) => {
    deleteAlias({ name: id })
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          notification.success({ message: "Success delete influencer" });

          dispatch(getAlias({ page: 0, limit: 50 }));
        } else {
          notification.error({ message: "Error when deleting influencer" });
        }
      })
      .catch((err) =>
        notification.error({ message: "Error when deleting influencer" })
      );
  };

  const deleteAliases = (id) => {
    deleteAlias({
      aliases: id,
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          notification.success({ message: "Success delete alias" });

          setinfluncerdetail({
            ...influncerdetail,
            aliases: influncerdetail.aliases.filter((fill) => fill != item),
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const addaliasmodal = (e) => {
    updateAliasInfluencer({
      name: influncerdetail.influencer,
      aliases: [aliasData, ...influncerdetail.aliases],
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          notification.success({ message: "Success create alias" });

          setinfluncerdetail({
            ...influncerdetail,
            aliases: data.data.aliases,
          });
        } else {
          notification.error({ message: "Error when creating alias!" });
        }
      })
      .catch((err) => {
        notification.error({ message: "Error when creating alias!" });
      });
  };

  const deletealiasmodal = (id) => {
    deleteAlias({
      aliases: id,
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          notification.success({ message: "Success delete alias" });

          setinfluncerdetail({
            ...influncerdetail,
            aliases: influncerdetail.aliases.filter((fill) => fill != id),
          });
        }
      })
      .catch((err) =>
        notification.error({ message: "Error when deleting alias!" })
      );
  };

  return (
    <>
      <Row style={{ height: "100%" }}>
        <Col span={8}>
          <Button icons="PlusCircleOutlined" type="dashed" onClick={openCreate}>
            Spokeperson
          </Button>
        </Col>
        <Col span={24}>
          total spokeperson: {aliasList.result.data?.length}
          <Table
            data={aliasList.result.data}
            pagination={{
              showSizeChanger: true,
              total: aliasList.result.recordsTotal,
              showTotal: (total) => `Total ${total} data`,
              defaultPageSize: pagData.limit,
              defaultCurrent: pagData.page + 1,
              onChange: (page, pageSize) => {
                dispatch(getAlias({ page: page - 1, limit: pageSize }));

                setPagData({
                  ...pagData,
                  page: page - 1,
                  limit: pageSize,
                });
              },
            }}
            rowKey={(record) => {
              return record.influencer;
            }}
            column={[
              {
                title: "Spokeperson Alias List",
                render: (record) => (
                  <Fragment>
                    <ColumnList
                      title="Influencer"
                      content={record.influencer}
                    />
                    <ColumnList title="action" type="action">
                      <Button size="small" icons="EditTwotone" />
                      <Popconfirm
                        title="Are you sure to delete this?"
                        onConfirm={() => deleteInfluencer(record.influencer)}
                        onCancel={() => {
                          console.log("cancel delete");
                        }}
                      >
                        <Button
                          size="small"
                          icons="DeleteOutlined"
                          type="dashed"
                          danger="true"
                        />
                      </Popconfirm>
                    </ColumnList>
                  </Fragment>
                ),
                responsive: ["xs"],
              },
              {
                title: "Spokeperson Name",
                dataIndex: "influencer",
                key: "influencer",
                sorter: (a, b) => a.influencer.length - b.influencer.length,
                responsive: ["md"],
              },
              {
                title: "Action",
                key: "action",
                width: 100,
                align: "center",
                responsive: ["md"],
                render: (text, record) => (
                  <ColumnList type="action">
                    <Button
                      size="small"
                      icons="EditOutlined"
                      onClick={() => openDetail(record.influencer, record)}
                    />
                    <Popconfirm
                      title="Are you sure to delete this?"
                      onConfirm={() => deleteInfluencer(record.influencer)}
                      onCancel={() => {
                        console.log("cancel delete");
                      }}
                    >
                      <Button
                        size="small"
                        icons="DeleteOutlined"
                        type="dashed"
                        danger="true"
                      />
                    </Popconfirm>
                  </ColumnList>
                ),
              },
            ]}
          />
        </Col>
      </Row>
      <Modal
        title={alias ? "Create Alias" : "Create Spokeperson"}
        visible={modalCreate}
        footer={[
          <>
            {alias ? (
              <Button
                key="addalias"
                loading={loading}
                type="primary"
                onClick={() => {
                  setalias(false);
                  setmodalCreate(false);
                  setTimeout(() => {
                    dispatch(getAlias({ page: 0, limit: 50 }));
                  }, 100);
                }}
              >
                Done
              </Button>
            ) : (
              <Button
                key="submit"
                loading={loading}
                type="primary"
                onClick={(e) => createInfluencer(e)}
              >
                Submit
              </Button>
            )}
          </>,
          <Button
            key="back"
            loading={loading}
            type="dashed"
            danger="true"
            onClick={() => {
              setalias(false);
              setmodalCreate(false);
            }}
          >
            Cancel
          </Button>,
        ]}
      >
        <Row>
          {alias ? (
            <>
              <Col span={24}>
                <Row align="bottom">
                  <Col span={24}>
                    <FileBase64
                      id="images"
                      multiple={true}
                      onDone={(e) => getFiles(e)}
                    />
                  </Col>
                  <Col span={20}>
                    <label htmlFor="Input">{influencer.influencer} alias</label>
                    <Input
                      onChange={(e) => {
                        setaliasData(e.target.value);
                      }}
                      id="aliases"
                      value={[aliasData]}
                      placeholder="aliases"
                      suffixIcon="PlusCircleOutlined"
                    />
                  </Col>
                  <Col span={4}>
                    <Button
                      type="primary"
                      block="true"
                      icons="PlusCircleOutlined"
                      onClick={(e) => submitAlias(e)}
                    />
                  </Col>
                  {influencer.aliases
                    ? influencer.aliases.map((item) => {
                        return (
                          <span key={item}>
                            {item}
                            <Button
                              icons="DeleteOutlined"
                              onClick={() => deleteAliases(item)}
                            />
                          </span>
                        );
                      })
                    : null}
                </Row>
              </Col>
            </>
          ) : (
            <Col span={24}>
              <label htmlFor="Input">Spokeperson Name</label>
              <Input
                onChange={(e) => handleCreate(e, "influencer")}
                id="influencer"
                value={influencer.influencer}
                placeholder="influencer name"
                suffixIcon="PlusCircleOutlined"
              />
            </Col>
          )}
        </Row>
      </Modal>
      {ismodaldetail && (
        <ModalEdit
          influncerdetail={influncerdetail}
          ismodaldetail={ismodaldetail}
          setismodaldetail={setismodaldetail}
          loading={loading}
          handleUpdate={handleUpdate}
          getFiles={getFiles}
          setinfluncerdetail={setinfluncerdetail}
          aliasData={aliasData}
          setaliasData={setaliasData}
          addaliasmodal={addaliasmodal}
          deletealiasmodal={deletealiasmodal}
        />
      )}
    </>
  );
};

export default InfluencerList;
