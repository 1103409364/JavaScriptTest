//得到carousel
var carousel = document.getElementById("carousel");
//得到运动机构
var m_unit = document.getElementById("m_unit");
//得到ul
var m_unitUl = m_unit.getElementsByTagName("ul")[0];
var m_unitLi = m_unitUl.getElementsByTagName("li");
//得到图片li
var lis = m_unit.getElementsByTagName("li");
// 获取按钮
var rightBtn = document.getElementById("rightBtn");
var leftBtn = document.getElementById("leftBtn");
//得到小圆点
var circleSliderLi = document.getElementById("circleNav").getElementsByTagName("li");
//复制节点前图片数量，真实数量
var imgLength = lis.length;

// 配置
var option =  {
    //图片宽度
    width: 665,
    //运动时间
    animateTime: 600,
    //缓冲描述
    tween: "BounceEaseOut",
    //自动轮播间隔时间
    interval: 2000,
    // 信号量
    nowIndex:0, //0 1 2 3 4 5 6 。6是临时状态
}


//克隆假0到ul最后
m_unitUl.appendChild(m_unitLi[0].cloneNode(true));

// 右按钮事件
rightBtn.onclick = rightBtnHandler;
//自动轮播
var timer = setInterval(rightBtnHandler,option.interval);
//鼠标进入停止
carousel.onmouseover = function(){
    clearInterval(timer);
}
//鼠标离开开始
carousel.onmouseout = function(){
    timer = setInterval(rightBtnHandler,option.interval);
}

//右按钮的事件处理程序
function rightBtnHandler() {
    //点击右按钮的时候，运动机构本身在运动，就不让右按钮有任何作用
    if(m_unit.isanimated) return;

    option.nowIndex++;
    changeCircle();
    animate(m_unit, { "left": -option.width * option.nowIndex }, option.animateTime, option.tween, function () {
        //回调函数，就是动画执行完毕之后做的事情
        if (option.nowIndex > imgLength - 1) {
            option.nowIndex = 0;
            // 拉回0
            this.style.left = "0px";
        }
    });
}

// 左按钮事件
leftBtn.onclick = leftBtnHandler;

function leftBtnHandler() {
    //点击按钮的时候，运动机构本身在运动，就不让右按钮有任何作用
    if(m_unit.isanimated) return;
    
    // 左按钮业务
    option.nowIndex--;
    if(option.nowIndex < 0){
        option.nowIndex = imgLength - 1;
        // 第0张图片向左移时，拉到假0，animate再从假0运动到真5
        m_unit.style.left = -option.width * imgLength + "px";
    }

    animate(m_unit, { "left": -option.width * option.nowIndex }, option.animateTime, option.tween);
    changeCircle();
}


for(var i = 0; i < imgLength; i++) {
    // 小圆点业务IIFE写法
    // (function(i) {
    // 	circleSliderLi[i].onclick = function() {
    // 		//点击右按钮的时候，运动机构本身在运动，就不让右按钮有任何作用
    // 		if(m_unit.isanimated) return;

    // 		// 小圆点的点击业务
    // 		option.nowIndex = i;
    // 		animate(m_unit, { "left": -option.width * option.nowIndex }, option.animateTime, option.tween);
    // 		changeCircle();
    // 	}
    // })(i)

    // 小圆点业务添加对象属性写法
    circleSliderLi[i].index = i;	//先编号
    circleSliderLi[i].onclick = function(){
        //点击小圆点的时候，运动机构本身在运动，就不让右按钮有任何作用
        if(m_unit.isanimated) return;
        
        //小圆点的点击业务
        option.nowIndex = this.index;
        animate(m_unit,{"left":-option.width * option.nowIndex},option.animateTime,option.tween);
        changeCircle();
    }
}

//更换小圆点函数
function changeCircle(){
    //n就是信号量的副本
    // var n = option.nowIndex % imgLength;
    // 三元运算写法
    var n = option.nowIndex == imgLength ? 0 : option.nowIndex;
    //判断副本的值==imgLength，那么就是0

    for (let i = 0; i < circleSliderLi.length; i++) {
        //去掉所有小圆点的cur
        circleSliderLi[i].classList.remove("current");
    }

    //第信号量这个小圆点加cur
    circleSliderLi[n].classList.add("current");
}