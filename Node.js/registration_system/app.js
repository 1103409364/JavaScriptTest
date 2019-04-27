var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var adminctrl = require('./controllers/adminctrl');
var stuctrl = require('./controllers/stuctrl');

var app = express();
// 链接数据库registration_system
mongoose.connect('mongodb://localhost/registration_system', { useNewUrlParser: true });
//session用于登陆
app.use(session({
    secret: 'registrationSystem',
    cookie: { maxAge: 3600000 }, //登陆过期时间
    resave: false,
    saveUninitialized: true
}));
// 设置模板引擎
app.set('view engine', "ejs");

// 添加管理员账号接口
app.get   ('/addadmin'             , adminctrl.showAddAdmin);
app.post  ('/addadmin'             , adminctrl.doAddAdmin);

// 首页接口
app.get   ('/admin'                , adminctrl.showAdmin);
// 提供报表数据
app.post  ('/admin'                , adminctrl.doShowAdmin);
// 登陆
app.get   ('/admin/login'          , adminctrl.showAdminLogin);
// 登陆验证
app.post  ('/admin/login'          , adminctrl.doLogin);
// 退出登陆状态
app.get   ('/admin/logout'         , adminctrl.doLogout);
// 学生管理页面
app.get   ("/admin/student"        , adminctrl.showStudent);
// 获得学生数据,根据请求参数进行CURD
app.post  ("/admin/student"        , adminctrl.doShowStudent);
// 显示上传学生名单页面
app.get   ("/admin/student/import" , adminctrl.showStudentImport);
// 上传学生Excel文件导入数据库
app.post  ("/admin/student/import" , adminctrl.doStudentImport);
// 课程管理
app.get   ("/admin/course"         , adminctrl.showCourse);
// 获得课程数据,根据请求参数进行CURD
app.post  ("/admin/course"         , adminctrl.doShowCourse);
// 显示上传课程清单页面
app.get   ("/admin/course/import"  , adminctrl.showCourseImport);
// 上传课程Excel文件导入数据库
app.post  ("/admin/course/import"  , adminctrl.doCourseImport);
//报表页面
app.get   ("/admin/charts"         , adminctrl.showCharts);
// 报表数据
// app.post   ("/admin/charts"         , adminctrl.doshowCharts);
// 开放系统
app.get   ("/admin/onSys"          , adminctrl.onSys);
// 关闭系统
app.get   ("/admin/offSys"         , adminctrl.offSys);


// 学生登陆报名
// 首页，所有课程和已报课程共用接口
app.get   ('/'                     , stuctrl.showAllCourse);
// 获得课程数据
app.post  ('/'                     , stuctrl.doShowAllCourse);
// 登陆页
app.get   ('/student/login'        , stuctrl.showStudentLogin);
// 登陆验证
app.post  ('/student/login'        , stuctrl.doLogin);
// 更改密码页面
app.get   ('/student/changePwd'    , stuctrl.showchangePwd);
// 更改密码
app.post  ('/student/changePwd'    , stuctrl.doChangePwd);
// 已选课程页面
app.get   ('/student/myCourse'     , stuctrl.showMyCourse);
app.post  ('/student/myCourse'     , stuctrl.doShowMyCourse);
// 学生退出登陆
app.get   ('/student/logout'       , stuctrl.doLogout);
// 报名接口
app.post   ('/student/register'     , stuctrl.doRegister);
// 退报接口
app.post   ('/student/cancel'       , stuctrl.doCancelRegister);

// 静态文件
app.use(express.static('public'));
// 从上往下拦截,都没有匹配的项,最后到404
app.use(adminctrl.show404);

app.listen(3000);
console.log('服务器已运行,端口:3000')