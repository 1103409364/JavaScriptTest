const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: "development", // "production" | "development" | "none"
	entry: "./app/main", // string | object | array // 这里应用程序开始执行
	output: {
		path: path.resolve(__dirname, "dist"), // string
		filename: "bundle.js", // string"[name].js",  for multiple entry points
		// 配置输出文件的虚拟路径
		// publicPath: "/dev/",
	},
	//监听，在package.json中配置
	// watch: true,
	// 帮助追踪错误
	devtool: 'inline-source-map',
	// 告诉 dev server，从什么位置查找文件，真实路径，静态文件位置
	devServer: {
		contentBase: './dist',
		hot: true
	},
	// 使用插件，自动生成HTML文件自动引入生成的bundle.js，配置模板
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/template/index.html'
		}),
		// 启用 HMR需要引入webpack
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: ['babel-loader'],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader', // creates style nodes from JS strings
					},
					{
						loader: 'css-loader', // translates CSS into CommonJS
					},
				],
			},
		]
	}
}
