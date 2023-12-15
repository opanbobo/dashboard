import { Modal, ColumnList, Row, Col, Loading, Empty } from 'components';
import { Pagination } from 'antd';
import DetailArticle from './detailArticle';
import { useState } from 'react';
import { getKeywordArticle } from 'store/actions/newsClippingActions';

const Popchart = ({ data, modal, pagination, onLoading, onDetailClick, selfOnClick}) => {
	const [articleDetail, setArticleDetail] = useState({});
	const [detailOpen, setDetailOpen] = useState(false);
	const [saveArticlePop, setsaveArticlePop] = useState(false);
	const [keyword, setKeyword] = useState();

	const Detail = () => {
		return (
			<DetailArticle
				clippingDrawer={articleDetail}
				setClippingDrawer={setArticleDetail}
				clipListPop={detailOpen}
				setclipListPop={setDetailOpen}
				saveArticlePop={saveArticlePop}
				setsaveArticlePop={setsaveArticlePop}
				keyword={keyword}
			/>
		);
	};

	return (
		<Modal
			bodyStyle={modalstyle}
			closable
			onCancel={modal.close}
			footer={<Pagination size='small' {...pagination} />}
			{...modal}
		>
			<div style={{ minHeight: 100, maxHeight: '50vh', overflowY: 'scroll' }}>
				{onLoading == true && <Loading />}
				{/* {} */}

				{data.length > 0 ? (
					data.map((item, index) => {
						return (
							<ColumnList
								style={{
									background: index % 2 == 0 ? 'rgba(54, 65, 76, 0.1)' : null,
									paddingLeft: 6,
									paddingRight: 6,
									paddingTop: 8,
									paddingBottom: 8,
									marginBottom: 12,
								}}
								onClick={() => {
									if (!selfOnClick) {
										getKeywordArticle({
											article_id: item.id,
										}).then(data => data.json()).then(data => {
											setKeyword(data.data);
											setArticleDetail(item.detail);
											setDetailOpen(true);
										}).catch(err => console.log(err));
									}
								}}
								ellipsis
								title={<a style={{ color: '#1990ff', fontWeight: 600 }}>{item.title}</a>}
								key={item.id}
								content={
									<Row gutter={[0]}>
										<Col span={24}>
											<div
												style={{
													margin: '5px 0',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'space-between',
												}}
											>
												<div style={{ fontWeight: 600 }}>
													{item.detail.media_name.length > 0 ? item.detail.media_name : 'undifined'}
												</div>
												<div>{item.detail.datee.length > 0 ? item.detail.datee.split('T').join(' ') : 'undifined'}</div>
											</div>
											<div style={textEllipis}>{item.content}</div>
										</Col>
									</Row>
								}
							/>
						);
					})
				) : (
					<div
						style={{
							minHeight: 300,
							height: '100%',
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Empty />
					</div>
				)}
			</div>

			<Detail />
		</Modal>
	);
};

const modalstyle = {
	padding: 10,
	maxHeight: '100%',
	minHeight: 100,
};

const textEllipis = {
	display: '-webkit-box',
	maxWidth: '100%',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
};

export default Popchart;
