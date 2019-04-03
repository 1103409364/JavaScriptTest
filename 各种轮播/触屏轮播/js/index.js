var searchipt = document.getElementById("searchipt");
var searchmask = document.getElementById("searchmask");
var searchCancle = document.getElementById("searchCancle");
searchipt.onclick = function () {
    searchmask.style.display = "block";
}
searchCancle.onclick = function () {
    searchmask.style.display = "none";
}
// 窗口尺寸改变的时候，立即重设字号
setFontSize();
window.addEventListener("resize", setFontSize);
function setFontSize() {
    winWidth = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = 16 * (winWidth / 411) + "px";
}
// 触屏轮播业务---------------------------------------------------
var banner = document.getElementById("banner");
var imglist = banner.querySelectorAll(".banner ul li");
var imgul = banner.getElementsByTagName("ul")[0];
// 图片数量
var imglength = imglist.length;
// 当前，上一张，下一张图片信号量
var now = 0, prev = imglength - 1, next = 1;
// 当前窗口宽度
var winWidth = document.documentElement.clientWidth;
// 开始触摸的x轴位置
var touchstart, touchend;
// 触摸开始时间,结束时间
var startTime, endTime;
var sliderlist = document.querySelectorAll("#slider li");

banner.addEventListener("touchstart", function (e) {
    // 阻止默认事件
    e.preventDefault();
    // 宽度百分百，触摸起始位置
    touchstart = e.touches[0].clientX;
    startTime = new Date();
}, false);


// touchmove事件触发的时候，马上让三张图片就位
banner.addEventListener("touchmove", function (e) {
    e.preventDefault();
    delTransition();
    // 要移动的是li,
    // 当前鼠标位置
    var positionX = e.touches[0].clientX;
    // touchstart开始位置也是手指和图片的偏移量
    imglist[now].style.left = positionX - touchstart + "px";
    imglist[next].style.left = winWidth + positionX - touchstart + "px";
    imglist[prev].style.left = -winWidth + positionX - touchstart + "px";
}, false);

banner.addEventListener("touchend", function (e) {
    endTime = new Date();
    var totalTime = endTime - startTime;
    // css加上过渡属性
    addTransition();
    // 手指离开屏幕时的位置
    touchend = e.changedTouches[0].clientX;
    // 移动距离超过一半视口宽度算移动成功，当滑动时间小于200ms属于快速滑动，也要切换图片
    // 下一张图片
    if (touchstart - touchend >= winWidth / 2 || touchstart - touchend > 0 && totalTime < 200) {
        prev = now;
        now = next;
        next++;
        if (next > imglength - 1) {
            next = 0;
        }
        // 此时只能看到now和prev两张图片，另一张看不到不用设置，否则有bug：一张图片飞过
        imglist[now].style.left = 0;
        // imglist[next].style.left = winWidth + "px";
        imglist[prev].style.left = -winWidth + "px";
    }
    // 上一张图片
    if (touchstart - touchend <= -winWidth / 2 || touchstart - touchend < 0 && totalTime < 200) {
        next = now;
        now = prev;
        prev--;
        if (prev < 0) {
            prev = imglength - 1;
        }
        // 这里不设置prev理由同上
        imglist[now].style.left = 0;
        imglist[next].style.left = winWidth + "px";
        // imglist[prev].style.left = -winWidth + "px";
    }
    // 滑动距离不足图片宽度一半，且滑动时间大于200ms，恢复原位
    if (Math.abs(touchstart - touchend) < winWidth / 2 && totalTime > 200) {
        imglist[now].style.left = 0;
        imglist[next].style.left = winWidth + "px";
        imglist[prev].style.left = -winWidth + "px";
    }

    changeSlider(now);
}, false)
// 加上过度
function addTransition() {
    for (var i = 0; i < imglength; i++) {
        imglist[i].style.transition = "all 0.5s ease 0s";
    }
}
// 删除过度
function delTransition() {
    for (var i = 0; i < imglength; i++) {
        imglist[i].style.transition = "none";
    }
}
// 切换指示器
function changeSlider(now) {
    for (var i = 0; i < sliderlist.length; i++) {
        sliderlist[i].className = "";
    }

    sliderlist[now].className = "current";
}