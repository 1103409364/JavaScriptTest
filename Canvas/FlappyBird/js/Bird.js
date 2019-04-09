(function () {
    var Bird = window.Bird = function () {
        this.image = game.R.bird;
        // 图片编号
        this.imgno = 1;
        // 用来制作上下浮动效果，漂浮
        this.deltaY = 0;
        this.flag = true;
        // 真实宽高92*64
        this.realW = 276 / 3;
        this.realH = 64;
        this.height = 48;
        this.width = 48;
        // 初始位置
        this.x = game.canvas.width / 2;
        this.y = game.canvas.height * 0.3
        // 向上的速度
        this.v = 0;
        // 向下的加速度
        this.a = 0.5
        // 鸟自己的帧编号,作为下落的时间
        this.t = 0;
        // 鸟旋转的角度
        this.degree = 0;
        this.die = false;
    }

    Bird.prototype.render = function () {
        game.ctx.save();
        // 改变坐标系
        game.ctx.translate(this.x, this.y);
        game.ctx.rotate(this.degree);
        // 默认显示中间切片
        game.ctx.drawImage(this.image, this.realW * this.imgno, 0, this.realW, this.realW, -this.width / 2, -this.height / 2, this.width, this.height);
        game.ctx.restore();
    }

    Bird.prototype.update = function () {
        this.t++;
        this.y += (this.v + this.a * this.t)

        if (this.y < 0) {
            this.y = 0;
        }
        // 地面在0.76的位置
        if (this.y > game.canvas.height * 0.76 - 20) {
            this.goDie()
        }
        //  当t>30表示小鸟在下落，改变角度让鸟头向下
        if (this.t > 30) {
            this.degree += 0.2;
            // 头朝下停止煽动翅膀
            this.imgno = 1;
        } else {
            this.wing();
        }
        // 最大旋转角度，让鸟头向下
        if (this.degree > Math.PI / 2) {
            this.degree = Math.PI / 2;
        }
        // 小鸟的矩形边界，碰撞检测用,分别是上右下左
        this.T = this.y - 12;
        this.R = this.x + 17;
        this.B = this.y + 12;
        this.L = this.x - 17;
    }
    // 上升
    Bird.prototype.fly = function () {
        // 死了不能飞
        if (!this.die) {
            this.t = 0;
            this.v = -7;
            //旋转一个角度，让鸟头抬起
            this.degree = -0.5;
            // 播放声音
            game.R.fly.load();
            game.R.fly.play();
        }
    }

    Bird.prototype.wing = function () {
        game.fno % 5 === 0 && this.imgno++;
        this.imgno = this.imgno > 2 ? 0 : this.imgno++;
    }

    Bird.prototype.goDie = function () {
        //死亡播放音效
        game.R.hit.load();
        game.R.hit.play();
        this.die = true;
        // 死了去场景4
        game.sm.enter(4);
    }
})()