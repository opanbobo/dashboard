import { ApexChart, Card, gutter, Row, Col } from 'components';

const ToneTabs = ({
	className,
	coverage,
	selection,
	media,
	onLoading,
	onLoadingMedia,
	onLoadingCategory,
	pie,
	full,
	...cards
}) => {
	return (
		<Row gutter={[gutter, gutter]}>
			<Col xs={24} md={24} lg={12} xl={12}>
				<Card title={coverage.title} onLoading={onLoading} {...cards}>
				</Card>
			</Col>
			<Col xs={24} md={24} lg={12} xl={12}>
				<Card title={coverage.title} onLoading={onLoading} {...cards}>
				</Card>
			</Col>
			<Col xs={24} md={24} lg={full ? 12 : 24} xl={full ? 24 : 12}>
				<Card title={coverage.title} onLoading={onLoading} {...cards}>
					<ApexChart className={className} id='coverage' type='bar' {...coverage} />
				</Card>
			</Col>
			<Col xs={24} md={24} lg={full ? 12 : 24} xl={full ? 24 : 12}>
				<Card title={pie.title} {...cards}>
					<ApexChart className={className} id='pietone' type='pie' {...pie} />
				</Card>
			</Col>
			<Col xs={24} md={24} lg={full ? 24 : 12} xl={full ? 24 : 12}>
				<Card title={selection.title} onLoading={onLoadingMedia} {...cards}>
					<ApexChart className={className} id='selection' type='bar' {...selection} />
				</Card>
			</Col>
			<Col xs={24} md={24} lg={full ? 24 : 12} xl={full ? 24 : 12}>
				<Card title={media.title} onLoading={onLoadingCategory} {...cards}>
					<ApexChart className={className} id='media' type='bar' {...media} />
				</Card>
			</Col>
		</Row>
	);
};

export default ToneTabs;
