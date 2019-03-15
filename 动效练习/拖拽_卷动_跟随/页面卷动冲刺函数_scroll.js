function scrollAnimate(target, time) {
    var interval = 10;
    //帧编号t
    var frameNumber = 0;
    // 起点b
    var start = document.body.scrollTop || document.documentElement.scrollTop;
    // 运动距离c
    var distance = target - start;
    // 总帧数d
    var maxFrame = time / interval;
    // 先关定时器
    clearInterval(timer);
    var timer = setInterval(function () {
        frameNumber++;
        if (frameNumber == maxFrame) {
            clearInterval(timer);
        }
        document.body.scrollTop = document.documentElement.scrollTop =
            CubicEaseInOut(frameNumber, start, distance, d);
    }, interval);

    function linear(t, b, c, d) {
        return c * t / d + b;
    }

    function CubicEaseInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
}