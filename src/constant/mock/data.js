import mockavatar from 'assets/images/avatar.png';

export const ToneSeries = [
	{
		name: 'Negative',
		data: [],
	},
	{
		name: 'Neutral',
		data: [],
	},
	{
		name: 'Positive',
		data: [],
	},
];

export const MediaSeries = [
	{
		name: 'Media 1',
		data: [80, 50, 30, 40, 100, 20],
	},
	{
		name: 'Media 2',
		data: [20, 30, 40, 80, 20, 80],
	},
	{
		name: 'Media 3',
		data: [44, 76, 78, 13, 43, 10],
	},
];

export const WidgetSeries = [
	{
		id: 1,
		type: 'positive',
		label: 'positive mention',
		description: 'since last week',
		total: '0',
		status: 'normal',
		percent: '0%',
	},
	{
		id: 2,
		type: 'neutral',
		label: 'neutral mention',
		description: 'since last week',
		total: '0',
		status: 'normal',
		percent: '0%',
	},
	{
		id: 3,
		type: 'negative',
		label: 'negative mention',
		description: 'since last week',
		total: '0',
		status: 'normal',
		percent: '0%',
	},
];

export const MapSeries = [
	['id-3700', 0],
	['id-ac', 1],
	['id-jt', 2],
	['id-be', 3],
	['id-bt', 4],
	['id-kb', 5],
	['id-bb', 6],
	['id-ba', 7],
	['id-ji', 8],
	['id-ks', 9],
	['id-nt', 10],
	['id-se', 11],
	['id-kr', 12],
	['id-ib', 13],
	['id-su', 14],
	['id-ri', 15],
	['id-sw', 16],
	['id-ku', 17],
	['id-la', 18],
	['id-sb', 19],
	['id-ma', 20],
	['id-nb', 21],
	['id-sg', 22],
	['id-st', 23],
	['id-pa', 24],
	['id-jr', 25],
	['id-ki', 26],
	['id-1024', 27],
	['id-jk', 28],
	['id-go', 29],
	['id-yo', 30],
	['id-sl', 31],
	['id-sr', 32],
	['id-ja', 33],
	['id-kt', 34],
];

export const WordSeries = [
	{ name: 'jQuery', weight: 25 },
	{ name: 'MongoDB', weight: 18 },
	{ name: 'JavaScript', weight: 38 },
	{ name: 'React', weight: 30 },
	{ name: 'Nodejs', weight: 28 },
	{ name: 'Express.js', weight: 25 },
	{ name: 'HTML5', weight: 33 },
	{ name: 'CSS3', weight: 20 },
	{ name: 'Webpack', weight: 22 },
	{ name: 'Babel.js', weight: 7 },
	{ name: 'ECMAScript', weight: 25 },
	{ name: 'Jest', weight: 15 },
	{ name: 'Mocha', weight: 17 },
	{ name: 'React Native', weight: 27 },
	{ name: 'Angular.js', weight: 30 },
	{ name: 'TypeScript', weight: 15 },
	{ name: 'Flow', weight: 30 },
	{ name: 'NPM', weight: 11 },
];

export const MetionSeries = [
	{
		image: mockavatar,
		label: 'name',
	},
	{
		image: mockavatar,
		label: 'name',
	},
	{
		image: mockavatar,
		label: 'name',
	},
	{
		image: mockavatar,
		label: 'name',
	},
	{
		image: mockavatar,
		label: 'name',
	},
	{
		image: mockavatar,
		label: 'name',
	},
	{
		image: mockavatar,
		label: 'name',
	},
	{
		image: mockavatar,
		label: 'name',
	},
	{
		image: mockavatar,
		label: 'name',
	},
	{
		image: mockavatar,
		label: 'name',
	},
];

