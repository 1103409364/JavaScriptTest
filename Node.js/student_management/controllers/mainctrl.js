const db = require("../model/db.js");
const formidable = require('formidable');

exports.showIndex = (req, res) => {
    db.getAllStudent((arr) => {
        res.render("index", {
            "dictionary": arr
        })
    })
}
// 给Ajax的接口
exports.allStudent = (req, res) => {
    db.getAllStudent((arr) => {
        // 返回数据
        res.json({ "result": arr })
    })
}
// 显示表单
exports.showAdd = (req, res) => {
    res.render("add");
}

exports.doAdd = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        db.save(fields, (info) => {
            // 结束连接，否则浏览器会一直在请求状态挂起
            res.end(info);
        })
        console.log(fields);
    });

}