/*
* 功能：让一个元素在规定时间内运动到目标位置，内置 Tween.js 一款可生成平滑动画效果的js动画库
*
* @para0 参与运动的元素
* @para1 以 json 的形式描述终点状态
* @para2 运动需要的总时间
* @para3 要使用的过度效果，比如：QuadEaseIn 、linear等
* @para4 回调函数，动画完成后要做什么
* 
*/
function animate(elem, targetJSON, time, tween, callback) {
    // 参数检查，至少需要3个参数，参数1和2必须是对象，参数3为数字，参数4和5可选
    if (arguments.length < 3 || typeof arguments[0] != "object" || typeof arguments[1] != "object" || typeof arguments[2] != "number") {
        throw new Error("参数错误");
    } else if (arguments.length == 3) {
        // 当只有三个参数时，tween 和 callback 没传，给一个默认值
        tween = "Linear";
        callback = null;
    } else if (arguments.length == 4) {
        // 当有四个参数时，检查第四个参数的类型
        switch (typeof arguments[3]) {
            case "string":
                callback = null;
                break;
            case "function":
                callback = arguments[3];
                arguments[3] = "Linear";
                break;
            default:
                throw new Error("第四个参数不合法");
        }
    }

    //检测是否是ie浏览器
    if (navigator.userAgent.match(/Trident/i)) {
        var interval = 50;
    } else {
        var interval = 20;
    }

    // 给元素加一个属性，表示是否在运动，用于函数节流
    elem.isanimated = true;
    // 起始位置
    var startJSON = {};
    // 总变化量
    var deltaJSON = {};
    // 计算元素起始状态
    for (var k in targetJSON) {
        startJSON[k] = parseFloat(getStyle(elem, k));
        // 去除单位 px
        targetJSON[k] = parseFloat(targetJSON[k]);
        // 变化量JSON
        deltaJSON[k] = targetJSON[k] - startJSON[k];
    }

    //执行次数 = 总时间 / 间隔时间
    var maxFrameNumber = parseInt(time / interval);
    //当前帧编号
    var frameNumber = 0;
    //表示每一帧的位置
    var position;

    //定时器
    var timerId = setInterval(function () {
        //要让所有的属性发生变化
        for (var k in startJSON) {
            // n就表示这一帧应该在的位置：
            // 参数 t d c b
            // 第一个参数t表示当前帧编号，第几帧
            // 第二个参数b表示起始位置
            // 第三个参数c表示总的变化量
            // 第四个参数d表示总帧数
            position = Tween[tween](frameNumber, startJSON[k], deltaJSON[k], maxFrameNumber);
            // opacity没有单位
            if (k != "opacity") {
                elem.style[k] = position + "px";
            } else {
                elem.style[k] = position;
                // 兼容ie
                elem.style.filter = "alpha(opacity=" + position * 100 + ")";
            }
        }

        //计数
        frameNumber++;
        // 拉终停表
        if (frameNumber == maxFrameNumber) {
            // 可能存在误差，停止的时候，elem 不一定在终点，会有偏差。强行把elem拉到终点
            for (var k in targetJSON) {
                if (k != "opacity") {
                    elem.style[k] = targetJSON[k] + "px";
                } else {
                    elem.style[k] = targetJSON[k];
                    elem.style.filter = "alpha(opacity=" + (targetJSON[k] * 100) + ")";
                }
            }
            //次数够了就停下来
            clearInterval(timerId);
            elem.isanimated = false;
            //调用回调函数，并且让回调函数中的this表示运动的对象
            callback && callback.apply(elem);
        }
    }, interval);

    // 获得计算后样式，兼容 ie 写法
    function getStyle(elem, property) {
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

    // 一个补间动画库，以平滑的方式修改元素的属性值
    var Tween = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        //二次的
        QuadEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        QuadEaseOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        QuadEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        //三次的
        CubicEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        CubicEaseOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        CubicEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        //四次的
        QuartEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        QuartEaseOut: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        QuartEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        QuartEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        QuartEaseOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        QuartEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        SineEaseIn: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        SineEaseOut: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        SineEaseInOut: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        ExpoEaseIn: function (t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        ExpoEaseOut: function (t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        ExpoEaseInOut: function (t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        CircEaseIn: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        CircEaseOut: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        CircEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        ElasticEaseIn: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        ElasticEaseOut: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        ElasticEaseInOut: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        BackEaseIn: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        BackEaseOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        BackEaseInOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        BounceEaseIn: function (t, b, c, d) {
            return c - Tween.BounceEaseOut(d - t, 0, c, d) + b;
        },
        BounceEaseOut: function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        BounceEaseInOut: function (t, b, c, d) {
            if (t < d / 2) return Tween.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
            else return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    };

    return timerId;
}
