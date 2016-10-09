var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'wwwroot/scripts');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {

	entry: [
		'webpack-dev-server/client?http://0.0.0.0:1339', // WebpackDevServer host and port
		'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
		APP_DIR + '/app.js'],
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js',
		publicPath: '/scripts'
	},
	devServer: {
		inline: true,
		contentBase: './wwwroot',
		port: 1339,
		historyApiFallback: true,
		stats: 'errors-only',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: '/node_modules/',
				include: APP_DIR,
				query: {
					presets: ['es2015', 'stage-1', 'react'],
					// plugins: []
				}
			},
		],
		preLoaders: [
			{
				test: /\.js?$/,
				loaders: ['eslint'],
				include: APP_DIR
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		alias: {
			app: APP_DIR
		},
		extensions: ['', '.js', '.json']
	},
	eslint: {
		configFile: './.eslintrc'
	},
};

module.exports = config;

