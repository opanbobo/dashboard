import { ApexChart, Card, gutter, Row, Col } from 'components';

const MediaTabs = ({ className, visibility, pie, headline, ...cards }) => {
	return (
		<Row>
			<Col span={24}>
				<Card title={visibility.title} {...cards}>
					<div ref={visibility.ref}>
						<ApexChart className={className} type='line' {...visibility} />
					</div>
				</Card>
			</Col>
			{/* {
				headline && (
					// <Col xs={24} md={24} lg={12} xl={12}>
					<Col xs={24} md={24} lg={8} xl={8}>
						<Card title='Latest News' {...cards}>
							{headline}
						</Card>
					</Col>
				)
			} */}
			{/* <Col xs={24} md={24} lg={headline ? 12 : 24} xl={headline ? 12 : 24}> */}
			<Col xs={24} md={24} lg={24} xl={24}>
				<Card title={pie.title} {...cards}>
					<ApexChart className={className} id='pie' type='pie' {...pie} />
				</Card>
			</Col>
			
		</Row>
	);
};

export default MediaTabs;
