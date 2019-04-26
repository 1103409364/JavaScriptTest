var mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost/registration_system', { useNewUrlParser: true });

var courseSchema = new mongoose.Schema({
    "cid": Number, //按照数值排序，这里需要为Number类型
    "name": String,
    "time": String,
    "number": Number,
    "permitGrade": String,
    "teacher": String,
    "introduction": String,
    "students": [String],
})
// 静态方法,将上传的数据保存到数据库
courseSchema.statics.saveToDB = (courseArr) => {
    // 每次导入时都清空数据
    mongoose.connection.collection("courses").drop(() => {
        // 数据结构:
        // [   
        //     name: 子表名，默认sheet1
        //     data:[[表头...], [1, 心理学, 周一, 30]...]
        // ]   
        for (var c = 0; c < courseArr.length; c++) {
            for (var i = 1; i < courseArr[c].data.length; i++) {
                var cou = new Course({
                    "cid": courseArr[c].data[i][0],
                    "name": courseArr[c].data[i][1],
                    "time": courseArr[c].data[i][2],
                    "number": courseArr[c].data[i][3],
                    "permitGrade": courseArr[c].data[i][4],
                    "teacher": courseArr[c].data[i][5],
                    "introduction": courseArr[c].data[i][6],
                });
                cou.save();
            }
        }
    })
}

var Course = mongoose.model("Course", courseSchema);

module.exports = Course;

