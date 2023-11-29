import { Drawer, Row, Col, ColumnList, Tag } from 'components';
import { keywordSet } from 'utils/keywordSet';

const GeoDrawer = ({ articleDetail, openDetail, setopenDetail, setarticleDetail, keyword }) => {
	return (
		<Drawer
			title={articleDetail.title}
			placement='right'
			visible={openDetail}
			onClose={() => {
				setopenDetail(false);
				setarticleDetail({});
			}}
		>
			<Row>
				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<ColumnList title='news date:' content={articleDetail.datee} />
					<ColumnList title='Jurnalist:' content={articleDetail.journalist} />
					<ColumnList title='media type:' content={articleDetail.media_type} />
					<ColumnList title='location:' content={articleDetail.location} />
				</Col>
				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<ColumnList title='news value:' content={`${articleDetail.rate_bw}`} />
					<ColumnList title='ad value:' content={`${articleDetail.rate_fc}`} />
					<ColumnList
						title='sentiment:'
						content={
							<Tag
								style={{ margin: 0 }}
								color={
									articleDetail.tone == 'Positive'
										? 'success'
										: 'processing' && articleDetail.tone == 'Negative'
										? 'error'
										: 'processing'
								}
							>
								{articleDetail.tone}
							</Tag>
						}
					/>
				</Col>
				<Col span={24}>
					<Row>
						<Col span={24}>
						{
                articleDetail.file_pdf?.split(".")[1] == "mp4" && <video src={"https://input.digivla.id/media_tv/"+ articleDetail.file_pdf.split('-')[0] + "/" + articleDetail.file_pdf.split('-')[1] + "/" + articleDetail.file_pdf.split('-')[2] + "/" + articleDetail.file_pdf} controls>Your browser does not support HTML5 video.</video>
              }
						<div
                dangerouslySetInnerHTML={{
                  __html: keywordSet(keyword, articleDetail.content),
                }}
              ></div>
							{/* <div
								style={{
									overflowY: 'scroll',
									maxHeight: 300,
									border: '1px dashed rgba(54, 65, 76, 0.3)',
									padding: 6,
									borderRadius: 3,
								}}
							>
								{articleDetail.content}
							</div> */}
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Tag color='processing'>{articleDetail.category_id}</Tag>
				</Col>
			</Row>
		</Drawer>
	);
};

export default GeoDrawer;
