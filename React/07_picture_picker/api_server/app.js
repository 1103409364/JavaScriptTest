var express = require("express");
var fs = require("fs");

var app = express();
//静态化
app.use(express.static("static"));
//中间件
app.get("/api", function (req, res) {
	//结构
	var dajson = {};

	fs.readdir("./static/images/Corolla/", function (err, data) {
		data.forEach((color) => {
			dajson[color] = {};

			var data2 = fs.readdirSync("./static/images/Corolla/" + color);

			data2.forEach((album) => {
				var data3 = fs.readdirSync("./static/images/Corolla/" + color + "/" + album);
				dajson[color][album] = data3;
			});
		});

		// 返回json
		res.json({ "results": dajson });
	});
});

app.listen(3000, console.log("Server listening on port 3000"));