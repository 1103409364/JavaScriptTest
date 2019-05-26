/*
* 获得计算后样式，兼容性写法
* property css属性
*/
(function () {
    // 暴露全局变量
    window.getStyle = function(elem, property) {
        //能力检测
        if (window.getComputedStyle) {
            // 把驼峰转为 xx-xxx 的形式
            property = property.replace(/([A-Z])/g, function (match, $1) {
                return "-" + $1.toLowerCase();
            });
            return window.getComputedStyle(elem)[property];
        } else {
            // 把 xx-xxx 转为驼峰
            property = property.replace(/\-([a-z])/g, function (match, $1) {
                return $1.toUpperCase();
            });
            return elem.currentStyle[property];
        }
    }
})()