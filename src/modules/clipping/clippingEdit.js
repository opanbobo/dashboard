import { Card, Table, gutter, ColumnList, Button, Row, Col } from 'components';

import { useState, useEffect } from 'react';
import breakPointOberver from 'constant/mediaQuery';

const ClippingEdit = ({ cards, info, tables }) => {
	return (
		<Card {...cards} shadow='false'>
			<div style={styles}>{info}</div>
			<Table {...tables} />
		</Card>
	);
};

const breakLayout = { mobile: '(max-width: 400px)' };
export const EditingForm = ({ fields }) => {
	const [breakPoint, isBreakPoint] = useState();

	useEffect(() => {
		breakPointOberver(breakLayout, isBreakPoint);
	}, [breakPoint]);

	return (
		<Row>
			<Col xs={24} md={12} lg={12} xl={12}>
				<ColumnList bold title='date' content='11 january 2021' />
				<ColumnList bold title='media' content='11 january 2021' />
				<ColumnList bold title='sentiment' content='11 january 2021' />
			</Col>
			<Col xs={24} md={12} lg={12} xl={12}>
				<ColumnList bold title='news value' content='11 january 2021' />
				<ColumnList bold title='ad value' content='11 january 2021' />
				<Button block='true' size='default' type='dashed' icons='SaveOutlined'>
					Article
				</Button>
			</Col>
		</Row>
	);
};

const styles = {
	display: 'block',
	position: 'relative',
	width: '100%',
	marginBottom: 12,
};

export default ClippingEdit;
