// 呼吸轮播动画的起点是display:block； 动画的终点是display:none;
var carousel = document.getElementById("carousel");
var imgUl = document.getElementById("imgUl");
var imgLi = imgUl.getElementsByTagName("li");

// 获取按钮
var rightBtn = document.getElementById("rightBtn");
var leftBtn = document.getElementById("leftBtn");

//得到小圆点
var circleSliderLi = document.getElementById("circleNav").getElementsByTagName("li");
// 当前图片编号
var nowIdx = 0;

var interval = 1800;
var imgLength = imgLi.length;
// 透明度变化量
var step = 0.01;
var time = 1000;

// 右按钮事件
rightBtn.onclick = rightBtnHandler;
// 自动轮播
var timer = setInterval(rightBtnHandler, interval);
//鼠标进入停止
carousel.onmouseover = function () {
    clearInterval(timer);
}
//鼠标离开开始
carousel.onmouseout = function () {
    timer = setInterval(rightBtnHandler, interval);
}

//右按钮的事件处理程序
function rightBtnHandler() {
    if (imgLi[nowIdx].isanimated) return;
    // 这张淡出，淡出完把display改为none
    animate(imgLi[nowIdx], { opacity: 0 }, time, function () {
        this.style.display = "none";
    });
    nowIdx++;
    if (nowIdx > imgLength - 1) {
        nowIdx = 0;
    }
    // 下一张淡入,淡入之前先更改display属性为block
    // imgLi[nowIdx].style.opacity = 0;
    imgLi[nowIdx].style.display = "block";
    animate(imgLi[nowIdx], { opacity: 1 }, time);
    changeCircle();
}

// 左按钮事件
leftBtn.onclick = leftBtnHandler;

function leftBtnHandler() {
    if (imgLi[nowIdx].isanimated) return;
    // 这张淡出，
    animate(imgLi[nowIdx], { opacity: 0 }, time, function () {
        this.style.display = "none";
    });
    nowIdx--;
    if (nowIdx < 0) {
        nowIdx = imgLength - 1;
    }
    // 下一张淡入
    imgLi[nowIdx].style.display = "block";
    animate(imgLi[nowIdx], { opacity: 1 }, time, );
    changeCircle();
}


for (var i = 0; i < imgLength; i++) {
    // 小圆点业务IIFE写法
    (function (i) {
        circleSliderLi[i].onclick = function () {
            //点击右按钮的时候，运动机构本身在运动，就不让右按钮有任何作用
            if (imgLi[nowIdx].isanimated) return;

            // 小圆点的点击业务
            animate(imgLi[nowIdx], { opacity: 0 }, time, function () {
                this.style.display = "none";
            });
            nowIdx = i;
            // 下一张淡入
            imgLi[nowIdx].style.display = "block";
            animate(imgLi[nowIdx], { opacity: 1 }, time);
            changeCircle();
        }
    })(i)

    // 小圆点业务添加对象属性写法
    // circleSliderLi[i].index = i;	//先编号
    // circleSliderLi[i].onclick = function(){
    //     //点击小圆点的时候，运动机构本身在运动，就不让右按钮有任何作用
    //     if(imgLi[nowIdx].isanimated) return;
    //     //小圆点的点击业务
    //     animate(imgLi[nowIdx], {opacity: 0}, time);
    //     nowIdx = this.index;

    //     animate(imgLi[nowIdx], {opacity: 1}, time);
    //     changeCircle();
    // }
}

//更换小圆点函数
function changeCircle() {
    for (let i = 0; i < circleSliderLi.length; i++) {
        //去掉所有小圆点的cur
        circleSliderLi[i].classList.remove("current");
    }

    //第信号量这个小圆点加cur
    circleSliderLi[nowIdx].classList.add("current");
}