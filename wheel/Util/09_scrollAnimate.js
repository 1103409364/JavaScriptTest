// 页面卷动的运动函数
function scrollAnimate(target, time) {
    var interval = 10;
    // 帧编号t
    var frameNumber = 0;
    // 起点b
    var start = document.body.scrollTop || document.documentElement.scrollTop;
    // 运动距离c
    var distance = target - start;
    // 总帧数d
    var maxFrame = time / interval;
    // 设表先关
    clearInterval(timerId);

    var timerId = setInterval(function () {
        frameNumber++;
        if (frameNumber == maxFrame) {
            clearInterval(timerId);
        }
        document.body.scrollTop = document.documentElement.scrollTop = CubicEaseInOut(frameNumber, start, distance, maxFrame);
    }, interval);

    // 缓冲函数
    // 第一个参数t表示当前帧编号
    // 第二个参数b表示起始位置
    // 第三个参数c表示变化量
    // 第四个参数d表示总帧数
    // 返回当前帧的属性值
    function CubicEaseInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
}
