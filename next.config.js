// @ts-nocheck
const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const pluginAntdLess = withAntdLess({
	lessVarsFilePath: 'src/styles/vendor/antd.less',
});

module.exports = withPlugins([[pluginAntdLess], [new AntdDayjsWebpackPlugin()]], {
	trailingSlash: true,
	strictMode: false,
	images: {
		domains: ['images.unsplash.com', 'pixabay.com', 'admin.antara-insight.id', 'demo.digivla.id', 'api.digivla.id'],
	},
	webpack(config) {
		return config;
	},
});

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
// module.exports = withBundleAnalyzer({});
