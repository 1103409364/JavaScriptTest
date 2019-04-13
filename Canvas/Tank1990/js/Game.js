(function () {
    var Game = window.Game = function (json) {
        this.canvas = document.querySelector("#" + json.id);
        // 取得画布的上下文
        this.ctx = this.canvas.getContext("2d");
        // 取得资源地址
        this.dataUrl = json.dataUrl;
        // 提供一个对象R,把取回的资源放在R中
        this.R = {};
        // 帧编号
        this.fno = 0;
        // 初始化，自适应不同的视口
        this.init();
        // 加载资源，异步操作需要回调函数处理后续的任务
        var _this = this;
        this.loadResource(function () {
            console.log("加载完毕");
            _this.start();
        })
    }
    // 初始化视口
    Game.prototype.init = function () {
        // 获得视口的宽高
        this.windowHeight = document.documentElement.clientHeight;
        this.windowWidth = document.documentElement.clientWidth;
        this.canvas.height = this.windowHeight;
        this.canvas.width = this.windowWidth;
        // 限制画布宽高，pixel 2xL视口为411*823
        this.canvas.height = 416;
        this.canvas.width = 416;

    }
    // 加载资源
    Game.prototype.loadResource = function (callback) {
        var _this = this; //备份this
        var loadDoneNumber = 0; //加载图片计数

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    var dataobj = JSON.parse(xhr.responseText);
                    var images = dataobj.images;
                    var audio = dataobj.audio;
                    // 音频资源
                    for (let j = 0; j < audio.length; j++) {
                        _this.R[audio[j].name] = new Audio();
                        _this.R[audio[j].name].src = audio[j].url;
                    }
                    // 图片资源
                    for (let i = 0; i < images.length; i++) {
                        _this.R[images[i].name] = new Image();
                        _this.R[images[i].name].src = images[i].url;
                        _this.R[images[i].name].onload = function () {
                            loadDoneNumber++;
                            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
                            var txt = "加载中" + loadDoneNumber + "/" + images.length
                            _this.ctx.textAlign = "center";
                            _this.ctx.font = "20px MicroSoft YaHei";
                            _this.ctx.fillText(txt, _this.canvas.width / 2, _this.canvas.height * 0.382);
                            // 判断是否加载完毕
                            if (loadDoneNumber === images.length) {
                                // 执行回调函数
                                callback();
                            }
                        }
                    }


                }
            }
        }

        xhr.open("get", this.dataUrl, true);
        xhr.send(null);
    }

    Game.prototype.start = function () {
        // 播放bgm
        // this.R.bgm.load();
        // this.R.bgm.play();
        var _this = this;

        // 全局一个定时器
        this.timer = setInterval(function () {
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.fno++;

            // 后画的会被先画的覆盖
            _this.ctx.font = "14px 微软雅黑";
            _this.ctx.fillStyle = "#000"
            _this.ctx.fillText(_this.fno, 20, 20);
        }, 20)
    }
})()