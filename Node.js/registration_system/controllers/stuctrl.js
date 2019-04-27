const formidable = require("formidable");  //处理post请求
const format = require('date-format'); //格式化日期
const crypto = require("crypto"); //用来加密密码

const Student = require("../models/Student.js");
const Course = require("../models/Course.js");
const Admin = require("../models/Admin.js");

// 显示所有课程页面
exports.showAllCourse = (req, res) => {
    if (req.session.stuLogin !== true) {
        res.redirect("/student/login");
        return;
    }
    res.render("stu/index", {
        "sid": req.session.sid,
        "name": req.session.name,
        "grade": req.session.grade,
        "current": "index",
    });
}
// 获取取课程数据
exports.doShowAllCourse = (req, res) => {
    var data = {};
    // 检查是否在登陆状态
    if (req.session.stuLogin === true) {
        // 检查所有课程，看看当前学生能不能报名，需要考虑的情况：
        // 选课数量上限2
        // 课程余量>=0
        // 允许报名年级限制
        // 课程是否已经报过
        // 上课时间冲突，一天只能选一门
        // 系统是否开放

        // 查找当前登录用户
        Student.find({ "sid": req.session.sid }, (err, stus) => {
            if (err) {
                console.log(err);
                data.result = -1;
                res.json(data);
                return;
            }
            var thisStu = stus[0];
            // 已报课程
            var myCourse = thisStu.myCourse;
            // 年级
            var grade = thisStu.grade;
            // 存放周几被占用
            var occupyDay = [];
            // 检查结果，保存在数组中，最后放进data一起发回
            var checkResult = {};
           
            Course.find({}, (err, cos) => {
                if (err) {
                    console.log(err);
                    data.result = -1;
                    res.json(data);
                    return;
                }
                data.courses = cos;
                // 遍历所有课程，找到周几被占用
                cos.forEach((item) => {
                    // myCourse存放登陆用户的已报课程
                    if (myCourse.indexOf(item.cid) !== -1) {
                        occupyDay.push(item.time);
                    }
                });
                // 再次遍历所有课程
                cos.forEach((item) => {
                    // 检查是否已经报名
                    if (myCourse.indexOf(item.cid) !== -1) {
                        // 在当前课程加上检查结果，以课程编号为索引，保存查询结果
                        checkResult[item.cid] = "已报名";
                    } else if (occupyDay.indexOf(item.time) !== -1) {
                        checkResult[item.cid] = item.time + "被占用";
                    } else if (item.number === 0) {
                        checkResult[item.cid] = "课程名额不足";
                    } else if (item.permitGrade.indexOf(grade) === -1) {
                        checkResult[item.cid] = grade + "不可报";
                    } else if (myCourse.length === 2) {
                        checkResult[item.cid] = "已报2门";
                    } else {
                        checkResult[item.cid] = "可以报名";
                    }
                });

                // 检查系统是否开放报名
                Admin.find({}, (err, docs) => {
                    if (err) {
                        data.result = -1;
                        res.json(data);
                        return;
                    }
                    data.isOpen = docs[0].isOpen;
                    data.checkResult = checkResult;
                    data.result = 1; //成功返回1，出错返回-1
                    res.json(data);
                })
            })
        })
    } else {
        res.redirect("/student/login"); //不在登陆状态
    }
}

