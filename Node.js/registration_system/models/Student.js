var mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost/test' , { useNewUrlParser: true });

var studentSchema = new mongoose.Schema({
    "sid": String,
    "name": String,
    "grade": String,
    "sex": String,
    "password": {
        "pwd": String,
        "isInitial": String
    },
    "myCourse": [Number],
    // "occupyDay": [String],//被课程占用的时间
})
// 静态方法,将上传的数据保存到数据库
studentSchema.statics.saveToDB = (stuArr) => {
    // console.log(1);
    // 每次导入清空数据库
    mongoose.connection.collection("students").drop(() => {
        // 一个年级一个子表0-5,数据结构:
        // [{name:"初一", data:[sid, name, sex]},{...},{...}...]
        for (var grade = 0; grade < stuArr.length; grade++) {
            for (var i = 1; i < stuArr[grade].data.length; i++) {
                var stu = new Student({
                    "sid": stuArr[grade].data[i][0],
                    "name": stuArr[grade].data[i][1],
                    "sex": stuArr[grade].data[i][2],
                    "grade": stuArr[grade].name,
                    "password": {
                        // 学号作为初始加密码,登陆后提示改密码
                        "pwd": stuArr[grade].data[i][0],
                        "isInitial": "是"
                    }
                });
                stu.save();
            }
        }
    })
}

var Student = mongoose.model("Student", studentSchema);

module.exports = Student;

