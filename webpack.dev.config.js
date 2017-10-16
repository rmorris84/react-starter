// Require WebPack for HMR
const webpack = require('webpack');
// Require the base Webpack Config
const config = require('./webpack.config.js');
// Extract Text from bundles into separate files
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Bundle the CSS
const ExtractTextPluginConfig = new ExtractTextPlugin('bundle.css');

// Pack CSS and SCSS
config.module.rules = config.module.rules.concat([{
		test: /\.css$/,
		use: ['css-hot-loader'].concat(ExtractTextPluginConfig.extract({
			fallback: 'style-loader',
			use: 'css-loader',
		})),
	},

	{
		test: /\.scss$/,
		use: ['css-hot-loader'].concat(ExtractTextPluginConfig.extract({
			fallback: 'style-loader',
			use: ['css-loader', 'sass-loader'],
		})),
	}
]);

// Define Dev Mode
config.plugins.push(new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: JSON.stringify('development')
	}
}));

// Used to put loaders in debug - Helps with older loaders
config.plugins.push(new webpack.LoaderOptionsPlugin({
	debug: true,
}));

// Adds plugins to config
config.plugins.push(ExtractTextPluginConfig);
config.plugins.push(new webpack.NamedModulesPlugin());

// Exports Dev Config
module.exports = config;