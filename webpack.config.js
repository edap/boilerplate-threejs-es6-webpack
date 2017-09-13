/* eslint-env node */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PUBLIC = __dirname + "/www";
const TITLE = "Example Title";


const plugins = [
        // create an html page
		new HtmlWebpackPlugin({
			title: TITLE,
			filename: 'index.html',
			template: 'src/index.html'
		}),
		//copy the assets (with no css compilation)
        new CopyWebpackPlugin([
            {from:'src/textures',to:'textures'},
            {from:'src/css',to:'css'},
            {from:'src/sounds', to: 'sounds'}
        ]),
        // clean the output folder
        new CleanWebpackPlugin(['www']),
];

module.exports = {
	target: 'web',
	devtool: 'source-map',
	entry: './src/application.js',
	output: {
		path: PUBLIC,
		filename: 'bundle.js',
		publicPath: ''
	},
	plugins: plugins,
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, 'src')
				],
				loader: 'babel-loader',
				query: {
					compact: true,
					presets: [
						['es2015', {modules: false}]
					]
				}
			}
		]
	},
	performance: {
		hints: false
	}
};
