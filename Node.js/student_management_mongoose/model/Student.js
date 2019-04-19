const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/SMS', { useNewUrlParser: true });

const studentSchema = new mongoose.Schema({
    sid: Number,
    sname: String,
    sex: String,
    address: String,
    age: Number,
});
// 静态方法，往数据库中增加学生
studentSchema.statics.add = (json, callback) => {
    Student.checkSid(json.sid, (isExis) => {
        if (!isExis) {
            var stu = new Student(json);

            stu.save((err) => {
                if (err) {
                    res.send("-1");
                    return;
                }
                // 保存成功
                callback("1");
            });
        } else {
            // 重复了，返回错误码-2
            callback("-2");
        }
    })
}
// 验证sid是否重复
studentSchema.statics.checkSid = (sid, callback) => {
    Student.find({ "sid": sid }, (err, results) => {
        var isExis = results.length != 0;
        callback(isExis);
    })
}
// 暴露
var Student = mongoose.model('Student', studentSchema);
module.exports = Student;
//实例化对象，单元测试
// const xiaoming = new Student({ sid: 1112, sname: '小名', sex: "男", age: 102 , address: "广东"});
// xiaoming.save().then(() => console.log('我是小明，我被保存到数据库了'));
