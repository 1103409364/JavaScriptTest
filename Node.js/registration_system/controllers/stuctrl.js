const formidable = require("formidable");  //处理post请求
const format = require('date-format'); //格式化日期
const crypto = require("crypto"); //用来加密密码

const Student = require("../models/Student.js");
const Course = require("../models/Course.js");
const Admin = require("../models/Admin.js");

// 显示所有课程页面
exports.showAllCoerce = (req, res) => {
    if(req.session.stuLogin !== true) {
        res.redirect("/student/login");
        return;
    }
    res.render("stu/index", {
        "sid": req.session.username,
        "name": req.session.name,
        "current": "index",
    });
}
// 取课程数据返回
exports.doShowAllCoerce = (req, res) => {
    var data = {};
    // 检查是否在登陆状态
    if(req.session.stuLogin === true) {
        Course.find({}, (err, docs) => {
            if(err) {
                console.log(err);
                data.result = -1;
                res.json(data);
                return;
            } 
            data.courses = docs;
            Admin.find({}, (err, docs) => {
                if(err) {
                    data.result = -1;
                    res.json(data);
                    return;
                }
                data.isOpen = docs[0].isOpen;
                data.result = 1; //成功返回1，出错返回-1
                res.json(data);
            })
        })
    } else {
        res.redirect("/student/login");
    }
}

// 显示我的课程页面
exports.showMyCoerce = (req, res) => {
    if(req.session.stuLogin !== true) {
        res.redirect("/student/login");
        return;
    }
    res.render("stu/myCourse", {
        "sid": req.session.username,
        "name": req.session.name,
        "current": "myCourse",
    });
}
// 获取我的课程数据
exports.doShowMyCoerce = (req, res) => {
    if(req.session === true) {
        Student.find({"sid": req.username}, (err, docs) => {
            if(err) {
                console.log(err);
                res.json({"result": -1});
            } else {
                // 找到根据我的课程数组，找到课程发回
            }
        })
    } else {
        res.redirect("/student/login");
    }
}

// 显示学生登陆页面
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
                if (results[0].password.isInitial === "是") {
                    // 验证密码
                    if (results[0].password.pwd === password) {
                        // 初始密码正确，下发session，跳转到修改密码页面
                        req.session.stuLogin = true;
                        // 记录用户名（学号），姓名，在用户页面显示
                        req.session.username = username;
                        req.session.name = results[0].name;
                        res.redirect("/student/changePwd");
                    } else {
                        res.send("密码错误，请返回重新登陆");
                    }
                } else if (results[0].password.pwd === sha256Pwd){
                    // 不是初始密码，同时密码正确，登陆成功
                    // 下发session
                    req.session.stuLogin = true;
                   // 记录用户名（学号），姓名
                    req.session.username = username;
                    req.session.name = results[0].name;
                    // 跳转到首页
                    res.redirect("/");
                }
            }
        })
    });
}
// 更改密码页面
exports.showchangePwd = (req, res) => {
    // 如果不在登陆状态，就跳转到登陆页面
    if(req.session.stuLogin !== true) {
        res.redirect("/student/login");
        return;
    }
    res.render("stu/changePwd");
}
// 更改密码
exports.doChangePwd = (req, res) => {
    if(req.session.stuLogin === true) {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields) => {
            var newPassword = fields.newPassword;
            var sha256Pwd = crypto.createHash("sha256").update(newPassword).digest("hex");
            var username = req.session.username;
            Student.updateOne({"sid": username}, {"password": {"pwd": sha256Pwd, "isInitial": "否"}}, (err, docs) => {
                if(err) {
                    console.log(err);
                    res.json({"result": -1})
                }
                console.log("更改成功");
                res.json({"result": 1})
            })
        })
    } else {
        res.redirect("/student/login");
    }
}

// 退出登陆
exports.doLogout = (req, res) => {
    req.session.stuLogin = false;
    res.redirect("/student/login");
    console.log("学生退出登陆");
}