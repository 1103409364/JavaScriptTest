var formidable = require("formidable");
var xlsx = require("node-xlsx");
var path = require("path");
var fs = require("fs");

exports.showIndex = (req, res) => {
    res.render("admin/index", { "current": "index" });
}

exports.showStudent = (req, res) => {
    res.render("admin/student", { "current": "student" });
}

exports.showStudentImport = (req, res) => {
    res.render("admin/stuImport", { "current": "student" });
}

exports.studentImport = (req, res) => {
    var form = new formidable.IncomingForm();
    // 指定上传文件夹
    form.uploadDir = "./uploads";
    //保留文件后缀
    form.keepExtensions = true; 
    form.parse(req, (err, fields, files) => {
        // 检查文件，如果是空文件或者其他格式文件，提醒用户重新上传
        if(files.studentexcel.size === 0 || path.extname(files.studentexcel.path) != ".xlsx") {
            //删除这个不正确的文件
    		fs.unlink("./" + files.studentexcel.path,function(err){
    			if(err){
    				console.log("删除文件错误");
    				return;
    			}
    			res.send("请选择有效的excel文件<p><a href='/html/fileform.html'>【返回重新上传】</a></p>");
    		});
            return;
        }

        if(err) {
            res.send("上传失败<p><a href='/html/fileform.html'>【返回重新上传】</a></p>");
        }
        // 读取excel表格，转为数组，length表示子表格数量
        var arr = xlsx.parse("./" + files.studentexcel.path);

        // console.log(arr[0]);
        res.send("上传成功")
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
