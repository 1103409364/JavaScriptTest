var winWidth;
setFontSize();
window.addEventListener("resize", setFontSize);
// 窗口尺寸改变的时候，立即重设字号，这样就能根据窗口大小自适应
function setFontSize() {
    winWidth = document.documentElement.clientWidth;

    if (isMobile()) {
        document.documentElement.style.fontSize = 20 * (winWidth / 500) + "px";
    } else {
        winWidth = 500;
        document.querySelector("html").style.width = 500 + "px";
        document.querySelector(".footer").style.width = 500 + "px";
        // document.documentElement.style.fontSize = 16 + "px";
    }
}

// 3D轮播业务：先调整图片位置，形成一个四个面的组合体，再对整个组合体进行旋转操作
var imglist = document.querySelectorAll(".pages ul>li");
var unit = document.querySelector(".unit");
// 信号量：上一张、当前，下一张，背后，初始值-1，0，1，2
var prev = -1,
    now = 0,
    next = 1,
    back = 2;

var touchstart, touchend, totalTime;
// 组合体缩放比率
var rate = 0.8;

var touchstartTime, touchendTime;
// 初始化，让图片组合成立方体
init();
// 开始触摸
unit.addEventListener("touchstart", function (e) {
    e.preventDefault();
    // 触摸开始时间
    touchstartTime = new Date();
    // 触摸开始位置
    touchstart = e.touches[0].clientX;
    // 触摸开始的时候，立即准备好要显示的图片
    switchShow();
})
// 触摸移动过程中
unit.addEventListener("touchmove", function (e) {
    e.preventDefault();
    // 取消组合体的过度
    unit.style.transition = "none";
    // 移动距离
    var distance = e.touches[0].clientX - touchstart;
    // 根据移动距离计算组合体旋转角度,总共旋转90度
    var degree = 90 * (distance / winWidth - now);

    // 如果当前图片是第一张禁止向右滑动，最后一张，禁止向左滑动
    if (now == 0 && distance > 0 || now == imglist.length - 1 && distance < 0) {
        return;
    }

    // scale3d每个面都进行缩放
    this.style.transform = "rotateY(" + degree + "deg)" + "scale3d(" + rate + "," + rate + "," + rate + ")";
})
// 触摸结束
unit.addEventListener("touchend", function (e) {
    e.preventDefault();
    // 记录结束时间
    touchendTime = new Date();
    // 总的触摸时间
    totalTime = touchendTime - touchstartTime;
    // 松手时加上过度
    unit.style.transition = "all 0.5s ease 0s";
    var touchend = e.changedTouches[0].clientX;
    var totaldistance = touchend - touchstart;

    // 当滑动距离超过一半屏幕宽度，或者快速滑动的时候切换图片
    if (Math.abs(totaldistance) >= winWidth / 2 || (totalTime < 200 && Math.abs(totaldistance) > 0)) {
        //左滑动
        if (totaldistance < 0) {
            back++;
            next = back - 1;
            now = next - 1;
            prev = now - 1;
            // 对now进行验收，另外三个值随根据now推算
            if (now > imglist.length - 1) {
                now = imglist.length - 1;
                prev = now - 1;
                next = now + 1;
                back = now + 2;
            }
        }
        //右滑动
        if (totaldistance > 0) {
            // 交换值容易出错，直接根据back计算另外三个值即可
            // next = now;
            // now = prev;
            // prev = back;
            back--;
            next = back - 1;
            now = next - 1;
            prev = now - 1;
            if (now < 0) {
                now = 0;
                prev = now - 1;
                next = now + 1;
                back = now + 2;
            }
        }
    }
    // 松手之后恢复，scale3d(1,1,1)不写会导致旋转错乱
    this.style.transform = "rotateY(" + -90 * now + "deg)" + "scale3d(1,1,1)";
    // 改变指示器
    changeSlider();
    // 切换导航
    changeNav();
})

// 显示当前信号量的图片，隐藏其他图片
function switchShow() {
    // 隐藏所有图片
    for (var i = 0; i < imglist.length; i++) {
        imglist[i].style.zIndex = "0";
        imglist[i].style.display = "none";
    }
    // 显示四张图
    imglist[now].style.display = "block";
    // prev,next,back会超出正常范围[0, imglist.length - 1]
    if (prev >= 0) {
        imglist[prev].style.display = "block";
    }
    if (next <= imglist.length - 1) {
        imglist[next].style.display = "block";
    }
    if (back <= imglist.length - 1) {
        imglist[back].style.display = "block";
    }
}
// 初始化
function init() {
    switchShow();
    // 所有按顺序图片卷在一起，形成一个立方体,
    for (var i = 0; i < imglist.length; i++) {
        // 正面
        if (i % 4 == 0) {
            imglist[i].style.transform = "translateZ(0)";
        }
        // 左侧面
        if (i % 4 == 1) {
            imglist[i].style.transform = "rotateY(90deg)" + "translateZ(" + winWidth / 2 + "px)" + "translateX(" + winWidth / 2 + "px)";
        }
        // 背面
        if (i % 4 == 2) {
            imglist[i].style.transform = "rotateY(180deg)" + "translateZ(" + winWidth + "px)";

        }
        // 左侧面
        if (i % 4 == 3) {
            imglist[i].style.transform = "rotateY(-90deg)" + "translateZ(" + winWidth / 2 + "px)" + "translateX(" + -winWidth / 2 + "px)";
        }
    }

    // 设置旋转轴为立方体中心
    unit.style.transformOrigin = "50% 50% " + -winWidth / 2 + "px";;
}

// 图片指示器业务
var sliderlist = document.querySelectorAll(".slider li");

function changeSlider() {
    for (var i = 0; i < sliderlist.length; i++) {
        sliderlist[i].className = "";
    }

    sliderlist[now].className = "current";
}

// 导航点击业务
var navlist = document.querySelectorAll("nav li");
// 导航监听
for (var i = 0; i < navlist.length; i++) {
    navlist[i].index = i;

    if (isMobile()) {
        navlist[i].addEventListener("touchend", function () {
            // 导航触摸结束后，改变信号量
            now = this.index;
            next = now + 1;
            prev = now - 1;
            back = now + 2;
            // 切换指示器
            switchShow();
            unit.style.transition = "all 0.3s ease 0s";
            // 切换导航
            changeNav();
            // 旋转组合体
            unit.style.transform = "rotateY(" + -90 * now + "deg)" + "scale3d(1,1,1)";
            changeSlider();
        });
    } else {
        navlist[i].addEventListener("click", function () {
            // 导航触摸结束后，改变信号量
            now = this.index;
            next = now + 1;
            prev = now - 1;
            back = now + 2;
            // 切换指示器
            switchShow();
            unit.style.transition = "all 0.3s ease 0s";
            // 切换导航
            changeNav();
            // 旋转组合体
            unit.style.transform = "rotateY(" + -90 * now + "deg)" + "scale3d(1,1,1)";
            changeSlider();
        });
    }




}
// 切换导航
function changeNav() {
    for (var i = 0; i < navlist.length; i++) {
        navlist[i].className = "";
    }
    navlist[now].className = "current";
}

function isMobile() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) return true;

    return false;
}