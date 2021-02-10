(function () {
  // game类持有场景管理器，通过场景管理器来更新和渲染各种不同场景
  var Game = (window.Game = function (json) {
    this.canvas = document.querySelector("#" + json.id);
    // 取得画布的上下文
    this.ctx = this.canvas.getContext("2d");
    // 取得资源地址
    this.dataUrl = json.dataUrl;
    // 提供一个对象R,把取回的资源放在R中
    this.R = {};
    // 管子数组
    this.pipeArr = [];
    // 帧编号
    this.fno = 0;
    //分数
    this.score = 0;
    // 初始化，自适应不同的视口
    this.init();
    // 加载资源，异步操作需要回调函数处理后续的任务
    var _this = this;
    this.loadResource(function () {
      // console.log("加载完毕")开始游戏
      _this.start();
    });
    this.gameOver = false;

    this.bgm = new Howl({ src: ["./R/audio/bgm.mp3"] });
    this.flyAudio = new Howl({ src: ["./R/audio/fly.mp3"] });
    this.hitAudio = new Howl({ src: ["./R/audio/hit.mp3"] });
    this.pointAudio = new Howl({ src: ["./R/audio/point.mp3"] });
  });
  // 初始化视口
  Game.prototype.init = function () {
    // 获得视口的宽高
    this.windowHeight = document.documentElement.clientHeight;
    this.windowWidth = document.documentElement.clientWidth;
    this.canvas.height = this.windowHeight;
    this.canvas.width = this.windowWidth;
    // 限制画布宽高，pixel 2xL视口为411*823
    if (this.windowHeight > 823) {
      this.canvas.height = 823;
    } else if (this.windowHeight < 480) {
      this.canvas.height = 480;
    }
    if (this.windowWidth > 414) {
      this.canvas.width = 414;
    } else if (this.windowWidth < 320) {
      this.canvas.width = 320;
    }
  };
  // 加载资源
  Game.prototype.loadResource = function (callback) {
    var _this = this; //备份this
    var loadDoneNumber = 0; //加载图片计数
    var loadAudioNumber = 0; //加载音频计数

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          var dataobj = JSON.parse(xhr.responseText);
          var images = dataobj.images;
          var audio = dataobj.audio;
          // 音频资源
          for (let j = 0; j < audio.length; j++) {
            _this.R[audio[j].name] = new Audio();
            _this.R[audio[j].name].src = audio[j].url;
            loadAudioNumber++;
          }
          // 图片资源
          for (let i = 0; i < images.length; i++) {
            _this.R[images[i].name] = new Image();
            _this.R[images[i].name].src = images[i].url;
            _this.R[images[i].name].onload = function () {
              loadDoneNumber++;
              _this.ctx.clearRect(
                0,
                0,
                _this.canvas.width,
                _this.canvas.height
              );
              var txt = "加载中" + loadDoneNumber + "/" + images.length;
              _this.ctx.textAlign = "center";
              _this.ctx.font = "20px MicroSoft YaHei";
              _this.ctx.fillText(
                txt,
                _this.canvas.width / 2,
                _this.canvas.height * 0.382
              );
              // 判断是否加载完毕
              if (loadDoneNumber === images.length) {
                // 执行回调函数
                callback();
              }
            };
          }
        }
      }
    };

    xhr.open("get", this.dataUrl, true);
    xhr.send(null);
  };

  Game.prototype.start = function () {
    // game类的场景管理器
    this.sm = new SceneManager();
    var _this = this;

    // 改到场景管理器中实例化各种类，和添加监听
    // 实例化
    // 画布点击监听

    // 全局一个定时器
    this.timer = setInterval(function () {
      // 清除画布
      _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      // 全局帧编号
      _this.fno++;
      _this.sm.update();
      _this.sm.render();

      _this.ctx.font = "20px FB";
      _this.ctx.textAlign = "left";
      _this.ctx.fillStyle = "#fff";
      _this.ctx.fillText("Frame : " + _this.fno, 10, 20);
      _this.ctx.fillText("Scene : " + _this.sm.sceneNumber, 10, 40);
      // 渲染和更新也放到场景管理器中
    }, 20);
  };
})();
