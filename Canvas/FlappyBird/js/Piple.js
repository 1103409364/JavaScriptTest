(function () {
    var Piple = window.Piple = function () {
        // image对象：口向下的管子，在上方
        this.pipeDown = game.R.pipe_down;
        // 口向上的管子，在地上
        this.pipeUp = game.R.pipe_up;
        // 让管子出现在远一点的地方,上下管子x相同
        this.x = game.canvas.width;
        // 管子图片总宽高
        this.width = 52;
        this.height = 320;
        this.gap = 166;
        // 管子需要显示部分高度随机,根据屏幕长度调整管子长度
        if(game.canvas.height > 800) {
            this.pipeDownHeight = parseInt(Math.random() * (this.height - 140)) + 140;
        } else {
            this.pipeDownHeight = parseInt(Math.random() * (this.height - 80)) + 80;
        }
        this.pipeUpHeight = game.canvas.height * 0.76 - this.gap - this.pipeDownHeight;
        // 速度和大地一样
        this.speed = 2;
        game.pipleArr.push(this);
    }

    Piple.prototype.render = function () {
        game.ctx.drawImage(this.pipeDown, 0, this.height - this.pipeDownHeight, this.width, this.pipeDownHeight, this.x, 0, this.width, this.pipeDownHeight);
        game.ctx.drawImage(this.pipeUp, 0, 0, this.width, this.pipeUpHeight, this.x, this.pipeDownHeight + this.gap, this.width, this.pipeUpHeight);
    }

    Piple.prototype.update = function () {
        this.x -= this.speed;
        if (this.x < -this.width) {
            for(var i = 0; i < game.pipleArr.length; i++) {
                if (this === game.pipleArr[i]) {
                    game.pipleArr.splice(i, 1);
                }
            }
        }
    }

})()