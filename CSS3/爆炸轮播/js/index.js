// 配置文件
var option = {
    // 图片宽高
    "width": 560,
    "height": 300,
    // 运动时间
    "time": 1500,
    // 自动轮播间隔
    "interval": 2000,
}
// 当前图片，信号量
var imgIdx = 0;
// 轮播图容器
var $jigsaw = $(".jigsaw");
// 图片数量
var imgLength = 5;
// 函数节流
var lock = true;

var $divWrap = $(".divWrap");
var $allDdiv = $(".divWrap div");
// 创建的div数量
var divLength = $allDdiv.length;

$(".leftBtn").click(leftBtnHandler);
$(".rightBtn").click(rightBtnHandler);
// 自动轮播
var timerId = setInterval(rightBtnHandler, option.interval);
// 鼠标进入停止轮播
$jigsaw.mouseenter(function () {
    clearInterval(timerId);
});
// 鼠标离开恢复自动轮播
$jigsaw.mouseleave(function () {
    timerId = setInterval(rightBtnHandler, option.interval);
});

var $imgLi = $(".jigsaw .allImg li");
// 右键轮播业务
function rightBtnHandler() {
    if (!lock) return;
    jigsaw(imgIdx);

    imgIdx++;
    if (imgIdx == imgLength) {
        imgIdx = 0;
    }
    nextImg(imgIdx);
    changeSlider();
}

// 左键轮播业务
function leftBtnHandler() {
    if (!lock) return;
    jigsaw(imgIdx);
    imgIdx--;
    if (imgIdx < 0) {
        imgIdx = 4;
    }
    nextImg(imgIdx);
    changeSlider();
}

// 拼图
function jigsaw(imgIdx) {
    createDiv();
    $allDdiv = $(".divWrap div");
    $allDdiv.each(function (i) {
        lock = false;
        var imgSrc = "url(" + "img/" + imgIdx + ".jpg" + ")";
        $(this).fadeIn().css({
            "width": option.width / 10,
            "height": option.height / 10,
            // 调整背景图片位置，每个div显示一部分图片
            "background": imgSrc + -i % 10 * 56 + "px" + " " + -parseInt(i / 10) * 30 +
                "px",
        }).velocity({
            // 随机旋转一个角度
            "rotateX": Math.random() * 400 + "deg",
            "rotateY": Math.random() * 400 + "deg",
            "translateZ": "400px",
            "opacity": 0,
        }, option.time, function () {
            // div删除自己
            $(this).remove();
            lock = true;
        })
    })
}

// 创建100个div
function createDiv() {
    for (var row = 0; row < 10; row++) {
        for (var col = 0; col < 10; col++) {
            $("<div></div>").css({
                "position": "absolute",
                "left": col * option.width / 10,
                "top": row * option.height / 10
            }).appendTo(".divWrap");
        }
    }
}
// 下一张图片
function nextImg(imgIdx) {
    $(".jigsaw .first img").attr("src", "img/" + imgIdx + ".jpg");
}


var slider = $(".jigsaw .slider li");
// 小圆点指示器业务
slider.click(function () {
    if (!lock) return;
    var clickIdx = $(this).index();
    // 如果点到圆点的序号在现有序号之后，把拼图div放在左上角准备，反之放在右上角
    if (clickIdx > imgIdx) {
        $allDdiv.css({
            "left": option.width,
            "top": 0,
        })
    }

    if (clickIdx < imgIdx) {
        $allDdiv.css({
            "left": 0,
            "top": 0,
        })
    }
    imgIdx = clickIdx;
    jigsaw(imgIdx);
    changeSlider();
})

function changeSlider() {
    // 让所有小圆点变为未点击状态
    slider.css({
        "opacity": 0.5
    })
    slider.eq(imgIdx % 5).css({
        "opacity": 1
    });
}