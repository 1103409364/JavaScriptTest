const express = require("express");

const app = express();
// 数据，正常情况是从数据库读的
var _data = {
	"n": 10
}

var _dataInit = {
	"n": 5
}

//代码顺序执行的，要先设置响应头，允许跨域
app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
// 数据接口
app.get("/getData", (req, res) => {
	res.send(_data);
})
// 默认数据接口
app.get("/getInit", (req, res) => {
	res.send(_dataInit);
})

// app.use(express.static("./www")); 在webpack-dev中配置
app.listen(3000, console.log("Server listening on port 3000"));