export const SpokeSeries = [
	{
		image: mockavatar,
		label: 'name',
		news: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo rerum adipisci hic expedita, voluptatum iure iste ullam sint consequatur fugiat!`,
	},
	{
		image: mockavatar,
		label: 'name',
		news: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo rerum adipisci hic expedita, voluptatum iure iste ullam sint consequatur fugiat!`,
	},
	{
		image: mockavatar,
		label: 'name',
		news: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo rerum adipisci hic expedita, voluptatum iure iste ullam sint consequatur fugiat!`,
	},
	{
		image: mockavatar,
		label: 'name',
		news: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo rerum adipisci hic expedita, voluptatum iure iste ullam sint consequatur fugiat!`,
	},
	{
		image: mockavatar,
		label: 'name',
		news: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo rerum adipisci hic expedita, voluptatum iure iste ullam sint consequatur fugiat!`,
	},
];

export const MediaListSeries = [
	{
		url: '/static/print.png',
		label: 'Print',
		total: 400,
	},
	{
		url: '/static/online.png',
		label: 'Online',
		total: 600,
	},
	{
		url: '/static/television.png',
		label: 'TV',
		total: 30,
	},
	// {
	// 	url: '/static/radio.png',
	// 	label: 'Radio',
	// 	total: 120,
	// },
];

export const treeData = [
	{
		title: 'parent 1',
		key: '0-0',
		children: [
			{
				title: 'parent 1-0',
				key: '0-0-0',
				disabled: true,
				children: [
					{
						title: 'leaf',
						key: '0-0-0-0',
						disableCheckbox: true,
					},
					{
						title: 'leaf',
						key: '0-0-0-1',
					},
				],
			},
			{
				title: 'parent 1-1',
				key: '0-0-1',
				children: [
					{
						title: (
							<span
								style={{
									color: '#1890ff',
								}}
							>
								sss
							</span>
						),
						key: '0-0-1-0',
					},
				],
			},
		],
	},
];
import avatar from 'assets/images/avatar.png';

export const SpokeTableData = [
	{
		key: 1,
		spokeperson: 'John',
		media: 'media name 1',
		quote:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea obcaecati nihil dolore excepturi vel quae corporis libero corrupti inventore atque.',
		tones: 'neutral',
		date: '1/1/2021',
		image: avatar,
	},
	{
		key: 2,
		spokeperson: 'Jim',
		media: 'media name 2',
		quote:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea obcaecati nihil dolore excepturi vel quae corporis libero corrupti inventore atque.',
		tones: 'neutral',
		date: '2/1/2021',
		image: avatar,
	},
	{
		key: 3,
		spokeperson: 'Joe',
		media: 'media name 3',
		quote:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea obcaecati nihil dolore excepturi vel quae corporis libero corrupti inventore atque.',
		tones: 'neutral',
		date: '3/1/2021',
		image: avatar,
	},
];

export const clippingListData = [
	{
		key: '1',
		media: 'John  media',
		date: '1/1/2021',
		headline:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a debitis reprehenderit necessitatibus explicabo illum aliquam itaque dignissimos pariatur quo aliquid nulla ullam iusto, adipisci voluptate magnam velit consequatur laborum!',
	},
	{
		key: '2',
		media: 'Jim  media',
		date: '12/1/2021',
		headline:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a debitis reprehenderit necessitatibus explicabo illum aliquam itaque dignissimos pariatur quo aliquid nulla ullam iusto, adipisci voluptate magnam velit consequatur laborum!',
	},
	{
		key: '3',
		media: 'Joe  media',
		date: '13/1/2021',
		headline:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a debitis reprehenderit necessitatibus explicabo illum aliquam itaque dignissimos pariatur quo aliquid nulla ullam iusto, adipisci voluptate magnam velit consequatur laborum!',
	},
	{
		key: '4',
		media: 'Disabled media',
		date: '11/1/2021',
		headline:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a debitis reprehenderit necessitatibus explicabo illum aliquam itaque dignissimos pariatur quo aliquid nulla ullam iusto, adipisci voluptate magnam velit consequatur laborum!',
	},
];

export const clippingEditingData = [
	{
		key: '1',
		media: 'test media',
		date: '1/1/2021',
		tone: 'neutral',
		headline: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		summary:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a debitis reprehenderit necessitatibus explicabo illum aliquam itaque dignissimos pariatur quo aliquid nulla ullam iusto, adipisci voluptate magnam velit consequatur laborum!',
	},
	{
		key: '2',
		media: 'Jim  media',
		date: '12/1/2021',
		tone: 'positive',
		headline: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		summary:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a debitis reprehenderit necessitatibus explicabo illum aliquam itaque dignissimos pariatur quo aliquid nulla ullam iusto, adipisci voluptate magnam velit consequatur laborum!',
	},
	{
		key: '3',
		media: 'Joe  media',
		date: '13/1/2021',
		tone: 'negative',
		headline: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		summary:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a debitis reprehenderit necessitatibus explicabo illum aliquam itaque dignissimos pariatur quo aliquid nulla ullam iusto, adipisci voluptate magnam velit consequatur laborum!',
	},
	{
		key: '4',
		media: 'Disabled media',
		date: '11/1/2021',
		tone: 'neutral',
		headline: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		summary:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a debitis reprehenderit necessitatibus explicabo illum aliquam itaque dignissimos pariatur quo aliquid nulla ullam iusto, adipisci voluptate magnam velit consequatur laborum!',
	},
];

export const saveArticleSeries = [
	'dada 1',
	'category 2',
	'category 3',
	'dada 4',
	'category 5',
	'dafd 6',
	'fagdgddgdgd 7',
	'category 8',
	'dada 9',
	'category 10',
];

export const tagCategorySeries = [
	{ label: 'tag name 1 dadadasdasdadwa', id: 1 },
	{ label: 'tag name 2', id: 2 },
	{ label: 'tag name 3', id: 3 },
	{ label: 'tag name 4', id: 4 },
	{ label: 'tag name 5', id: 5 },
	{ label: 'tag name 6', id: 6 },
	{ label: 'tag name 7', id: 7 },
	{ label: 'tag name 8', id: 8 },
	{ label: 'tag name 9', id: 9 },
	{ label: 'tag name 10', id: 10 },
];

export const UserListData = [
	{
		key: '1',
		logo: mockavatar,
		username: 'username 1',
		company: 'company name 1',
		level: 'admin',
	},
	{
		key: '2',
		logo: mockavatar,
		username: 'username 2',
		company: 'company name 2',
		level: 'viewer',
	},
	{
		key: '3',
		logo: mockavatar,
		username: 'username 3',
		company: 'company name 3',
		level: 'reader',
	},
	{
		key: '4',
		logo: mockavatar,
		username: 'username 4',
		company: 'company name 4',
		level: 'admin',
	},
];

export const CompanyListData = [
	{
		key: '1',
		logo: mockavatar,
		expired: '11/1/2021',
		company: 'company name 1',
		keyword: '100',
		status: 'active',
	},
	{
		key: '2',
		logo: mockavatar,
		expired: '12/1/2021',
		company: 'company name 2',
		keyword: '100',
		status: 'trial',
	},
	{
		key: '3',
		logo: mockavatar,
		expired: '13/1/2021',
		company: 'company name 3',
		keyword: '100',
		status: 'inactive',
	},
	{
		key: '4',
		logo: mockavatar,
		expired: '14/1/2021',
		company: 'company name 4',
		keyword: '100',
		status: 'active',
	},
];

export const StatusData = [
	{
		value: 0,
		label: 'active',
	},
	{
		value: 1,
		label: 'inactive',
	},
	{
		value: 2,
		label: 'trial',
	},
];

export const filtercategoryMock = [
	{
		category_set: 1,
		descriptionz: 'category 1',
	},
	{
		category_set: 2,
		descriptionz: 'category 2',
	},
	{
		category_set: 3,
		descriptionz: 'category 3',
	},
];

export const filtersubcategoryMock = [
	{
		category_set: 1,
		category_id: 'sub category 1',
	},
	{
		category_set: 2,
		category_id: 'sub category 2',
	},
	{
		category_set: 3,
		category_id: 'sub category 3',
	},
];

export const filtermediaMock = [
	{
		user_media_type_id: 1,
		user_media_type_name_def: 'media 1',
	},
	{
		user_media_type_id: 2,
		user_media_type_name_def: 'media 2',
	},
	{
		user_media_type_id: 3,
		user_media_type_name_def: 'media 3',
	},
];

export const filtersubmediaMock = [
	{
		user_media_type_id: 1,
		user_media_type_name_def: 'sub media 1',
	},
	{
		user_media_type_id: 2,
		user_media_type_name_def: 'sub media 2',
	},
	{
		user_media_type_id: 3,
		user_media_type_name_def: 'sub media 3',
	},
];

export const filtertoneMock = [
	{
		value: null,
		label: 'All Tone',
	},
	{
		value: -1,
		label: 'Negative',
	},
	{
		value: 0,
		label: 'Neutral',
	},
	{
		value: 1,
		label: 'Positive',
	},
];

export const articlelistMock = [
	{
		id: 1,
		title: 'article 1',
		content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, incidunt?',
	},
	{
		id: 2,
		title: 'article 2',
		content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, incidunt?',
	},
	{
		id: 3,
		title: 'article 3',
		content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, incidunt?',
	},
	{
		id: 4,
		title: 'article 4',
		content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, incidunt?',
	},
	{
		id: 5,
		title: 'article 5',
		content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, incidunt?',
	},
	{
		id: 6,
		title: 'article 6',
		content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, incidunt?',
	},
	{
		id: 7,
		title: 'article 7',
		content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, incidunt?',
	},
	{
		id: 8,
		title: 'article 8',
		content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, incidunt?',
	},
];

export const searchMockSeries = [
	{
		title: 'title 1',
		source: 'warta kota',
		date: '1 january 2021',
		content:
			'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel itaque cum, enim error inventore tempore veniam laudantium explicabo pariatur ex amet ab nesciunt, illum quod modi accusantium unde ea consequuntur exercitationem. Eius eveniet obcaecati totam assumenda beatae perspiciatis tenetur aliquam repellendus! Dolore rem possimus quas officiis unde aperiam quisquam quaerat qui error nisi maiores ullam libero dolores reiciendis, odit minima soluta est eum. Mollitia, laudantium ea vel impedit alias voluptatum expedita esse perferendis? Tempore saepe ullam eius ratione perferendis omnis quo aperiam suscipit? Dolore repellendus quia et ab, ea illum doloribus sunt in! Totam facilis, cupiditate vitae esse dolorum nemo.',
	},
];
