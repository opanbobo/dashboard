import { Tabset } from 'components';

import CompanyList from 'modules/admin/companyList';
import UserList from 'modules/admin/userList';

const AdminPage = () => {
	return (
		<Tabset
			style={{ height: '100%' }}
			tabPosition='top'
			data={[
				{
					key: 1,
					title: 'User List',
					content: <UserList />,
				},
				{
					key: 2,
					title: 'Company List',
					content: <CompanyList />,
				},
			]}
		/>
	);
};

export default AdminPage;