// 显示我的课程页面
exports.showMyCourse = (req, res) => {
    if (req.session.stuLogin !== true) {
        res.redirect("/student/login");
        return;
    }
    res.render("stu/myCourse", {
        "sid": req.session.sid,
        "name": req.session.name,
        "grade": req.session.grade,
        "current": "myCourse",
    });
}
// 获取我的课程数据
exports.doShowMyCourse = (req, res) => {
    if (req.session === true) {
        Student.find({ "sid": req.session.sid }, (err, docs) => {
            if (err) {
                console.log(err);
                res.json({ "result": -1 });
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
        var sid = fields.username;
        var password = fields.password;
        var sha256Pwd = crypto.createHash("sha256").update(password).digest("hex");

        Student.find({ "sid": sid }, (err, results) => {
            if (results.length === 0) {
                res.send("用户不存在，请返回重新登陆");
            } else {
                // 检查是不是初始密码
                if (results[0].password.isInitial === "是") {
                    // 验证密码
                    if (results[0].password.pwd === password) {
                        // 初始密码正确，下发session，跳转到修改密码页面
                        req.session.stuLogin = true;
                        // 记录用户名（学号），姓名，年级，在用户页面显示
                        req.session.sid = sid;
                        req.session.name = results[0].name;
                        req.session.grade = results[0].grade;
                        res.redirect("/student/changePwd");
                    } else {
                        res.send("密码错误，请返回重新登陆");
                    }
                } else if (results[0].password.pwd === sha256Pwd) {
                    // 不是初始密码，同时密码正确，登陆成功
                    // 下发session
                    req.session.stuLogin = true;
                    // 记录用户名（学号），姓名
                    req.session.sid = sid;
                    req.session.name = results[0].name;
                    req.session.grade = results[0].grade;
                    // 跳转到首页
                    res.redirect("/");
                } else {
                    res.send("密码错误，请返回重新登陆");
                }
            }
        })
    });
}
// 更改密码页面
exports.showchangePwd = (req, res) => {
    // 如果不在登陆状态，就跳转到登陆页面
    if (req.session.stuLogin !== true) {
        res.redirect("/student/login");
        return;
    }
    res.render("stu/changePwd");
}
// 更改密码
exports.doChangePwd = (req, res) => {
    if (req.session.stuLogin === true) {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields) => {
            var newPassword = fields.newPassword;
            var sha256Pwd = crypto.createHash("sha256").update(newPassword).digest("hex");
            var sid = req.session.sid;
            Student.updateOne({ "sid": sid }, { "password": { "pwd": sha256Pwd, "isInitial": "否" } }, (err, docs) => {
                if (err) {
                    console.log(err);
                    res.json({ "result": -1 })
                }
                console.log("更改成功");
                res.json({ "result": 1 })
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
// 报名
exports.doRegister = (req, res) => {
    if (req.session.stuLogin === true) {
        // 学号
        var sid = req.session.sid;
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields) => {
            if (err) {
                console.log(err);
            }
            // 检查系统是否开放
            Admin.find({}, (err, docs) => {
                if (err) {
                    data.result = -1;
                    res.json(data);
                    return;
                }
                // 未开放报名直接返回失败
                if (!docs[0].isOpen) {
                    res.json({ "result": -1 });
                    return;
                }

                // 课程编号
                var cid = fields.cid;
                // 先检查课程剩余数量，防止两个人同时报，课被抢了，前面27行处可能来不及检查
                Course.find({ "cid": cid }, (err, cos) => {
                    // 课程余额不足
                    if (cos[0].number === 0) {
                        res.json({ "result": -1 });
                        return;
                    }
                    // 保存学号
                    cos[0].students.push(sid);

                    // 课程可报数减1
                    cos[0].number--;
                    // 直接改变属性，保存
                    cos[0].save(() => {
                        Student.find({ "sid": sid }, (err, stus) => {
                            // 保存课程编号
                            stus[0].myCourse.push(cid);
                            stus[0].save(() => {
                                res.json({ "result": 1 });
                            });
                        });
                    })
                })
            })
        });
    } else {
        res.redirect("/student/login");
        return;
    }
}
// 退报
exports.doCancelRegister = (req, res) => {
    if (req.session.stuLogin === true) {
        var sid = req.session.sid;
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields) => {
            if (err) {
                console.log(err);
            }
            // 检查系统是否开放
            Admin.find({}, (err, docs) => {
                if (err) {
                    data.result = -1;
                    res.json(data);
                    return;
                }
                // 未开放直接返回失败
                if (!docs[0].isOpen) {
                    res.json({ "result": -1 });
                    return;
                }

                var cid = fields.cid;
                Student.find({ "sid": sid }, (err, stus) => {
                    var index = stus[0].myCourse.indexOf(cid);
                    // 删除课程编号
                    stus[0].myCourse.splice(index, 1);
                    stus[0].save(() => {
                        Course.find({ "cid": cid }, (err, cos) => {
                            var i = cos[0].students.indexOf(sid);
                            // 删除学号
                            cos[0].students.splice(i, 1);
                            // 课程可报数恢复
                            cos[0].number++;
                            cos[0].save(() => {
                                res.json({ "result": 1 });
                            })
                        })
                    });
                });
            });
        });
    } else {
        res.redirect("/student/login");
        return
    }
}
