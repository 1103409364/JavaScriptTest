const path = require('path');
module.exports = {
	mode: "development", // "production" | "development" | "none"
	entry: "./app/app", // string | object | array // 这里应用程序开始执行
	output: {
		// webpack 如何输出结果的相关选项
		path: path.resolve(__dirname, "dist"), // string
		// 所有输出文件的目标路径
		// 必须是绝对路径（使用 Node.js 的 path 模块）
		filename: "bundle.js", // string"[name].js",  for multiple entry points
	},
	watch: true, //监听

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
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
