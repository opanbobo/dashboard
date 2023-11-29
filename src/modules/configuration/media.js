import { useState, useEffect, Fragment } from "react";

import {
  Table,
  ColumnList,
  Button,
  Modal,
  Input,
  Form,
  Tree,
  Popconfirm,
  Row,
  Col,
  notification,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import {
  getConfigMediaList,
  createConfigMedia,
  deleteConfigMedia,
  getConfigMediaChosen,
  updateConfigMediaName,
  updateConfigMedia,
} from "store/actions/mediaAction";
import { getFilterMedia } from "store/actions/filterActions";

const ModalEdit = ({
  infoDetail,
  modalEdit,
  configMediaChosen,
  setmodalEdit,
  setSelectedMed,
  updateMedia,
  selectedMed,
  configSubmedList,
}) => {
  const [newName, setNewName] = useState(infoDetail.user_media_type_name_def);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setNewName(infoDetail.user_media_type_name_def);
  }, [infoDetail.user_media_type_name_def]);

  useEffect(() => setLoad(false), [modalEdit]);

  return (
    <Modal
      title={`Detail ${infoDetail.user_media_type_name_def} `}
      visible={modalEdit && !configMediaChosen.loading}
      closable
      onCancel={() => {
        setmodalEdit(false);
        setSelectedMed([]);
        setNewName("");
      }}
      footer={[
        <Button
          key="submit"
          loading={load}
          type="primary"
          onClick={() => {
            setLoad(true);
            updateMedia(newName, selectedMed);
          }}
        >
          Submit
        </Button>,
      ]}
    >
      <Row>
        <Col span={24}>
          <Form>
            <Form.Item>
              <label htmlFor="Input">New Media Name</label>
              <Input
                defaultValue={newName}
                onChange={(e) => setNewName(e.target.value)}
                suffixIcon="PlusCircleOutlined"
              />
            </Form.Item>
          </Form>
        </Col>
        <Col span={24}>
          <Input
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <Tree
            // onSelect={(selected) => console.log(selected)}
            onCheck={(selected, e) => {
              // const index = selectedMed.indexOf(e.node.key);
              let parent =
                configMediaChosen.result.data.find((g) =>
                  g.media_list.find((h) => `Child ${h.media_id}` == e.node.key)
                ) || {};

              if (search) {
                let data = e.checked
                  ? [...selectedMed, e.node.key]
                  : selectedMed.filter(
                      (f) =>
                        f !== e.node.key && f !== parent.media_type && f !== "0"
                    );

                if (e.node.key.split(" ")[0] == "Child") {
                  setSelectedMed(data);
                } else {
                  let datan = e.checked
                    ? [
                        ...selectedMed,
                        ...e.checkedNodes
                          .map((item) => item.key)
                          .filter((f) => f !== e.node.key && f !== "0"),
                      ]
                    : selected;
                  setSelectedMed(datan);
                }
              } else {
                setSelectedMed(selected);
              }
            }}
            // selectedKey={selectedCat}
            checkedKeys={selectedMed}
            data={[
              {
                title: "Select All",
                key: "0",
                children: configSubmedList.result.data?.map((item) => {
                  return {
                    title: item.media_type,
                    key: item.media_type,
                    children: item.media_list
                      ?.filter((e) => e.media_name.toLowerCase().includes(search.toLocaleLowerCase()))
                      .map((itemch) => {
                        return {
                          title: itemch.media_name,
                          key: `Child ${itemch.media_id}`,
                        };
                      }),
                  };
                }),
              },
            ]}
            height={200}
          />
        </Col>
      </Row>
    </Modal>
  );
};

