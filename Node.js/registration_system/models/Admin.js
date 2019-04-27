var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
    "adminUsername": String,
    "password": String,
    "isOpen": { type: Boolean, default: false } //系统开放或者关闭
})
// 静态方法,将上传的数据保存到数据库
adminSchema.statics.saveToDB = (adminInfo) => {
    // 每次添加清空数据
    mongoose.connection.collection("admins").drop(() => {
        var ad = new Admin({
            "adminUsername": adminInfo.adminUsername,
            "password": adminInfo.password,
            "isOpen": adminInfo.isOpen,
        });
        ad.save();
    })
}

var Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

