const express = require("express");

const app = express();

var _data = {
	"id": "1",
	"name": "小明",
	"sex": "男",
	"age": "23"
}


//代码顺序执行的，要先设置响应头，允许跨域
// app.all('*', (req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
// 	res.header("X-Powered-By", ' 3.2.1')
// 	res.header("Content-Type", "application/json;charset=utf-8");
// 	next();
// });

app.get("/getData", (req, res) => {
	// 允许跨域请求
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");

	res.send(_data);
})




// app.use(express.static("./www")); 在webpack-dev中配置
app.listen(3000, console.log("Server listening on port 3000"));