import { Card, Table } from 'components';

const SpokeTable = ({ cards, tables, ...props }) => {
	return (
		<Card {...cards}>
			<Table {...tables} />
		</Card>
	);
};

export default SpokeTable;
