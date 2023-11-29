import { Table, ColumnList, Tooltip, Button, Popconfirm } from 'components';

const AdminTable = ({ tables }) => {
	return <Table {...tables} />;
};

const UserTable = ({ tables }) => {
	return (
		<AdminTable
			tables={{
				...tables,
			}}
		/>
	);
};

AdminTable.User = UserTable;

export default AdminTable;
