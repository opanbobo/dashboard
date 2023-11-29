import { Checkbox } from 'components';
import { Divider } from 'antd';

const AccessMenu = ({ selectAll, group }) => {
	return (
		<>
			<Checkbox {...selectAll}>{selectAll.label}</Checkbox>
			<Divider style={{ margin: '6px 0' }} />
			<Checkbox
				type='group'
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					flexDirection: 'column',
					height: 200,
					width: '100%',
					overflow: 'auto',
				}}
				{...group}
			/>
		</>
	);
};

export default AccessMenu;
