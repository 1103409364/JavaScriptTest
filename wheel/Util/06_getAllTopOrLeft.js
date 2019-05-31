// 获得元素在整个页面中的位置
// 计算方法：累加所有offsetParent的offsetTop

let getAllTopOrLeft = {
    getAllTop: function (elem) {
        // 累加器，累加器的初始值不是0，而是自己现在offsetTop值
        let top = elem.offsetTop;
        let currentElem = elem;
        while (currentElem = currentElem.offsetParent) {
            top += currentElem.offsetTop;
        }
        return top;
    },

    getAllLeft: function (elem) {
        let left = elem.offsetLeft;
        let currentElem = elem;
        while (currentElem = currentElem.offsetParent) {
            left += currentElem.offsetLeft;
        }
        return left;
    }
}
