// 通过className得到元素，兼容ie写法
function mgetElemsByClassName(className) {
    var arr = [];
    //先得到这个元素的所有后代元素
    var elems = document.getElementsByTagName("*");
    //正则，匹配className，看看是否含有这个独立的字符串，（前后空格）
    var reg = new RegExp("(^" + className + " | " + className + " | " + className + "$|^" + className + "$)", "g");
    //遍历所有的后代，找到包含className的元素
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].nodeType == 1 && reg.test(elems[i].className) == true) {
            arr.push(elems[i]);
        }
    }
    //返回的数组。即使只有一个结果，也返回的是数组
    return arr;
}
