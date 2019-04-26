const formidable = require("formidable");  //处理post请求
const format = require('date-format'); //格式化日期
const crypto = require("crypto"); //用来加密密码

const Student = require("../models/Student.js");
const Course = require("../models/Course.js");

// 显示管理员登陆页面
exports.showStudentLogin = (req, res) => {
    res.render("stu/stuLogin");
}

// 登陆验证
exports.doLogin = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        var username = fields.username;
        var password = fields.password;
        var sha256Pwd = crypto.createHash("sha256").update(password).digest("hex");

        Student.find({ "sid": username }, (err, results) => {
            if (results.length === 0) {
                res.send("用户不存在，请返回重新登陆");
            } else {
                // 检查是不是初始密码
                if (results[0].password.isInitinal === "是") {
                    if (results[0].password.pwd === password) {
                        // 跳转到修改密码页面
                        res.redirect("/student/changePwd");
                    } else {
                        res.send("密码错误，请返回重新登陆");
                    }
                } else if (results[0].password.pwd === sha256Pwd){  // 不是初始密码，同时密码正确，登陆成功
                    // 下发session
                    req.session.adminLogin = true;
                    // 记录用户名，可以用户页面显示
                    req.session.adminUsername = adminUsername;
                    res.redirect("/")
                    // res.send("密码错误，请返回重新登陆");
                    // res.redirect("/admin/login");
                }
            }
        })
    });
}
// 更改密码页面
exports.showchangePwd = (req, res) => {
    res.render("stu/showchangePwd");
}