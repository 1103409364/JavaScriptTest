const formidable = require("formidable");
const xlsx = require("node-xlsx");
const path = require("path");
const fs = require("fs");
const Student = require("../models/Student.js");


exports.showIndex = (req, res) => {
    res.render("admin/index", { "current": "index" });
}

exports.showStudent = (req, res) => {
    res.render("admin/student", { "current": "student" });
}
// 显示学生列表
// 请求参数：排序主键sid、当前页条数rows、页码page、排序方式
// 页面载入和换页都会发起请求，就是后端分页
exports.doShowStudent = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        // 从前端请求中拿到参数
        var rows = parseInt(fields.rows); //限制行数
        var page = fields.page; //当前页
        var sortobj = {};
        sortobj[fields.sidx] = fields.sord; //排序方式
        // 删除：根据sid删除 
        if (fields.oper === "del" && fields.id !== "") {
            var idArr = fields.id.split(",");

            idArr.forEach((id) => {
                Student.deleteOne({ "sid": id }, (err, info) => {
                    if (err) {
                        res.send("删除失败");
                        return;
                    }
                    // 删除结果
                    // console.log(info);
                })
            })
        }
        // 修改：根据姓名修改
        if (fields.oper === "edit" && fields.name !== "") {

            Student.updateOne({ "name": fields.name }, { "sid": fields.sid, "name": fields.name, "sex": fields.sex, "grade": fields.grade, "password.pwd": fields['password.pwd'], "password.isInitial": fields['password.isInitial'] }, { multi: true }, (err, info) => {
                if (err) {
                    res.send("修改失败");
                    return;
                }
                console.log(info);
            })
        }

        // 增加，姓名和学号必填
        if (fields.oper === "add" && fields.name && fields.sid != "") {
            Student.create({ "sid": fields.sid, "name": fields.name, "sex": fields.sex, "grade": fields.grade, "password.pwd": fields['password.pwd'], "password.isInitial": fields['password.isInitial'] }, (err, info) => {
                if (err) {
                    res.send("添加失败");
                    return;
                }
                console.log(fields);
            });
        }
        // 查询
        var searchObj = {};// 查询条件
        if (fields._search === "true") {
            var searchField = fields.searchField;
            var searchString = fields.searchString;
            // 用正则做模糊查询
            var reg = new RegExp(searchString, "g");
            searchObj[searchField] = reg;
        }
        Student.countDocuments(searchObj, function (err, count) {
            var totalpages = Math.ceil(count / rows); //总页数

            Student.find(searchObj).sort(sortobj).limit(rows).skip(rows * (page - 1)).exec((err, results) => {
                
                // 返回数据格式
                // console.log(results[0])
                res.json({
                    "totalpages": totalpages,
                    "currpage": page,
                    "totalrecords": count,
                    "rows": results,
                    "id": "sid",
                    "cell": ["sid", "name", "sex", "grade", "password.pwd", "password.isInitial"]
                });
            });
        })
    })
}

exports.showStudentImport = (req, res) => {
    res.render("admin/stuImport", { "current": "student" });
}
// 上传文件，导入学生名单
exports.doStudentImport = (req, res) => {
    var form = new formidable.IncomingForm();
    // 指定上传文件夹
    form.uploadDir = "./uploads";
    //保留文件后缀
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        // 检查文件，如果是空文件或者其他格式文件，提醒用户重新上传studentExcel，文件提交控件的name属性
        if (files.studentExcel.size === 0 || path.extname(files.studentExcel.path) != ".xlsx") {
            //删除
            fs.unlink("./" + files.studentExcel.path, function (err) {
                if (err) {
                    console.log("删除文件错误");
                    return;
                }
                res.send("文件无效，请重新上传");
            });
            return;
        }

        if (err) {
            res.send("上传失败，请重新上传");
        }
        // 读取excel表格，转为数组，length表示子表格数量
        var stuArr = xlsx.parse("./" + files.studentExcel.path);
        Student.saveToDB(stuArr);
        // console.log(arr, arr[0]);
        res.send("上传成功，返回学生列表即可查看")
    });
}

exports.showCourse = (req, res) => {
    res.render("admin/course", { "current": "course" });
}

exports.showCharts = (req, res) => {
    res.render("admin/charts", { "current": "charts" });
}

exports.show404 = (req, res) => {
    res.render("admin/404", { "current": "404" });
}
