// 获得元素在整个页面中的位置
// 计算方法：累加所有offsetParent的offsetTop
function getAllTop(elem) {
    // 累加器，累加器的初始值不是0，而是自己现在offsetTop值
    var top = elem.offsetTop;
    var currentElem = elem;
    while (currentElem = currentElem.offsetParent) {
        top += currentElem.offsetTop;
    }
    return top;
}

function getAllLeft(elem) {
    var left = elem.offsetLeft;
    var currentElem = elem;
    while (currentElem = currentElem.offsetParent) {
        left += currentElem.offsetLeft;
    }
    return left;
}