// 引入内置模块fs
const fs = require("fs");

// 传统回调的方式处理异步
// fs.readFile("./data/data2.json", (err, data) => {
// 	console.log("data2:", data.toString());
// 	fs.readFile("./data/data1.json", (err, data) => {
// 		console.log("data1:", data.toString());
// 	})
// });

const readJson = (url) => {
	return new Promise((resolve, reject) => {
		fs.readFile(url, (err, data) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(data);
		})
	})
}

var url1 = "./data/data1.json";
var url2 = "./data/data2.json";

readJson(url1)
	.then((data) => {
		console.log("data1:", data.toString());
		return readJson(url2);
	})
	.then((data) => {
		console.log("data2:", data.toString());
	})
