var express = require("express");
var fs = require("fs");

var app = express();
const port = 3000;
const hostname = "http://localhost:"
//静态化
app.use(express.static("api_server"));
// 允许跨域
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 图片文件URL
var url = "./api_server/images/Corolla/";
//中间件
app.get("/api", function (req, res) {
    //读取图片文件，生成图片的绝对地址
    let results = {};

    fs.readdir(url, function (err, data) {
        data.forEach((color) => {
            results[color] = {};
            let colorurl = "/images/Corolla/" + color + "/";

            var data2 = fs.readdirSync(url + color);
            data2.forEach((album) => {
                let albumurl = colorurl + album + "/";
                results[color][album] = [];
                var data3 = fs.readdirSync(url + color + "/" + album);
                data3.forEach((imgname) => {
                    results[color][album].push(hostname + port + albumurl + imgname);
                })
            });
        });

        //输出大json
        res.json({ "results": results });
    });
});

app.listen(port, console.log("Server listening on port 3000"));