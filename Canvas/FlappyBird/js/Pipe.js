(function () {
    var Pipe = window.Pipe = function () {
        // 上下管子共用一个image对象
        this.image = game.R.pipe;
        // 让管子出现在远一点的地方,上下管子x相同
        this.x = game.canvas.width;
        // 管子图片实际总宽高138*793,计算显示的宽高
        this.imageRealH = 793;
        this.imageRealW = 138;
        // 显示最大高度缩小为画布高度的一半
        this.height = game.canvas.height * 0.50;
        this.width = this.imageRealW * this.height / this.imageRealH;
        // 管子间隙
        this.gap = 150;
        // 管子需要显示部分高度随机,根据屏幕长度调整管子长度
        this.pipeDownHeight = parseInt(Math.random() * (this.height - 100)) + 100;
        this.pipeUpHeight = game.canvas.height * 0.76 - this.gap - this.pipeDownHeight;
        // 速度和大地一样
        this.speed = 2;
        game.pipeArr.push(this);
    }
    //   
    Pipe.prototype.render = function () {
        // 根据比例计算切片高，先画地上的口向上管子
        game.ctx.drawImage(this.image, 0, 0, this.imageRealW, this.pipeUpHeight / (this.width / this.imageRealW), this.x, this.pipeDownHeight + this.gap, this.width, this.pipeUpHeight);

        // 改变坐标系,移动到上管子的开口处，旋转180度，倒着画
        game.ctx.save();
        game.ctx.translate(this.x + this.width, this.pipeDownHeight);
        game.ctx.rotate(-Math.PI);
        game.ctx.drawImage(this.image, 0, 0, this.imageRealW, this.pipeDownHeight / (this.width / this.imageRealW), 0, 0, this.width, this.pipeDownHeight);
        game.ctx.restore();

    }

    Pipe.prototype.update = function () {
        this.x -= this.speed;
        // 当管子出走出了画布，移除它
        if (this.x < -this.width) {
            for (var i = 0; i < game.pipeArr.length; i++) {
                if (this === game.pipeArr[i]) {
                    game.pipeArr.splice(i, 1);
                }
            }
        }
        this.check();
    }
    // 碰撞检测
    Pipe.prototype.check = function () {
        //碰撞检测，检查自己有没有撞到小鸟
        if (game.bird.R > this.x && game.bird.L < this.x + this.width) {
            if (game.bird.T < this.pipeDownHeight || game.bird.B > this.pipeDownHeight + this.gap) {
                game.bird.goDie();
                game.sm.enter(4);
            }
        }
        //加分
        if (game.bird.R > this.x + 52 && !this.alreadyPass) {
            //顺利通过了
            game.score++;
            //标记为已经通过了
            this.alreadyPass = true;
            game.R.point.load();
            game.R.point.play();
        }
    }
})()