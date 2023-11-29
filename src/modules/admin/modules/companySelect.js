import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Select } from 'components';
import { getAllCompany } from 'store/actions/adminActions';

const CompanySelect = ({ ...props }) => {
	const dispatch = useDispatch();
	const adminReducers = useSelector((state) => state.adminReducers);

	const { adminAllCompany } = adminReducers;

	useEffect(() => {
		dispatch(getAllCompany());
	}, []);

	let details = [];
	for (const property in adminAllCompany.result.data) {
		details.push({
			label: property,
			value: adminAllCompany.result.data[property],
		});
	}
	return (
		<Select
			{...props}
			showSearch
			optionFilterProp='children'
			placeholder='Select Company'
			filterOption={(input, option) => option.children.indexOf(input) >= 0}
		>
			{details.map((item) => {
				return (
					<Select.Option key={item.label} value={item.value}>
						{item.label}
					</Select.Option>
				);
			})}
		</Select>
	);
};

export default CompanySelect;
