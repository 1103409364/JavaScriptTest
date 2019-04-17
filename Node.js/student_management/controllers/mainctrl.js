const db = require("../model/db.js");

exports.showIndex = (req, res) => {
    db.getAllStudent((arr) => {
        res.render("index", {
            "dictionary": arr
        })
        // res.send(arr)
    })

}
// 给Ajax的接口
exports.allStudent = (req, res) => {
    db.getAllStudent((arr) => {
        // 返回数据
        res.json({"result": arr})
    })
}