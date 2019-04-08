(function () {
    // 背景类
    var Background = window.Background = function () {
        // 取得背景图片对象
        this.image = game.R.bg_day;
        // (y + 404) / windowH = 0.75 让大地处于屏幕0.75的位置
        this.y = game.canvas.height * 0.75 - 404;
        this.x = 0;
        // 图片尺寸
        this.width = 288;
        this.height = 512;
        // 移动速度
        this.speed = 0.05;
    }

    Background.prototype.render = function () {
        // 绘制背景,铺满画布
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + this.width, this.y);
        game.ctx.drawImage(this.image, this.x + this.width * 2, this.y);
        // 填空不够长，补一个同色的矩形；下方不用补，因为下面被大地覆盖了
        game.ctx.fillStyle = "#4EC0CA";
        game.ctx.fillRect(0, 0, game.canvas.width, this.y + 5);
    }

    Background.prototype.update = function () {
        this.x -= this.speed;
        // 无限连续滚动，把图片拉回来
        if (this.x < -this.width) {
            this.x = 0;
        }
    }
})()