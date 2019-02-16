var log = console.log.bind(console);

// 气球类
function Balloon() {
    this.balloonContainer = document.getElementById("balloonContainer");
    this.balloonContainerWidth = parseInt(HtmlUtil.getStyle(this.balloonContainer, "width"));
    this.left = HtmlUtil.getRandom(0, this.balloonContainerWidth - 63);
    this.bottom = -200;
    this.speed = 3;
    this.fps = document.getElementById("fps").textContent;
    this.color = HtmlUtil.getRandom(1, 3);
    this.score = document.getElementById("score").textContent;
    // 分数值
    this.value = HtmlUtil.getRandom(1, 10);
    // 气球div
    this.dom = document.createElement("div");
    // 气球的有效点击区域
    this.targetDom = document.createElement("div");

    this.dom.style =
        "background: url(img/" + this.color + ".png) 0 0 no-repeat;" +
        "background-size: 62px 234.5px;" +
        "width: 63px; height: 234.5px;" +
        "text-align:center;" +
        "font-size: 30px;" +
        "color: #fff;" +
        "position: absolute;" +
        "left: " + this.left + "px;" + "bottom: " + this.bottom + "px;";

    this.targetDom.style =
        "width: 63px;" +
        "height: 60px;" +
        "padding-top: 10px;" +
        "position: absolute;" +
        "left: 0" +
        "top: 0";

    this.targetDom.textContent = this.value;
    this.dom.appendChild(this.targetDom);

    this.balloonContainer.appendChild(this.dom);
    this.targetDom.addEventListener("click", function () {
        var boom = document.getElementById("boom");
        var scoreElement = document.getElementById("score");
        var score = parseInt(scoreElement.textContent);
        scoreElement.textContent = parseInt(this.textContent) + score;
        // 没有load会导致短时间play两次，第二次无法播放的问题
        boom.load();
        boom.play();
        this.parentNode.style = "display: none";
    });

    // 备份this
    var _this = this;

    var id = setInterval(function () {
        if (_this.bottom < 1000) {
            // 根据分数来调节速度
            if (_this.score > 50) {
                _this.speed = 5;
            }
            if (_this.score > 100) {
                _this.speed = 8;
            }
            if (_this.score > 200) {
                _this.speed = 11;
            }
            if (_this.score > 300) {
                _this.speed = 13;
            }

            _this.bottom += _this.speed;
        } else {
            clearInterval(id);
        }

        _this.dom.style.bottom = _this.bottom + "px";
    }, 1000 / _this.fps);
}

var gameStart = function () {
    var balloonContainer = document.getElementById("balloonContainer");

    var d = new Date();
    var timeEle = document.getElementById("time");
    // 游戏时间限制
    var maxTime = timeEle.textContent;
    var id = setInterval(function () {
        var time = timeEle.textContent;

        if (time > 0) {
            new Balloon();
            var newDate = new Date();
            var second = Math.floor((newDate - d) / 1000);

            timeEle.textContent = maxTime - second;
        } else {
            // 时间到游戏结束
            clearInterval(id);
            var bgm = document.getElementById("bgm");
            bgm.pause();
            balloonContainer.innerHTML = "";
            alert("GAME OVER!!");
        }
    }, 500);

    return id;
}

var addEvent = function (id) {
    var btn = document.getElementById("btn");
    btn.addEventListener("click", function () {
        // location.reload();
        // 重新开始游戏，清除上一次的定时器
        clearInterval(id);
        initinal();
        var newid = gameStart();
        addEvent(newid);
    });
}

var initinal = function () {
    // 游戏时间限制
    var time = 50;
    var fps = 50;
    var ini = `
        <audio id="bgm" src="audio/bgm.mp3" autoplay loop></audio>
        <audio id="boom" src="audio/boom.mp3"></audio>
        <div id="status">
            <button id="btn">重新开始</button>
            fps:
            <span id="fps">${fps}</span>
            time:
            <span id="time">${time}</span>
            score:
            <span id="score">0</span>
        </div>

        <div id="balloonContainer"></div>
    `;

    var container = document.getElementById("container");
    container.innerHTML = ini;
}

var __main = function () {
    initinal();
    var id = gameStart();
    addEvent(id);
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
    __main();
}

