var log = console.log.bind(console);

var balloonContainer = document.getElementById("balloonContainer"),
    balloonContainerWidth = balloonContainer.clientWidth,
    timeWrap = document.getElementById("time"),
    boomAudio = document.getElementById("boom"),
    scoreWrap = document.getElementById("score"),
    frameNumberWrap = document.getElementById("fnum"),
    speedWrap = document.getElementById("speed");

const MAXTIME = 10;
// 总分和时间
var score = 0,
    time,
    restart = false;

// 气球类
function Balloon() {
    // 初始位置
    this.left = HtmlUtil.getRandom(0, balloonContainerWidth - 63);
    this.bottom = -200;

    // 分值随机
    this.value = HtmlUtil.getRandom(1, 10);
    // 分值越高的速度越快
    if (this.value <= 3) {
        this.speed = 3;
    } else {
        this.speed = this.value;
    }
    // speedWrap.innerHTML = this.speed;

    this.initinal();
    this.fly();
}
//初始化
Balloon.prototype.initinal = function () {
    //创建气球div容器
    this.dom = document.createElement("div");
    //创建气球可点击区域
    this.targetDom = document.createElement("div");
    // 显示分数
    this.targetDom.innerHTML = this.value;
    this.dom.appendChild(this.targetDom);
    // 添加类名
    this.targetDom.className = "target";
    this.dom.className = "ballon";
    this.dom.style.left = this.left + "px";
    this.dom.style.bottom = this.bottom + "px";
    // 添加气球到容器中
    balloonContainer.appendChild(this.dom);
    // 设置背景定位,从精灵图上随机取一个气球作为背景
    var x = -(HtmlUtil.getRandom(1, 3) - 1) * 63,
        y = 0;
    this.dom.style.backgroundPosition = x + "px " + y;

    // 绑定事件
    this.addEvent();
}

Balloon.prototype.addEvent = function () {
    var _this = this;

    if (HtmlUtil.isMobile()) {
        this.targetDom.addEventListener("touchstart", function (event) {
            event.preventDefault;
            _this.boom();
            // 累加分数
            score += _this.value;
            scoreWrap.innerHTML = score;
            // 没有load会导致短时间play两次，第二次无法播放的问题
            boomAudio.load();
            boomAudio.play();
        });
    } else {
        this.targetDom.onclick = function () {
            _this.boom();
            // 累加分数
            score += _this.value;
            scoreWrap.innerHTML = score;
            boomAudio.load();
            boomAudio.play();
        }
    }
}
// 气球起飞方法
Balloon.prototype.fly = function () {
    var _this = this;
    this.timer = setInterval(function () {
        if (_this.bottom < 1000) {
            // 更改bottom让气球动起来
            _this.bottom += _this.speed;
            _this.dom.style.bottom = _this.bottom + "px";
        }
        if (time == 0 || _this.bottom >= 1000 || restart == true) {
            _this.boom();
        }
    }, 20);
}

// 爆炸方法
Balloon.prototype.boom = function () {
    clearInterval(this.timer);
    balloonContainer.removeChild(this.dom);
}

// 游戏开始
var gameStart = function () {
    timeInterval = 20;

    // 重置总分和时间
    score = 0;
    time = MAXTIME;
    bgm.load();
    bgm.play();
    // 帧编号
    var frameNumber = 0;
    var timer = setInterval(function () {
        frameNumber++;
        frameNumberWrap.innerHTML = frameNumber;
        // 倒计时
        time = MAXTIME - parseInt(timeInterval * frameNumber / 1000);
        timeWrap.innerHTML = time
        if (frameNumber % 20 == 0) {
            new Balloon();
        }

        restart = false;
        if (time == 0) {
            clearInterval(timer);
            var bgm = document.getElementById("bgm");
            bgm.pause();
            scoreWrap.innerHTML += " GAME OVER";
            // alert("GAME OVER 你的分数是" + score);
        }
    }, timeInterval);
    return timer;
}

//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = "one thousand years later...";
var loadingMask = document.getElementById('loading');

//呈现loading效果
loadingMask.innerHTML = _LoadingHtml;

// 页面资源加载完成后开始游戏
window.onload = function () {
    // 移除loading效果
    loadingMask.parentNode.removeChild(loadingMask);
    var timer = gameStart();

    var btn = document.getElementById("btn");
    // 重新开始按钮绑定事件
    btn.onclick = function () {
        restart = true;
        clearInterval(timer);
        timer = gameStart();
    };
}
