const formidable = require("formidable");  //处理post请求
const format = require('date-format'); //格式化日期
const crypto = require("crypto"); //用来加密密码

const Student = require("../models/Student.js");
const Course = require("../models/Course.js");