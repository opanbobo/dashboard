import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Form,
  Row,
  Col,
  Card,
  Button,
  Input,
  Icon,
  Select,
  notification,
} from "components";
import SearchList from "modules/search/searchList";

import {
  getSearchMedia,
  getSearchSubcat,
  postSearchContent,
} from "store/actions/searchActions";

const Search = () => {
  const dispatch = useDispatch();
  const searching = useSelector((state) => state.searching);
  const filters = useSelector((state) => state.filter);

  const { searchMedia, searchSubcat } = searching;
  const { filter } = filters;

  const [searchPage, setSearchPage] = useState(0);
  const [searchPageSize, setSearchPageSize] = useState(10);

  const [searchForm, setsearchForm] = useState({
    page: 0,
    maxSize: 10,
  });

  useEffect(() => {
    if (!searchMedia.loaded) {
      dispatch(getSearchMedia());
    }
    // if (!searchSubcat.loaded) {
    // 	dispatch(getSearchSubcat());
    // }
  }, []);

  const inputChange = (e) => {
    e.preventDefault();
    const newSearch = { ...searchForm };
    newSearch[e.target.id] = e.target.value;
    setsearchForm(searchForm);
  };

  const handleSearch = (value) => {
    postSearchContent({
      ...searchForm,
      page: 0,
      maxSize: 10,
      term: searchForm.term,
      search_field: searchForm.search_field,
      media_category: searchForm.media_category,
      start_date: filter.result.start_date,
      end_date: filter.result.end_date,
    })
      .then((data) => data.json())
      .then((data) => {
        setsearchForm({ ...searchForm, page: 0, maxSize: 10, ...data });

        setSearchPage(0), setSearchPageSize(10);
      })
      .catch((err) => console.log(err));
  };

  const MediaSelect = (selection) => {
    return <Select {...selection} />;
  };

  return (
    <Card shadow="false">
      <Form>
        <Row align="middle" justify="center">
          <Col xs={24} sm={24} md={8} xl={8}>
            <Row>
              <Col span={12}>
                <Form.Item>
                  <Select
                    placeholder="Select Media"
                    optionFilterProp="children"
                    id="media_category"
                    // defaultValue={searchForm.category_id}
                    onChange={(value) => {
                      setsearchForm({
                        ...searchForm,
                        media_category: value,
                        category_id: "all",
                      });
                    }}
                    options={
                      searchMedia.result.results?.map((item) => {
                        return {
                          value: item.key,
                          label: item.value,
                        };
                      }) || []
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Select
                    placeholder="Select by Content"
                    id="search_field"
                    defaultValue={searchForm.search_field}
                    onChange={(value) => {
                      setsearchForm({
                        ...searchForm,
                        search_field: value,
                      });
                    }}
                    options={[
                      {
                        value: "title",
                        label: "Title",
                      },
                      {
                        value: "content",
                        label: "Content",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={16} xl={16}>
            <Form.Item>
              <Input
                type="search"
                id="term"
                onChange={(e) => {
                  setsearchForm({
                    ...searchForm,
                    term: e.target.value,
                  });
                }}
                value={searchForm.term}
                allowClear
                enterButton={<Icon type="SearchOutlined" />}
                onSearch={() => handleSearch(searchForm)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <SearchList
        searchForm={searchForm}
        handleSearch={handleSearch}
        dataPag={{ searchPage, searchPageSize }}
        data={searchForm.results}
        pagination={{
          showSizeChanger: true,
          total: searchForm.totalItems,
          showTotal: (total) => `Article Found ${total}`,
          current: searchPage + 1,
          pageSize: searchPageSize,
          onChange: (searchPage, searchPageSize) => {
            setsearchForm(
              {
                ...searchForm,
                page: searchPage - 1,
                maxSize: searchPageSize,
              },
              setSearchPage(searchPage - 1),
              setSearchPageSize(searchPageSize)
            );

            postSearchContent({
              ...{
                ...searchForm,
                page: searchPage - 1,
                maxSize: searchPageSize,
              },
              term: searchForm.term,
              search_field: searchForm.search_field,
              media_category: searchForm.media_category,
              start_date: filter.result.start_date,
              end_date: filter.result.end_date,
            })
              .then((data) => data.json())
              .then((data) => {
                setsearchForm({ ...searchForm, ...data });
              })
              .catch((err) => console.log(err));
          },
        }}
      />
    </Card>
  );
};

export default Search;
