$phonePicWrap = $(".phonePic");
$imglist = $(".phonePic .standard img");

// 起始位置，百分比padding-top根据父盒子宽度计算
var imgDefaultState = [50, 60, 50, 30, 10, 20, 40];
var positionArr = [];

reset();
getPosition();
$phonePicWrap.mousemove(function (event) {
    //根据鼠标和每个图片中线的位置关系，设置偏移量
    $imglist.each(function (i) {
        var deltaX = Math.abs(event.clientX - positionArr[i]) / 5;
        $(this).css("top", deltaX + "px");
    });
})

// 窗口大小改变，重新获得位置
$(window).resize(function () {
    positionArr = [];
    getPosition();
})
// 鼠标离开，恢复默认
$phonePicWrap.mouseleave(reset);

//得到每个li的自己中线的位置
function getPosition() {
    $(".phonePic .standard li").each(function () {
        positionArr.push($(this).offset().left + $(this).width() / 2);
    });
}


function reset() {
    $imglist.each(function (i) {
        $(this).stop(true).animate({
            "top": imgDefaultState[i] + "%",
        }, 200)
    })
}

var index = 0;
// 函数节流
var lock = false;
var animateInArr = [function () { }, function () { }, function () { }, function () { }, function () { }];
var animateOutArr = [function () { }, function () { }, function () { }, function () { }, function () { }];
$(document).mousewheel(function (e, delta) {
    if (lock) return;
    lock = true;
    var oldIndex = index;

    index -= delta;
    if (index < 0) {
        index = 0;
    }
    // 到达footer
    if (index > 4) {
        oldIndex = 4;
        index = 5;
    }
    // console.log(index, oldIndex);
    // 向上入场，向下出场
    if (delta == 1) {
        animateInArr[index]();
    }
    if (delta == -1) {
        animateOutArr[oldIndex]();
    }
})
// 顶栏动画
animateOutArr[0] = function () {
    $(".link").animate({
        "height": 0
    }, 500);
    $("header nav").animate({
        "height": 61
    }, 500, function () {
        lock = false
    });
}
animateInArr[0] = function () {
    $(".link").animate({
        "height": 100
    }, 500);
    $("header nav").animate({
        "height": 38
    }, 500, function () {
        lock = false
    });
}
// 第一页出，第二页入
animateOutArr[1] = function () {
    $(".pages").animate({
        "top": -100 + "%"
    }, 1000, "easieEaseInOutCirc", function () {
        lock = false
    });
    // 第二页手机图片
    $(".page2 .front").css({
        "top": 200,
        "right": 400,
    }).animate({
        "top": 0,
        "right": 300,
    }, 2000);

    $(".page2 .back").css({
        "top": 400,
        "right": 300,
    }).animate({
        "top": 300,
        "right": 250,
    }, 1500);
}
animateInArr[1] = function () {
    $(".pages").animate({
        "top": 0
    }, 1000, "easieEaseInOutCirc", function () {
        lock = false
    });

}
// 第二页
animateOutArr[2] = function () {
    $(".pages").animate({
        "top": -200 + "%"
    }, 1000, "easieEaseInOutCirc", function () {
        lock = false;
    });
}
animateInArr[2] = function () {
    $(".pages").animate({
        "top": -100 + "%",
    }, 1000, "easieEaseInOutCirc", function () {
        lock = false;
    });
    // 第二页手机图片
    $(".page2 .front").css({
        "top": -200,
        "right": 200,
    }).animate({
        "top": 0,
        "right": 300,
    }, 2000);

    $(".page2 .back").css({
        "top": 200,
        "right": 200,
    }).animate({
        "top": 300,
        "right": 250,
    }, 1500);
}
// 第三页
animateOutArr[3] = function () {
    $(".pages").animate({
        "top": -300 + "%"
    }, 1000, "easieEaseInOutCirc", function () {
        lock = false
    });
}
animateInArr[3] = function () {
    $(".pages").animate({
        "top": -200 + "%",
    }, 1000, "easieEaseInOutCirc", function () {
        lock = false
    });
}

// 第三页
animateOutArr[4] = function () {
    $(".pages").animate({
        "top": -330 + "%"
    }, 500, "easieEaseInOutCirc", function () {
        lock = false
    });
}
animateInArr[4] = function () {
    $(".pages").animate({
        "top": -300 + "%",
    }, 500, "easieEaseInOutCirc", function () {
        lock = false
    });
}