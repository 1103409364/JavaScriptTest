(function () {
  // 背景类
  var Background = (window.Background = function () {
    // 取得背景图片对象,图片白天黑夜随机
    this.image = game.R.bg_day;
    this.skyColor = "#70C5CE";
    // (y + this.height) / windowH = 0.76 大地处于屏幕0.76的位置

    // 图片真实尺寸
    this.realW = 768;
    this.realH = 896;
    // 图片尺寸
    // this.width = 288;
    // this.height = 512;
    this.width = game.canvas.width;
    this.height = (896 * this.width) / this.realW;
    this.y = game.canvas.height * 0.76 - this.height;
    this.x = 0;
    // 移动速度
    this.speed = 0.05;
  });

  Background.prototype.render = function () {
    // 绘制背景,铺满画布
    game.ctx.drawImage(
      this.image,
      0,
      0,
      this.realW,
      this.realH,
      this.x,
      this.y,
      this.width,
      this.height
    );
    game.ctx.drawImage(
      this.image,
      0,
      0,
      this.realW,
      this.realH,
      this.x + this.width - 1,
      this.y,
      this.width,
      this.height
    );
    // 填空不够长，补一个同色的矩形；下方不用补，因为下面被大地覆盖了
    game.ctx.fillStyle = this.skyColor;
    game.ctx.fillRect(0, 0, game.canvas.width, this.y + 5);
  };

  Background.prototype.update = function () {
    this.x -= this.speed;
    // 无限连续滚动，把图片拉回来
    if (this.x < -this.width) {
      this.x = 0;
    }
  };
})();
