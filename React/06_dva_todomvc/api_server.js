var express = require("express");
var app = express();

//代码顺序执行的，要先设置响应头，允许跨域请求
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get("/api", (req, res) => {
    res.json({ "result": 8 });
});

app.use(express.static("www"));

app.listen(3000);