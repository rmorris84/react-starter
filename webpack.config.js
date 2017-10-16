// Require Webpack for HMR
const webpack = require('webpack');
// Required for working with paths and directories
const path = require('path');
// HTML Template Plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Template for HTML Template
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: path.join(__dirname, 'src/index.html'),
	filename: 'index.html',
	inject: 'body',
	favicon: path.join(__dirname, 'src/assets/icons/favicon.ico'),
});

// Handles Module Concatenation. Loads page faster.
const ModuleConcatenationConfig = new webpack.optimize.ModuleConcatenationPlugin();

module.exports = {
	// Webpack-Dev-Server Setup
	devServer: {
		contentBase: './dist',
		inline: true,
		port: 8080,
		// hot: true
	},
	// Entry and output paths
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: './'
	},
	// Convert ES6
	module: {
		rules: [{
				test: /.jsx?$/,
				exclude: /node_modules/,
				include: path.join(__dirname, 'src'),
				use: [{
					loader: 'babel-loader',
					options: {
						babelrc: false,
						presets: [
							['env', {
								modules: false
							}],
							'react',
						],
						plugins: ['react-hot-loader/babel']
					}
				}]
			},
			{
        test: /\.html$/,
        exclude: /node_modules/,
				loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
			{
				// Loads Images and compresses for web
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: /node_modules/,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75
							}
						}
					},
				],
			},
			{
				// Handles Web Fonts
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff',
			},
			{
				// Handles Images
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
				loader: 'file-loader',
			},
		]
	},
	plugins: [
		HtmlWebpackPluginConfig,
		ModuleConcatenationConfig,
		new webpack.HotModuleReplacementPlugin()
	],
};
