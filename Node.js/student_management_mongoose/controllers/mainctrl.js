const Student = require("../model/Student.js");
const formidable = require('formidable');
const url = require("url");

exports.showIndex = (req, res) => {
    Student.find({}, (err, students) => {
        res.render("index", {
            "dictionary": students,
        })
    })
}
// 显示增加学生的表单
exports.showAdd = (req, res) => {
    res.render("add");
}
// 往数据库中增加数据
exports.doAdd = (req, res) => {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {
        // fields是obj类型
        // console.log(fields);
        Student.add(fields, (info) => {
            // 只能返回字符串
            res.json({ "result": info });
        })
    });
}
// 更改数据
exports.doUpdate = (req, res) => {
    var sid = req.params.sid;
    if (!sid) {
        return;
    }
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {
        // 根据sid找到文档
        Student.find({ "sid": sid }, (err, results) => {
            if (results.length == 0) {
                res.json({ "result": -1 });
                return;
            }
            // find返回的是数组
            var stu = results[0];

            //更改属性
            stu.sname = fields.sname;
            stu.age = fields.age;
            stu.sex = fields.sex;
            stu.addre = fields.address;

            //每次改都要save一下，数据持久化
            stu.save((err) => {
                if (err) {
                    res.json({ "result": -1 });
                } else {
                    res.json({ "result": 1 });
                }
            });
        });
    });
}

//检查学号是否被占用
exports.check = (req, res) => {
    var sid = req.params.sid;

    Student.checkSid(sid, function (isExis) {
        res.json({ "result": isExis });
    });
}

//删除
exports.delete = (req, res) => {
    var sid = req.params.sid;
    console.log(sid)
    Student.find({ "sid": sid }, (err, results) => {
        // 没有找到或者出现错误
        if (err || results.length === 0) {
            res.json({ "results": -1 });
            return;
        }

        results[0].remove((err) => {
            if (err) {
                res.json({ "results": -1 });
                return
            }

            res.json({ "results": 1 });
        });
    });
}
// 显示更改页面
exports.showUpdate = (req, res) => {
    var sid = req.params.sid;
    Student.find({ "sid": sid }, (err, results) => {
        // 没有找到或者出现错误
        if (err || results.length === 0) {
            res.json({ "results": -1 });
            return;
        }

        var result = results[0];
        res.render("update", {
            "result": result,
        });
    });
}

//分页导航接口，得到所有的学生
exports.getAll = (req, res) => {
    //page参数,第几页
    var page = url.parse(req.url, true).query.page - 1 || 0;
    var pagesize = 10;
    //条目总数
    Student.count({}, function (err, count) {
        // 分页逻辑：跳过（skip）多少条，读取（limit）多少条
        Student.find({}).limit(pagesize).skip(pagesize * page).exec( (err, results) => {
            res.json({
                "pageAmount": Math.ceil(count / pagesize),
                "results": results
            });
        });
    });

}
