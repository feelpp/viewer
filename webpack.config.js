/* Imports */

const path = require('path');

/* Config */

module.exports = (env, argv) => {

	/* Public path */

	let publicPath = '';

	if(env && env.publicPath)
	{
		publicPath = env.publicPath
	}

	/* Rules */

	let rules = [
		{
			test: require.resolve('./src/Viewer.js'),
			use: [
				{
					loader: 'expose-loader',
					options: 'Cemosis'
				},
			],
		},
		{
			test: /\.jsx?$/,
			use: [
				{
					loader: 'babel-loader',
					options: {},
				},
			],
		},
		{
			test: /\.less$/,
			use: [
				{
					loader: 'style-loader',
					options: {},
				},
				{
					loader: 'css-loader',
					options: {},
				},
				{
					loader: 'less-loader',
					options: {},
				},
			],
		},
		{
			test: /\.css$/,
			use: [
				{
					loader: 'style-loader',
					options: {},
				},
				{
					loader: 'css-loader',
					options: {},
				},
			],
		},
		{
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: '10000',
						mimetype: 'application/font-woff',
					},
				},
			],
		},
		{
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: '10000',
						mimetype: 'application/font-woff',
					},
				},
			],
		},
		{
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: '10000',
						mimetype: 'application/octet-stream',
					},
				},
			],
		},
		{
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			use: [
				{
					loader: 'file-loader',
					options: {},
				},
			],
		},
		{
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: '10000',
						mimetype: 'application/image/svg+xml',
					},
				},
			],
		},
	];

	if(argv.mode === 'production')
	{
		rules.push(
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {},
					},
					{
						loader: 'eslint-loader',
						options: {},
					},
				],
			}
		);
	}

	/* Return */

	return {
		entry: './src/Viewer.js',
		output: {
			path: path.resolve(path.join(__dirname, 'dist')),
			filename: 'Viewer.js',
			publicPath: publicPath,
		},
		resolve: {
			extensions: [
				'.js',
			],
		},
		module: {
			rules: rules,
		},
	};
};