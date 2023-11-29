import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  ColumnList,
  gutter,
  Button,
  Modal,
  Input,
  Tree,
  Form,
  Popconfirm,
  Row,
  Col,
  notification,
} from "components";
import { treeData } from "constant/mock/data";

import {
  getConfigCategoryList,
  createConfigCategory,
  updateConfigCategory,
  deleteConfigCategory,
  getConfigCategoryChosen,
  updateConfigCategoryName,
} from "store/actions/categoryAction";
import { getConfigSubCatList } from "store/actions/subCategoryAction";
import { getFilterCategory } from "store/actions/filterActions";

const ModalEdit = ({
  infoDetail,
  modalEdit,
  configCategoryChosen,
  setmodalEdit,
  setSelectedcat,
  loading,
  updateCategory,
  selectedCat,
  configSubcatList,
}) => {
  const [newName, setNewName] = useState(infoDetail.descriptionz);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setNewName(infoDetail.descriptionz);
  }, [infoDetail.descriptionz]);

  useEffect(() => setLoad(false), [modalEdit]);

  return (
    <Modal
      title={`Detail ${infoDetail.descriptionz} `}
      visible={modalEdit && !configCategoryChosen.loading}
      closable
      onCancel={() => {
        setmodalEdit(false);
        setSelectedcat([]);
        setNewName("");
      }}
      footer={[
        <Button
          key="submit"
          loading={load}
          type="primary"
          onClick={() => {
            setLoad(true);
            updateCategory(newName, selectedCat);
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
              <label htmlFor="Input">Category Name </label>
              <Input
                defaultValue={newName}
                onChange={(e) => setNewName(e.target.value)}
                suffixIcon="PlusCircleOutlined"
              />
            </Form.Item>
          </Form>
        </Col>
        <Col span={24}>
          <Tree
            // onSelect={(selected) => console.log(selected)}
            onCheck={(selected) => setSelectedcat(selected)}
            // selectedKey={selectedCat}
            checkedKeys={selectedCat}
            data={[
              {
                title: "Select All",
                key: "0",
                children: configSubcatList.result.results.map((item) => {
                  return {
                    title: item.category_id,
                    key: item.category_id,
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

const CategoryList = () => {
  const dispatch = useDispatch();
  const categoryConfig = useSelector((state) => state.categoryConfig);
  const subcategoryConfig = useSelector((state) => state.subcategoryConfig);
  const { configCategoryList, configCategoryChosen } = categoryConfig;
  const { configSubcatList } = subcategoryConfig;

  const [modalEdit, setmodalEdit] = useState(false);
  const [infoDetail, setinfoDetail] = useState([]);

  const [modalCreate, setmodalCreate] = useState(false);
  const [category, setcategory] = useState({
    category_set: "",
    group_name: "",
  });

  const [loading, setloading] = useState(false);
  const [selectedCat, setSelectedcat] = useState([]);

  useEffect(() => {
    dispatch(getConfigCategoryList());
    dispatch(getConfigSubCatList());
  }, []);

  useEffect(() => {
    setSelectedcat(
      configCategoryChosen.result.data
        ?.filter((item) => {
          return item.chosen;
        })
        .map((item) => item.category_id) || []
    );
  }, [configCategoryChosen.result]);

  const OpenCreate = () => setmodalCreate(true);

  const OpenEdit = (id, value) => {
    dispatch(getConfigCategoryChosen({ category_set: id }));
    setmodalEdit(true);
    setinfoDetail(value);
  };

  const deleteCategory = (id) => {
    deleteConfigCategory({ category_set: id })
      .then((data) => data.json())
      .then(() => {
        dispatch(getConfigCategoryList());
        dispatch(getFilterCategory());
        notification.success({ message: "Success delete data" });
      })
      .catch((err) =>
        notification.error({ message: "Error when deleting data!" })
      );
  };

  const handleInput = (e) => {
    e.preventDefault();
    const newCategory = { ...category };
    newCategory[e.target.id] = e.target.value;
    setcategory(newCategory);
  };

  const submitCategory = (e) => {
    createConfigCategory({
      group_name: category.group_name,
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.code !== 200) {
          notification.error({ message: "Error when creating data!" });
        } else {
          notification.success({ message: "Success create data" });
          setmodalCreate(false);
          dispatch(getConfigCategoryList());
          dispatch(getFilterCategory());

          setcategory({
            group_name: "",
          });
        }
      })
      .catch((err) =>
        notification.error({ message: "Error when creating data!" })
      );
  };

  const updateCategory = async (newName, newSubCat) => {
    try {
      let dataRes;

      if (newName !== infoDetail.descriptionz) {
        if (newName) {
          dataRes = await updateConfigCategoryName({
            category_set: infoDetail.category_set,
            group_name: newName,
          });

          dataRes = await dataRes.json();

          if (dataRes.code == 200) {
            notification.success({ message: "Category name update success" });

            dispatch(getConfigCategoryList());
            dispatch(getFilterCategory());
          } else {
            notification.error({
              message: "Error when trying to update category name!",
            });
          }
        } else {
          notification.error({
            message: "Check your new category name before submit!",
          });
        }
      }

      if (
        newSubCat !==
        configCategoryChosen.result.data.filter((item) => item.chosen)
      ) {
        dataRes = await updateConfigCategory({
          category_set: infoDetail.category_set,
          category_list: configSubcatList.result.results?.map((item) => ({
            category_id: item.category_id,
            chosen:
              newSubCat.findIndex((e) => e == item.category_id) > -1
                ? true
                : false,
          })),
        });

        dataRes = await dataRes.json();

        if (dataRes.code == 200) {
          notification.success({ message: "Sub category update success" });
        } else {
          notification.error({
            message: "Error when trying to update sub category!",
          });
        }
      }

      setmodalEdit(false);
      setSelectedcat([]);
    } catch (err) {
      notification.error({
        message: "Error when trying to update!",
      });

      setmodalEdit(false);
      setSelectedcat([]);
    }
  };

  return (
    <>
      <Row style={{ height: "100%" }}>
        <Col span={8}>
          <Button icons="PlusCircleOutlined" type="dashed" onClick={OpenCreate}>
            Category
          </Button>
        </Col>
        <Col span={24}>
          total category: {configCategoryList.result.count}
          <Table
            data={configCategoryList.result.results}
            rowKey={(record) => {
              return record.category_set;
            }}
            column={[
              {
                title: "Category List",
                render: (record) => (
                  <Fragment>
                    <ColumnList
                      title="Category"
                      content={record.descriptionz}
                    />
                    <ColumnList title="action" type="action">
                      <Button
                        size="small"
                        icons="EditOutlined"
                        onClick={() => OpenEdit(record.category_set, record)}
                        loading={
                          infoDetail.category_set == record.category_set &&
                          getConfigCategoryChosen.loading
                        }
                      />
                      <Popconfirm
                        title="Are you sure to delete this?"
                        onConfirm={() => deleteCategory(record.category_set)}
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
                title: "Category Name",
                dataIndex: "descriptionz",
                key: "descriptionz",
                sorter: (a, b) => a.descriptionz.length - b.descriptionz.length,
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
                      onClick={() => OpenEdit(record.category_set, record)}
                    />
                    <Popconfirm
                      title="Are you sure to delete this?"
                      onConfirm={() => deleteCategory(record.category_set)}
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
      {modalEdit ? (
        <ModalEdit
          infoDetail={infoDetail}
          modalEdit={modalEdit}
          configCategoryChosen={configCategoryChosen}
          setmodalEdit={setmodalEdit}
          setSelectedcat={setSelectedcat}
          loading={loading}
          updateCategory={updateCategory}
          selectedCat={selectedCat}
          configSubcatList={configSubcatList}
        />
      ) : null}
      <Modal
        title="Create Category"
        visible={modalCreate}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={(e) => submitCategory(e)}
          >
            Submit
          </Button>,
          <Button
            key="back"
            loading={loading}
            type="dashed"
            danger="true"
            onClick={() => setmodalCreate(false)}
          >
            Cancel
          </Button>,
        ]}
      >
        <Form form>
          <Row>
            <Col span={24}>
              <Form.Item>
                <label htmlFor="Input">Category Name</label>
                <Input
                  onChange={(e) => handleInput(e)}
                  id="group_name"
                  value={category.group_name}
                  placeholder="category name"
                  suffixIcon="PlusCircleOutlined"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryList;
