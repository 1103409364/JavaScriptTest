const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ctrl = require("./controllers/mainctrl.js");

mongoose.connect('mongodb://localhost:27017/SMS', { useNewUrlParser: true });

app.set("view engine", "ejs");

// 显示首页
app.get     (              "/", ctrl.showIndex );
// 显示增加表单
app.get     (   "/student/add", ctrl.showAdd   );
// 增加学生的接口
app.post    (   "/student/add", ctrl.doAdd     );
//Ajax接口检查学号是否被占用
app.propfind(  '/student/:sid', ctrl.check     );
// 删除接口
app.delete  (  '/student/:sid', ctrl.delete    );
//显示更改页
app.get     (  '/student/:sid', ctrl.showUpdate);		
//更改学生信息的接口
app.post    (  '/student/:sid', ctrl.doUpdate  );
//分页导航接口，得到所有的学生
app.get     (       '/student', ctrl.getAll    );	
// 静态化public文件夹
app.use(express.static("public"));
app.listen(3000);