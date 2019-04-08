(function () {
    var Bird = window.Bird = function () {
        this.image = [game.R.bird0_0, game.R.bird0_1, game.R.bird0_2];
        // 图片编号
        this.imgno = 1;
        this.height = 48;
        this.width = 48;
        this.x = game.canvas.width / 2 - this.width;
        this.y = game.canvas.height * (1 - 0.618);
        // 向上的速度
        this.v = 0;
        // 向下的加速度
        this.a = 0.5
        // 鸟自己的帧编号,作为下落的时间
        this.t = 0;
        // 鸟旋转的角度
        this.degree = 0;
    }

    Bird.prototype.render = function () {
        game.ctx.save();
        // 改变坐标系
        game.ctx.translate(this.x, this.y);
        game.ctx.rotate(this.degree);
        game.ctx.drawImage(this.image[this.imgno], -24, -24);
        game.ctx.restore();
    }

    Bird.prototype.update = function () {
        this.t++;
        this.y += (this.v + this.a * this.t)

        if (this.y < 0) {
            this.y = 0;
        }
        //  当t>30表示小鸟在下落，改变角度让鸟头向下
        if (this.t > 30) {
            this.degree += 0.2;
            // 头朝下停止煽动翅膀
            this.imgno = 1;
        } else {
            game.fno % 3 == 0 && this.imgno++;
            if (this.imgno > 2) {
                this.imgno = 0;
            }
        }
        if (this.degree > Math.PI / 2) {
            this.degree = Math.PI / 2;
        }
    }
    // 上升
    Bird.prototype.fly = function () {
        this.t = 0;
        this.v = -7;
        //旋转一个角度，让鸟头抬起
        this.degree = -0.5;
        // 播放声音
        game.R.fly.load();
        game.R.fly.play();
    }
})()