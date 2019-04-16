const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); //断言
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'student';
// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });
//暴露得到所有数据的方法
exports.getAllStudent = (callback) => {
    // Use connect method to connect to the Server选择一个集合班级 class1
    client.connect(function (err, client) {
        if(err) {
            console.log("连接数据库失败,请检查是否运行了mongod");
            return;
        }
        console.log("连接成功");
        const db = client.db(dbName);
        const col = db.collection('class1');
        //检索所有学生
        col.find({}).toArray(function (err, arr) {
            if (err) {
                console.log(err);
                return;
            }
            callback(arr);
            // 关闭数据库
            client.close();
        });
    });
}

// 单元测试
// getAllStudent(function(arr) {
//     console.log(arr);
// })
