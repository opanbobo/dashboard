import { ColumnList, Modal, Row, Col, Empty, notification, Pagination } from 'components';
import { useEffect, useState } from 'react';

const ModalChartList = ({
	chartList,
	spokepersonStatisticClick,
	setChartList,
	paginationHandler,
	dataList,
	setDataList,
	handleClickChart,
}) => {
	useEffect(() => {
		if (spokepersonStatisticClick.result.message && !spokepersonStatisticClick.loading && chartList) {
			setChartList(false);
			notification.info({
				message: `${dataList.influencer_name} Alias`,
				description: spokepersonStatisticClick.result.message,
				duration: 3,
			});
		}
	}, [spokepersonStatisticClick]);

	if (!spokepersonStatisticClick.result.message) {
		return (
			<Modal
				title={`Quotes of ${dataList.label || dataList.influencer_name}`}
				bodyStyle={modalstyle}
				visible={chartList && !spokepersonStatisticClick.loading}
				closable
				onCancel={() => {
					setChartList(false);
					setDataList({
						page: 0,
						max_size: 10,
					});
				}}
				footer={
					spokepersonStatisticClick.result.message ? null : (
						<Pagination
							size='small'
							{...{
								showSizeChanger: true,
								total: spokepersonStatisticClick.result.recordsTotal ? spokepersonStatisticClick.result.recordsTotal : 0,
								showTotal: (total) => `Total ${spokepersonStatisticClick.result.recordsTotal ? spokepersonStatisticClick.result.recordsTotal : 0} article`,
								current: dataList.page + 1,
								pageSize: dataList.max_size,
								onChange: (editingPage, editingPageSize) => {
									paginationHandler(editingPage, editingPageSize);
								},
							}}
						/>
					)
				}
			>
				<Row style={{ minHeight: 100, maxHeight: '50vh', overflowY: 'scroll' }}>
					{spokepersonStatisticClick.result.message ? (
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
							<Empty description={spokepersonStatisticClick.result.message} />
						</div>
					) : (
						spokepersonStatisticClick.result.data?.map((item, index) => {
							return (
								<ColumnList
									style={{
										background: (index % 2) == 0 ? 'rgba(54, 65, 76, 0.1)' : '#FFF',
										paddingLeft: 6,
										paddingRight: 6,
										paddingTop: 8,
										paddingBottom: 8,
										marginBottom: 12,
									}}
									ellipsis
									content={<a style={{ color: '#1990ff', fontWeight: 600 }}>{item.quotes}</a>}
									key={`${item.quotes} ${item.media} ${index}`}
									title={
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
													<div style={{ fontWeight: 600, textTransform: 'initial' }}>
														{item.media.length > 0 ? item.media : 'undefined'}
													</div>
													<div>{item.datee.length > 0 ? item.datee.split('T').join(' ') : 'undefined'}</div>
												</div>
												<div style={textEllipis}>{item.content}</div>
											</Col>
										</Row>
									}
									onClick={() => {
										handleClickChart(item);
									}}
								/>
							);
						})
					)}
				</Row>
			</Modal>
		);
	} else {
		return null;
	}
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

export default ModalChartList;
