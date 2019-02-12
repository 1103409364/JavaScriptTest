var log = console.log.bind(console);

// 气球类
function Balloon() {
    this.balloonContainer = document.getElementById("balloonContainer");
    this.balloonContainerWidth = parseInt(HtmlUtil.getStyle(this.balloonContainer, "width"));
    this.left = HtmlUtil.getRandom(0, this.balloonContainerWidth - 63);
    this.bottom = -250;
    this.speed = 3;
    this.fps = document.getElementById("fps").textContent;
    this.color = HtmlUtil.getRandom(1, 3);
    this.score = document.getElementById("score").textContent;
    // 分数值
    this.value = HtmlUtil.getRandom(1, 10);

    this.dom = document.createElement("div");
    this.dom.style =
        "background: url(img/" + this.color + ".png) 0 0 no-repeat;" +
        "background-size: 62px 234.5px;" +
        "width: 63px; height: 234.5px;" +
        "text-align:center;" +
        "padding-top: 10px;" +
        "font-size: 30px;" +
        "color: #fff;" +

        "position: absolute;" +
        "left: " + this.left + "px;" + "bottom: " + this.bottom + "px;";

    this.dom.textContent = this.value;
    this.balloonContainer.appendChild(this.dom);

    this.dom.addEventListener("click", function () {
        var boom = document.getElementById("boom");
        var scoreElement = document.getElementById("score");
        var score = parseInt(scoreElement.textContent);
        scoreElement.textContent = parseInt(this.textContent) + score;
        // 没有load会导致短时间play两次，第二次无法播放的问题
        boom.load();
        boom.play();
        this.style = "display: none";
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
                _this.speed = 7;
            }
            if (_this.score > 200) {
                _this.speed = 9;
            }
            if (_this.score > 300) {
                _this.speed = 11;
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
            alert("Game over!!");
        }
    }, 500);
}

var addEvent = function () {
    var btn = document.getElementById("btn");
    btn.addEventListener("click", function () {
        location.reload();
    });
}

var __main = function () {
    addEvent();
    gameStart();
}

__main();