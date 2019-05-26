// 添加事件绑定，低版本IE兼容写法
function addEvent(elem, eventType, callback) {
    if (elem.addEventListener) {
        elem.addEventListener(eventType, callback, false);
    } else if (elem.attachEvent) {
        elem.attachEvent("on" + eventtype, function () {
            callback.call(elem);
        });
    } else {
        elem["on" + eventtype] = callback;
    }
}
