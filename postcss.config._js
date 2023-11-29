// @ts-nocheck
const glob = require('glob-all');

module.exports = {
	plugins: [
		'postcss-flexbugs-fixes',
		[
			'postcss-preset-env',
			{
				autoprefixer: {
					flexbox: 'no-2009',
				},
				stage: 3,
				features: {
					'custom-properties': false,
				},
			},
		],
		[
			'@fullhuman/postcss-purgecss',
			{
				content: [
					'./src/pages/**/*.{js,jsx,ts,tsx}',
					'./src/components/**/*.{js,jsx,ts,tsx}',
					...glob.sync(`src/**/*.js`, { nodir: true }),
					...glob.sync(`node_modules/antd/es/version/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/grid/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/tabs/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/button/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/style/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/row/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/col/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/card/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/menu/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/layout/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/form/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/checkbox/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/modal/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/tooltip/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/table/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/select/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/input/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/input-number/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/message/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/pagination/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/tag/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/tabs/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/tree/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/tree-select/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/time-picker/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/typography/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/upload/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/date-picker/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/dropdown/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/alert/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/empty/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/config-provider/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/notification/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/popconfirm/**/*.css`, {
						nodir: true,
					}),
					...glob.sync(`node_modules/antd/es/_util/**/*.css`, {
						nodir: true,
					}),
				],
				defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
				safelist: ['html', 'body'],
				extractors: [
					{
						extractor: (content) => content.match(/[\w-/:]+(?= {)/g) || [],
						extensions: ['css', 'scss', 'less', 'sass'],
					},
				],
			},
		],
	],
};

// defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
