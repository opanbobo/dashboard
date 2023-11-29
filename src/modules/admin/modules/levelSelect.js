import { useState, useEffect } from 'react';

import { Select } from 'components';
import { getAdminLevel } from 'store/actions/adminActions';

const LevelSelect = ({ ...optionProp }) => {
	const [adminLevelList, setAdminLevelList] = useState([]);

	useEffect(() => {
		getAdminLevel()
			.then((data) => data.json())
			.then((data) => {
				setAdminLevelList(data.data);
			})
			.catch((err) => {
				err;
			});
	}, []);

	return (
		<Select
			{...optionProp}
			options={
				adminLevelList.length > 0
					? adminLevelList.map((item) => {
							return {
								value: item.id,
								label: item.level_name,
							};
					  })
					: []
			}
		/>
	);
};

const Tags = (id) => {
	const [adminLevelList, setAdminLevelList] = useState([]);

	useEffect(() => {
		getAdminLevel()
			.then((data) => data.json())
			.then((data) => {
				setAdminLevelList(data.data);
			})
			.catch((err) => {
				err;
			});
	}, []);

	return (
		<>
			{adminLevelList.length > 0
				? adminLevelList.map((item) => {
						if (item.id == id) {
							return item.level_name;
						}
				  })
				: []}
		</>
	);
};

LevelSelect.Tag = Tags;

export default LevelSelect;
