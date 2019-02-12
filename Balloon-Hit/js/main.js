// 气球类
function Balloon() {
    this.container = document.getElementById("container");
    this.containerWidth = parseInt(HtmlUtil.getStyle(this.container, "width"));
    this.left = HtmlUtil.getRandom(0, this.containerWidth - 63);
    this.bottom = -250;
    this.speed = 3;
    this.fps = document.getElementById("fps").textContent;
    this.color = HtmlUtil.getRandom(1, 3);
    // 分数
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
    this.container.appendChild(this.dom);

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
            _this.bottom += _this.speed;

        } else {
            clearInterval(id);
        }
        _this.dom.style.bottom = _this.bottom + "px";
    }, 1000 / _this.fps);
}

var gameStart = function () {
    setInterval(function () {
        new Balloon();
    }, 500);
}

var __main = function () {
    gameStart();
}

__main();