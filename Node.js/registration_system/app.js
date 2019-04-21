var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var ctrl = require('./controllers/ctrl');

var app = express();
// 链接数据库registrationSystem
mongoose.connect('mongodb://localhost/registrationSystem', { useNewUrlParser: true });
//使用session
app.use(session({
    secret: 'registrationSystem',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
}));
// 设置模板引擎
app.set('view engine', "ejs");

// 首页接口
app.get('/admin', ctrl.showIndex);
// 学生管理页面
app.get("/admin/student"        , ctrl.showStudent);
// 上传文件
app.get("/admin/student/import" , ctrl.showStudentImport);

app.post("/admin/student/import", ctrl.studentImport);
// 课程管理
app.get("/admin/course"         , ctrl.showCourse);
//报表
app.get("/admin/charts"         , ctrl.showCharts);

// 静态文件
app.use(express.static('public'));
// 从上往下拦截,都没有匹配的项,最后到404
app.use(ctrl.show404);

app.listen(3000);
console.log('服务器已运行,端口:3000')