var express = require("express");
var fs = require("fs");

var app = express();
//静态化
app.use(express.static("static"));

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

var url = "./api_server/images/Corolla/";
//中间件
app.get("/api", function (req, res) {
    //结构
    var results = {};

    fs.readdir(url, function (err, data) {
        data.forEach((color) => {
            results[color] = {};

            var data2 = fs.readdirSync(url + color);

            data2.forEach((album) => {
                var data3 = fs.readdirSync(url + color + "/" + album);
                results[color][album] = data3;
            });
        });

        //输出大json
        res.json({ "results": results });
    });
});

app.listen(3000, console.log("Server listening on port 3000"));