const MediaList = () => {
  const [modalCreate, setmodalCreate] = useState(false);
  const [modalDetail, setmodalDetail] = useState(false);

  const [infoDetail, setinfoDetail] = useState([]);
  const [selectedMed, setSelectedMed] = useState([]);
  const [selectedMedInit, setSelectedMedInit] = useState([]);
  const [dataChosen, setDataChosen] = useState([]);

  const [media, setMedia] = useState({
    user_media_type_name_def: "",
  });

  const dispatch = useDispatch();
  const mediaConfig = useSelector((state) => state.mediaConfig);

  const { configMediaList, configMediaChosen } = mediaConfig;

  useEffect(() => {
    dispatch(getConfigMediaList());
  }, []);

  useEffect(() => {
    let temp = [];
    let temp2 = [];

    configMediaChosen.result.data?.forEach((item) =>
      item.media_list.forEach((e) => {
        if (e.chosen) {
          temp.push(`Child ${e.media_id}`);
        }
        temp2.push({
          media_id: `Child ${e.media_id}`,
        });
      })
    );

    setSelectedMed(temp);
    setSelectedMedInit(temp);
    setDataChosen(temp2);
  }, [configMediaChosen.result]);

  const handleModalCreate = () => {
    setmodalCreate(true);
  };

  const handleModalDetail = (id, value) => {
    setinfoDetail(value);
    setmodalDetail(true);

    dispatch(getConfigMediaChosen({ user_media_type_id: id }));
  };

  const handleClose = () => {
    setmodalCreate(false);
    setmodalDetail(false);
  };

  const handleInput = (e) => {
    const newmedia = { ...media };
    newmedia[e.target.id] = e.target.value;
    setMedia(newmedia);
  };

  const submitMedia = (e) => {
    createConfigMedia({
      user_media_type_name_def: media.user_media_type_name_def,
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          notification.success({ message: "Success create data" });

          dispatch(getConfigMediaList());
          dispatch(getFilterMedia());
        } else {
          notification.error({ message: "Error when create data!" });
        }

        setmodalCreate(false);
        setMedia({
          user_media_type_name_def: "",
        });
      })
      .catch((err) => {
        notification.error({ message: "Error when create data!" });
      });
  };

  const updateMedia = async (newName, newSubMed) => {
    try {
      let dataRes;

      if (newName !== infoDetail.user_media_type_name_def) {
        if (newName) {
          dataRes = await updateConfigMediaName({
            user_media_type_id: infoDetail.user_media_type_id,
            user_media_type_name_def: newName,
          });

          dataRes = await dataRes.json();

          if (dataRes.code == 200) {
            notification.success({ message: "Media name update success" });

            dispatch(getConfigCategoryList());
            dispatch(getFilterMedia());
          } else {
            notification.error({
              message: "Error when trying to update media name!",
            });
          }
        } else {
          notification.error({
            message: "Check your new media name before submit!",
          });
        }
      }

      if (newSubMed !== selectedMedInit) {
        dataRes = await updateConfigMedia({
          user_media_type_id: infoDetail.user_media_type_id,
          media_list: dataChosen?.map((item) => ({
            media_id: item.media_id.split(" ")[1],
            chosen:
              newSubMed.findIndex((e) => e == item.media_id) > -1
                ? true
                : false,
          })),
        });

        dataRes = await dataRes.json();

        if (dataRes.code == 200) {
          notification.success({ message: "Sub category update success" });
        } else {
          notification.error({
            message: "Error when trying to update sub media!",
          });
        }
      }

      setmodalDetail(false);
      setSelectedMed([]);
      setSelectedMedInit([]);
      setDataChosen([]);
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Error when trying to update!",
      });

      setmodalDetail(false);
      setSelectedMed([]);
      setSelectedMedInit([]);
      setDataChosen([]);
    }
  };

  const DeleteData = (id) => {
    deleteConfigMedia({ user_media_type_id: id })
      .then((data) => data.json())
      .then((data) => {
        if (data.code == 200) {
          notification.success({ message: "Success delete data" });

          dispatch(getConfigMediaList());
          dispatch(getFilterMedia());
        } else {
          notification.error({ message: "Error when delete data!" });
        }
      })
      .catch((err) =>
        notification.error({ message: "Error when delete data!" })
      );
  };

  return (
    <>
      <Row style={{ height: "100%" }}>
        <Col span={8}>
          <Button
            icons="PlusCircleOutlined"
            type="dashed"
            onClick={handleModalCreate}
          >
            Media
          </Button>
        </Col>
        <Col span={24}>
          total media: {configMediaList.result.count}
          <Table
            data={configMediaList.result.results}
            rowKey={(record) => {
              return record.user_media_type_id;
            }}
            column={[
              {
                title: "Media List",
                render: (record) => (
                  <Fragment>
                    <ColumnList
                      title="Media"
                      content={record.user_media_type_name_def}
                    />
                    <ColumnList title="action" type="action">
                      <Button size="small" icons="EditTwotone" />
                      <Button
                        size="small"
                        icons="DeleteOutlined"
                        type="dashed"
                        danger="true"
                      />
                    </ColumnList>
                  </Fragment>
                ),
                responsive: ["xs"],
              },
              {
                title: "Media Name",
                dataIndex: "user_media_type_name_def",
                sorter: (a, b) =>
                  a.user_media_type_name_def.length -
                  b.user_media_type_name_def.length,
                responsive: ["md"],
              },
              {
                title: "Action",
                width: 100,
                align: "center",
                responsive: ["md"],
                render: (text, record) => (
                  <ColumnList type="action">
                    <Button
                      size="small"
                      icons="EditOutlined"
                      onClick={() =>
                        handleModalDetail(record.user_media_type_id, record)
                      }
                      loading={
                        infoDetail.user_media_type_id ==
                          record.user_media_type_id && configMediaChosen.loading
                      }
                    />
                    <Popconfirm
                      title="Are you sure to delete this task?"
                      onConfirm={() => DeleteData(record.user_media_type_id)}
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
        title="Create Media"
        visible={modalCreate}
        defaaultValue={media.user_media_type_name_def}
        onChange={(e) =>
          setMedia({
            user_media_type_name_def: e.target.value,
          })
        }
        footer={[
          <Button key="submit" type="primary" onClick={(e) => submitMedia(e)}>
            Submit
          </Button>,
          <Button key="back" type="dashed" danger="true" onClick={handleClose}>
            Cancel
          </Button>,
        ]}
      >
        <Form form>
          <Row>
            <Col span={24}>
              <Form.Item>
                <label htmlFor="Input">Media Name</label>
                <Input
                  onChange={(e) => handleInput(e)}
                  id="user_media_type_name_def"
                  value={media.user_media_type_name_def}
                  placeholder="Media Name"
                  suffixIcon="PlusCircleOutlined"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* ======= */}
      <ModalEdit
        infoDetail={infoDetail}
        modalEdit={modalDetail}
        configMediaChosen={configMediaChosen}
        setmodalEdit={setmodalDetail}
        setSelectedMed={setSelectedMed}
        loading={false}
        updateMedia={updateMedia}
        selectedMed={selectedMed}
        configSubmedList={configMediaChosen}
      />
      {/* ======= */}
    </>
  );
};

export default MediaList;
