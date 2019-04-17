const express = require('express');
const app = express();
const ctrl = require("./controllers/mainctrl.js");

app.set("view engine","ejs");

app.get("/", ctrl.showIndex);
app.get("/allStudent", ctrl.allStudent);

// 静态化public文件夹
app.use(express.static("public"));
app.listen(3000);