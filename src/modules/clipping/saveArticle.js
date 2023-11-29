import { useState } from 'react';
import { Checkbox, ColumnList } from 'components';
import { Divider } from 'antd';

const SaveArticle = ({ title, options, group, defaultValue, onChange, ...props }) => {
	const [checkedList, setCheckedList] = useState(defaultValue);
	const [indeterminate, setIndeterminate] = useState(true);
	const [checkAll, setCheckAll] = useState(false);

	const onCheckAllChange = (e) => {
		setCheckedList(e.target.checked ? options : []);
		setIndeterminate(false);
		setCheckAll(e.target.checked);
	};

	return (
		<div>
			<ColumnList title={title} />
			<Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} {...props}>
				Check all
			</Checkbox>
			<Divider style={{ margin: '6px 0' }} />
			<Checkbox
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					flexDirection: 'column',
					maxHeight: 300,
					marginBottom: 10,
					overflow: 'auto',
				}}
				type='group'
				options={options}
				value={defaultValue}
				onChange={onChange}
				{...group}
			/>
		</div>
	);
};

SaveArticle.Sponsor = SaveArticle;

export default SaveArticle;
