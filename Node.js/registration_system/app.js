var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var ctrl = require('./controllers/ctrl');

var app = express();
// 链接数据库registration_system
mongoose.connect('mongodb://localhost/registration_system', { useNewUrlParser: true });
//session用于登陆
app.use(session({
    secret: 'registrationSystem',
    cookie: { maxAge: 3600000 }, //在线时长
    resave: false,
    saveUninitialized: true
}));
// 设置模板引擎
app.set('view engine', "ejs");
// 添加管理员账号接口
app.get   ('/addadmin'             , ctrl.showAddAdmin);
app.post  ('/addadmin'             , ctrl.doAddAdmin);

// 首页接口
app.get   ('/admin'                , ctrl.showAdmin);
// 提供报表数据
app.post  ('/admin'                , ctrl.doShowAdmin);
// 登陆
app.get   ('/admin/login'          , ctrl.showAdminLogin);
// 登陆验证
app.post  ('/admin/login'         , ctrl.doLogin);
// 学生管理页面
app.get   ("/admin/student"        , ctrl.showStudent);
// 获得学生数据,根据请求参数进行CURD
app.post  ("/admin/student"        , ctrl.doShowStudent);
// 显示上传学生名单页面
app.get   ("/admin/student/import" , ctrl.showStudentImport);
// 上传学生Excel文件导入数据库
app.post  ("/admin/student/import" , ctrl.doStudentImport);

// 课程管理
app.get   ("/admin/course"         , ctrl.showCourse);
// 获得课程数据,根据请求参数进行CURD
app.post   ("/admin/course"        , ctrl.doShowCourse);
// 显示上传课程清单页面
app.get   ("/admin/course/import"  , ctrl.showCourseImport);
// 上传课程Excel文件导入数据库
app.post   ("/admin/course/import" , ctrl.doCourseImport);

//报表
app.get   ("/admin/charts"         , ctrl.showCharts);

// 静态文件
app.use(express.static('public'));
// 从上往下拦截,都没有匹配的项,最后到404
app.use(ctrl.show404);

app.listen(3000);
console.log('服务器已运行,端口:3000')