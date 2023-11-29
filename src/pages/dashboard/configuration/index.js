import MediaList from 'modules/configuration/media';
import CategoryList from 'modules/configuration/category';

import SubCatList from 'modules/configuration/subcategory';
import InfluencerList from 'modules/configuration/influencer';

import WordConfig from 'modules/configuration/wordConfig';
import ExportConfig from 'modules/configuration/export';
import SponsorConfig from 'modules/configuration/sponsorConfig';

import { Tabset } from 'components';
import { useEffect, useState } from 'react';

const Configuration = () => {
	const userRole = JSON.parse(localStorage.getItem('userToken'));

	const dataTab = [
		{
			key: 1,
			title: 'Media List',
			content: <MediaList />,
		},
		{
			key: 2,
			title: 'Category List',
			content: <CategoryList />,
		},
		{
			key: 3,
			title: 'SubCategory List',
			content: <SubCatList />,
		},
		{
			key: 4,
			title: 'Spokeperson Alias',
			content: <InfluencerList />,
		},
		{
			key: 5,
			title: 'Stopword',
			content: <WordConfig />,
		},
		{
			key: 6,
			title: 'File Export',
			content: <ExportConfig />,
		},
		{
			key: 7,
			title: 'Sponsorship',
			content: <SponsorConfig />,
		},
	];

	const [analystTab, setAnalystTab] = useState([]);
	const [baliTab, setBaliTab] = useState([]);
	const [dataTabF, setDataTabF] = useState([]);

	useEffect(() => {
		let filterTab = dataTab.filter(function (item) {
			return item.key < 6;
		});
		setAnalystTab(filterTab);

		let filterTabBali = dataTab.filter(function (item) {
			return item.key != 6;
		});

		setBaliTab(filterTabBali);

		let filterDataTabF = dataTab.filter(item => item.key < 7);
		setDataTabF(filterDataTabF);
	}, []);

	return (
		<>
			<Tabset
				tabPosition='top'
				style={{ height: '100%' }}
				data={userRole.comp_id == 1198 ? baliTab : (userRole.usr_comp_level == 3 ? dataTabF : analystTab)}
			/>
		</>
	);
};

export default Configuration;
