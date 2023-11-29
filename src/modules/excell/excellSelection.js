import { Checkbox } from 'components';
import { Divider } from 'antd';

const ExcelSelection = ({ selectall, group }) => {
	return (
		<>
			<Checkbox {...selectall}>{selectall.label}</Checkbox>
			<Divider style={{ margin: '6px 0' }} />
			<Checkbox
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					flexDirection: 'column',
					height: 200,
					width: '100%',
					overflow: 'auto',
				}}
				type={'group'}
				{...group}
			/>
		</>
	);
};

export default ExcelSelection;
