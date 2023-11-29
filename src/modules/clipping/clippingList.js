import { Card, Table } from 'components';

const ClippingList = ({ cards, info, tables }) => {
	return (
		<Card {...cards} shadow='false'>
			<div style={styles}>{info}</div>
			<Table {...tables} />
		</Card>
	);
};

const styles = {
	display: 'block',
	position: 'relative',
	width: '100%',
	marginBottom: 12,
};

export default ClippingList;
