const express = require("express");
const fs = require("fs");
const port = 3000;

const app = express();

var url1 = "./data/data1.json";
var url2 = "./data/data2.json";
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

// data1接口
app.get("/data1", (req, res) => {
	readJson(url1)
		.then((data) =>{
			res.json(JSON.parse(data));
		})

})
// data2接口
app.get("/data2", (req, res) => {
	readJson(url2)
		.then((data) => {
			res.json(JSON.parse(data));
		})

})


// 静态化
app.use(express.static("./www"));
app.listen(port, console.log(`The server is running on port ${port}`));