(function () {
    var SceneManager = window.SceneManager = function () {
        // 场景1显示logo按钮，场景2显示教程，场景3显开始游戏，场景4鸟死亡下落，场景5游戏结束
        this.sceneNumber = 1;
        // 场景管理类负责实例化其他类
        game.bg = new Background();
        game.land = new Land();
        game.bird = new Bird();

        this.logoY = -48;
        // 开始按钮位置
        this.button_playX = game.canvas.width / 2 - 58;
        this.button_playY = game.canvas.height;
        // 添加监听
        this.bindEvent();
    }
    // 根据场景号更新
    SceneManager.prototype.update = function () {
        switch (this.sceneNumber) {
            case 1:
                //小鸟扑打翅膀
                game.bird.wing();
                // logo入场
                this.logoY += 10;
                if (this.logoY > game.canvas.height * (1 - 0.618)) {
                    this.logoY = game.canvas.height * (1 - 0.618);
                }
                //开始按钮入场
                this.button_playY -= 16;
                if (this.button_playY < game.canvas.height * 0.618) {
                    this.button_playY = game.canvas.height * 0.618;
                }
                break;

            case 2:
                // logo出场
                if (this.logoY > -48) {
                    this.logoY -= 10;
                }
                //开始按钮出场
                if (this.button_playY < game.canvas.height) {
                    this.button_playY += 16;
                }
                //小鸟扑打翅膀，停在空中
                game.bird.wing();
                //改变教程图片透明度，制作闪一闪的效果
                this.tutorialOpacity += this.tutorialOpacityIsDown ? -0.1 : 0.1;
                if (this.tutorialOpacity < 0.1 || this.tutorialOpacity > 0.9) {
                    this.tutorialOpacityIsDown = !this.tutorialOpacityIsDown;
                }
                break;
            case 3:
                //小鸟更新
                game.bird.update();
                //背景和大地更新
                game.bg.update();
                game.land.update();
                //隔150帧实例化一个管子
                game.fno % 150 === 0 && (new Pipe());
                //渲染所有管子
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].update();
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                break;
            case 4:
                // 场景4鸟死亡下落的动画
                if (game.bird.y > game.canvas.height * 0.76 - 20) {
                    this.isBirdLand = true;
                }
                this.birdfno++;
                //鸟是否落地
                if (!this.isBirdLand) {
                    // 碰到管子，让鸟下落，改变角度，最后头向下
                    game.bird.y += game.bird.a * this.birdfno;
                    game.bird.degree += 0.2;
                    // 最大旋转角度，让鸟头向下
                    if (game.bird.degree > Math.PI / 2) {
                        game.bird.degree = Math.PI / 2;
                    }
                } else {
                    // 帧编号可以用来计时
                    // 鸟落地后，经过30帧的时间后进入场景5
                    if (this.birdfno >= 30) {
                        this.enter(5);
                    }
                }

                //白屏要慢慢缓缓的变回来
                this.maskOpacity -= 0.1;
                if (this.maskOpacity < 0) {
                    this.maskOpacity = 0;
                }
        }
    }
    // 场景切换
    SceneManager.prototype.render = function () {
        switch (this.sceneNumber) {
            case 1:
                // 游戏结束后回场景1时，重新播放bgm
                if (game.gameOver) {
                    game.bgm.load();
                    game.bgm.play();
                }
                game.gameOver = false;
                //渲染背景
                game.bg.render();
                //渲染大地
                game.land.update();
                game.land.render();
                //渲染小鸟
                game.bird.render();
                //logo
                game.ctx.drawImage(game.R["logo"], game.canvas.width / 2 - 89, this.logoY);
                //画按钮
                game.ctx.drawImage(game.R["button_play"], this.button_playX, this.button_playY);
                break;
            case 2:
                // 停止背景音乐
                game.bgm.pause();
                //渲染背景
                game.bg.render();
                //渲染大地
                game.land.render();
                //渲染小鸟
                game.bird.render();
                //画教程小图
                game.ctx.save();
                game.ctx.globalAlpha = this.tutorialOpacity; //透明度
                game.ctx.drawImage(game.R["tutorial"], game.canvas.width / 2 - 57, game.canvas.height * 0.618);
                game.ctx.restore();
                //渲染logo
                game.ctx.drawImage(game.R["logo"], game.canvas.width / 2 - 89, this.logoY);
                //渲染按钮
                game.ctx.drawImage(game.R["button_play"], this.button_playX, this.button_playY);
                break;
            case 3:
                //渲染背景
                game.bg.render();
                //渲染大地
                game.land.render();
                //渲染管子
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                //打印当前分数
                //当前分数的位数，比如66分就是2位
                var scoreLength = game.score.toString().length;
                //循环语句去设置图片的显示，有一个基准位置就是self.canvas.width / 2 - scoreLength / 2 * 34
                for (var i = 0; i < scoreLength; i++) {
                    game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)], game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i, game.canvas.height * 0.1);
                }
                //渲染小鸟，小鸟应该后渲染，盖住其他对象
                game.bird.render();
                break;
            case 4:
                //渲染背景
                game.bg.render();
                //渲染大地
                game.land.render();
                //渲染管子
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                //渲染小鸟
                game.bird.render();


                //渲染大白屏
                game.ctx.fillStyle = "rgba(255,255,255," + this.maskOpacity + ")";
                game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

                //打印当前分数
                //分数的位数
                var scoreLength = game.score.toString().length;
                //循环语句去设置图片的显示，有一个基准位置就是self.canvas.width / 2 - scoreLength / 2 * 34
                for (var i = 0; i < scoreLength; i++) {
                    game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)], game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i, game.canvas.height * 0.1);
                }
                break;
            case 5:
                //渲染背景
                game.bg.render();
                //渲染大地
                game.land.render();
                //渲染管子
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                // 渲染死鸟
                game.bird.render();
                //打印当前分数
                //当前分数的位数，比如66分就是2位
                var scoreLength = game.score.toString().length;
                //循环语句去设置图片的显示，有一个基准位置就是self.canvas.width / 2 - scoreLength / 2 * 34
                for (var i = 0; i < scoreLength; i++) {
                    game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)], game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i, game.canvas.height * 0.1);
                }

                //渲染game over
                game.ctx.drawImage(game.R["text_game_over"], game.canvas.width / 2 - 102, game.canvas.height * (1 - 0.618));
        }
    }
    // 进场
    SceneManager.prototype.enter = function (number) {
        this.sceneNumber = number;
        switch (this.sceneNumber) {
            case 1:
                //进入1号场景,隐藏logo和按钮的位置，分数清零
                this.logoY = -48;
                this.button_playY = game.canvas.height;
                game.bird = new Bird();
                game.score = 0;
                break;
            case 2:
                // 鸟就位
                game.bird.y = game.canvas.height * 0.3;
                game.bird.x = game.canvas.width / 2 - game.bird.width;
                //tutorial教程的透明度0~1
                this.tutorialOpacity = 1;
                this.tutorialOpacityIsDown = true;
                break;
            case 3:
                //管子数组清空
                game.pipeArr = [];
                break;
            case 4:
                //死亡,游戏界面白一下
                this.maskOpacity = 1;
                //小鸟是否已经触底
                this.isBirdLand = false;
                //小帧编号
                this.birdfno = 0;
                break;
            case 5:
                // 游戏结束
                game.gameOver = true;
                break;
        }
    }

    // 绑定事件
    SceneManager.prototype.bindEvent = function () {
        var _this = this;
        // 触摸事件会覆盖鼠标点击
        if (isMobile()) {
            var tipBox =  document.querySelector(".tip");
            var confirmBtn =  document.querySelector(".confirm");
            var cancleBtn =  document.querySelector(".cancle");
            tipBox.style.display = "flex";

            confirmBtn.addEventListener("click", function(event) {
                // 移动端一个audio对象的第一次播放，必须是用户触发的 click 行为(touch事件不行)。
                game.bgm.play();
                game.R.fly.play();
                game.R.fly.pause();
                game.R.hit.play();
                game.R.hit.pause();
                game.R.point.play();
                game.R.point.pause();

                tipBox.style.display = "none";
            })

            cancleBtn.addEventListener("click", function(event) {
                window.location = "about:blank"
                // window.location = "about:newtab"
            })

            game.canvas.addEventListener("touchstart", function (event) {
                event.preventDefault();
                clickHandler(event.touches[0].clientX, event.touches[0].clientY);
            })
        } else {
            game.canvas.addEventListener("click", function (event) {
                event.preventDefault();
                clickHandler(event.clientX, event.clientY);
                // console.log("click")
            })
        }

        function clickHandler(mousex, mousey) {
            //根据当前是第几个场景，执行不同的操作
            switch (_this.sceneNumber) {
                case 1:
                    //进入1号场景，检测用户是否点到按钮，无法给按钮添加监听，通过点击位置判断
                    if (mousex > _this.button_playX && mousex < _this.button_playX + 116 && mousey > _this.button_playY && mousey < _this.button_playY + 70) {
                        _this.enter(2); //去2号场景
                    }
                    break;
                case 2:
                    _this.enter(3);
                    break;
                case 3:
                    game.bird.fly();
                    break;
                case 5:
                    _this.enter(1);
                    break;
            }
        }
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
})()