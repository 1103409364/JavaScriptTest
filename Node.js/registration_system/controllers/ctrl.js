const formidable = require("formidable");
const xlsx = require("node-xlsx");
const path = require("path");
const fs = require("fs");
const format = require('date-format');
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
        if (fields.oper === "del") {
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
        if (fields.oper === "edit") {
            // 检查学号是否重复
            Student.find({ "sid": fields.sid }, (err, results) => {
                if (results.length === 1) {
                    fields.sid = "学号：" + fields.sid + "被占用，err：" + Math.random();
                }

                Student.updateOne({ "sid": fields.id }, { "sid": fields.sid, "name": fields.name, "sex": fields.sex, "grade": fields.grade, "password.pwd": fields['password.pwd'], "password.isInitial": fields['password.isInitial'] }, { multi: true }, (err, info) => {
                    if (err) {
                        res.send("修改失败");
                        return;
                    }
                    console.log(info);
                })
            })

        }

        // 增加，姓名和学号必填
        if (fields.oper === "add" && fields.name != "" && fields.sid != "") {
            // 检查学号是否重复
            Student.find({ "sid": fields.sid }, (err, results) => {
                if (results.length > 0) {
                    fields.sid += "学号重复请修改" + (parseInt(Math.random() * 100));
                }

                Student.create({ "sid": fields.sid, "name": fields.name, "sex": fields.sex, "grade": fields.grade, "password.pwd": fields['password.pwd'], "password.isInitial": fields['password.isInitial'] }, (err, info) => {
                    if (err) {
                        res.send("添加失败");
                        return;
                    }
                    console.log(fields);
                });
            })
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
            // 导出Excel
            if (fields.oper === "download") {
                var TableR = [];
                var gradeArr = ["初一", "初二", "初三", "高一", "高二", "高三"];
                //迭代器！强行把异步函数变为同步的！当读取完毕初一的时候，才去读取初二……
                //i为0、1、2、3、4、5，表示读取初一、初二……高三的信息
                function iterator(i) {
                    if (i == 6) {
                        //此时TableR中已经是6个年级的大数组了！
                        var buffer = xlsx.build(TableR);
                        //生成文件
                        var dateStr =format.asString("yyyy-MM-dd-hh-mm-ss.SSS", new Date());
                        var filePath = "/download/学生名单" + dateStr + ".xlsx";
                        fs.writeFile("./public"+ filePath, buffer, (err) => {
                            if(err) {
                                res.send("文件写入失败");
                            }
                            console.log("ok");
                       
                            res.send(filePath);
                        });
                    }
                    //整理数据
                    Student.find({ "grade": gradeArr[i] }, (err, results) => {
                        // sheetR子表，每个子表表示一个年级，补一个表头
                        var sheetR = [["学号", "姓名", "年级", "性别", "密码", "是初始密码？"]];
                        results.forEach( (item) => {
                            sheetR.push([
                                item.sid,
                                item.name,
                                item.grade,
                                item.sex,
                                item.password.pwd,
                                item.password.isInitial
                            ]);
                        });
                        // name年级，data对应年级的数据
                        TableR.push({ "name": gradeArr[i], data: sheetR });

                        iterator(++i);
                    });
                }

                iterator(0);
            } else {
                // 分页
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
            }
        });
    });
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
        // 检查文件，如果是空文件或者其他格式文件，提醒用户重新上传studentExcel，文件提交控件的name属性studentExcel
        // console.log(files.studentExcel.path);
        if (files.studentExcel.size === 0 || path.extname(files.studentExcel.path) != ".xlsx") {
            //删除文件
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
        // 检查表格表头是否正确
        var sidArr = [];
        for (var grade = 0; grade < stuArr.length; grade++) {
            if (stuArr[grade].data[0][0] != "学号" || stuArr[grade].data[0][1] != "姓名" || stuArr[grade].data[0][2] != "性别") {
                //删除文件
                fs.unlink("./" + files.studentExcel.path, function (err) {
                    if (err) {
                        console.log("删除文件错误");
                        return;
                    }
                    res.send("Excel文件的数据格式不正确，请检查后重新上传，表头应为“学号、姓名、性别”");
                });
                return;
            }

            for (var i = 1; i < stuArr[grade].data.length; i++) {
                // 数据库中学号以字符串类型储存，转为字符串后查重
                sidArr.push(stuArr[grade].data[i][0].toString());
            }
        }
        // console.log(sidArr);
        // 学号查重，另一种思路先去重然后比较长度，比如用set
        for (var j = 0; j < sidArr.length; j++) {
            for (var k = j + 1; k < sidArr.length; k++) {
                if (sidArr[j] == sidArr[k]) {
                    // console.log(j, k);
                    //删除文件
                    fs.unlink("./" + files.studentExcel.path, function (err) {
                        if (err) {
                            console.log("删除文件错误");
                            return;
                        }
                        res.send("学号有重复的项，请检查后重新上传");
                    });
                    return;
                }
            }
        }

        // 保存到数据库
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
