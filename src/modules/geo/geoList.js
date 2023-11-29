import Popchart from "modules/popup/popchart";
import { useDispatch, useSelector } from "react-redux";
import { getGeoList } from "store/actions/geospatialActions";

const GeoList = ({
  articleData,
  openList,
  geoList,
  handleCancel,
  handleDetail,
  setarticleData,
  defaultFilter,
}) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filter);
  const { filter } = filters;

  return (
    <Popchart
      selfOnClick={true}
      modal={{
        title: `Article of ${articleData.key}`,
        visible: openList && !geoList.loading,
        closeable: true,
        onCancel: handleCancel,
      }}
      data={
        geoList.result.data
          ? geoList.result.data.map((item) => {
              return {
                id: item.article_id,
                title: (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDetail(item.article_id, item)}
                  >
                    {item.title}
                  </span>
                ),
                detail: item,
              };
            })
          : []
      }
      pagination={{
        showSizeChanger: true,
        total: geoList.result.recordsTotal || 0,
        showTotal: (total) => `Total ${geoList.result.recordsTotal || 0} article`,
        defaultPageSize: articleData.max_size,
        defaultCurrent: articleData.page + 1,
        onChange: (newPage, newSize) => {
          dispatch(
            getGeoList({
              ...defaultFilter,
              page: newPage - 1,
              max_size: newSize,
              geo_loc: articleData.key,
              ...filter.result,
            })
          );
          setarticleData({
            ...articleData,
            page: newPage - 1,
            max_size: newSize,
          });
        },
      }}
    />
  );
};

export default GeoList;
