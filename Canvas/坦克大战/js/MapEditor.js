function MapEditor() {
    this.image = new Image();
    this.image.src = "R/images/block.png";
    // 当前px位置
    this.x = 0;
    this.y = 0;
    // 当前列和行
    this.col = 0;
    this.row = 0;
    // 当前block类型，初始为"0"
    this.blockType = "0";
    // 状态数组，用于撤消，恢复功能
    this.state = [];
    this.hisstate = [];
    this.nowMap = [];

    this.$canvas = $("canvas");
    // 画布宽高
    this.cwidth = this.$canvas[0].width;
    this.cheight = this.$canvas[0].height;
    this.ctx = this.$canvas[0].getContext("2d");
    this.$cursor = $(".cursor");
    this.$legend = $(".legend li");
    this.$canvasWrap = $(".canvasWrap");
    this.$cancel = $(".cancel");
    this.$restore = $(".restore");
    this.$save = $(".save");

    var _this = this;
    this.image.onload = function () {
        _this.init();
    }

    this.bindEvent();
}

MapEditor.prototype.init = function () {
    // 画总部
    this.ctx.drawImage(this.image, 160, 0, 32, 32, 6 * 32, 12 * 32, 32, 32);

    // 当前列和行,初始化为-1，刚好点到初始位置，saveState会少记录一个，
    this.col = -1;
    this.row = -1;

    // 初始化地图矩阵26*26
    this.MAP = [
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000000000000000000",
        "00000000000055000000000000",
        "00000000000055000000000000",
    ];

    // 保存状态,用于撤消，恢复,保存初始状态
    this.state.push(this.MAP.slice(0));
    this.blockType = "3";
    // 初始化block的宽高
    this.bwidth = 32;
    this.bheight = 32;

    if (this.blockType.indexOf("sm") != -1) {
        this.bwidth = 16;
        this.bheight = 16;
    }

    this.$cursor.css({
        "box-sizing": "border-box",
        "border": "1px solid #ff0000",
        "width": this.bwidth,
        "height": this.bheight,
        "position": "absolute",
    });
}

MapEditor.prototype.bindEvent = function () {
    _this = this;

    // block类型示例图添加监听，点击时改变笔刷
    this.$legend.on("click", function (e) {
        $(this).addClass("current").siblings().removeClass("current");
        _this.blockType = $(".current").attr("data-type");

        if (_this.blockType.indexOf("sm") != -1) {
            _this.bwidth = 16;
            _this.bheight = 16;
        } else {
            _this.bwidth = 32;
            _this.bheight = 32;
        }
        _this.$cursor.css({
            "width": _this.bwidth,
            "height": _this.bheight,
        });
    })
    // 画布添加监听，绘制光标
    this.$canvas.on("mousemove", function (e) {
        var col = parseInt(e.offsetX / _this.bwidth);
        var row = parseInt(e.offsetY / _this.bheight);

        _this.x = col * _this.bwidth;
        _this.y = row * _this.bheight;

        _this.$cursor.css({
            "left": _this.x,
            "top": _this.y,
        })
    })
    // 画布父元素添加监听，画block
    this.$canvasWrap.on("mousedown", function (e) {
        // 这里不能用offsetX,offset包括页面卷动值，clientY不包括页面卷动值。需要减去页面卷动值。
        var col = parseInt((e.clientX - ($(this).offset().left - $(window).scrollLeft())) / _this.bwidth);
        var row = parseInt((e.clientY - ($(this).offset().top - $(window).scrollTop())) / _this.bheight);
        // 鼠标按下的时候，立即记录一次
        _this.col = col;
        _this.row = row;

        _this.drawBlock();
        _this.saveState();

        // 鼠标移动时
        $(this).on("mousemove", function (e) {
            col = parseInt((e.clientX - $(this).offset().left) / _this.bwidth);
            row = parseInt((e.clientY - $(this).offset().top) / _this.bheight);
            // 当行或者列改变时，才执行以下操作，节流
            if (_this.col != col || _this.row != row) {
                _this.col = col;
                _this.row = row;
                _this.drawBlock();
                _this.saveState();
            }
        })
        $(this).on("mouseup", function (e) {
            $(this).off("mousemove");
        })
    })
    // 撤消按钮绑定监听
    this.$cancel.on("click", function () {
        _this.cancel();
        // 撤消后改变当前地图矩阵，数组要深拷贝，否则会出错
        _this.MAP = _this.state[_this.state.length - 1].slice(0);
        console.log(_this.MAP)
    })

    // 恢复按钮绑定监听
    this.$restore.on("click", function () {
        _this.restore();
        // 恢复后改变当前地图矩阵
        _this.MAP = _this.state[_this.state.length - 1].slice(0);
        console.log(_this.MAP)
    })

}

// 画图、修改地图矩阵
MapEditor.prototype.drawBlock = function () {
    // 总部位置禁止画图
    if (this.x === 192 && this.y === 384) {
        return;
    }
    // 先清除当前格
    this.ctx.clearRect(this.x, this.y, this.bwidth, this.bheight);
    switch (this.blockType) {
        case "0":
            this.changeArray("0");
            break;
        case "1":
            this.changeArray("1");
            this.ctx.drawImage(this.image, 64, 0, this.bwidth, this.bheight, this.x, this.y, this.bwidth, this.bheight);
            break;
        case "2":
            this.changeArray("2");
            this.ctx.drawImage(this.image, 96, 0, this.bwidth, this.bheight, this.x, this.y, this.bwidth, this.bheight);
            break;
        case "3sm":
            this.changeArray("3");
            this.ctx.drawImage(this.image, 0, 0, this.bwidth, this.bheight, this.x, this.y, this.bwidth, this.bheight);

            break;
        case "3":
            this.changeArray("3");
            this.ctx.drawImage(this.image, 0, 0, this.bwidth, this.bheight, this.x, this.y, this.bwidth, this.bheight);

            break;
        case "4sm":
            this.changeArray("4");
            this.ctx.drawImage(this.image, 32, 0, this.bwidth, this.bheight, this.x, this.y, this.bwidth, this.bheight);

            break;
        case "4":
            this.changeArray("4");
            this.ctx.drawImage(this.image, 32, 0, this.bwidth, this.bheight, this.x, this.y, this.bwidth, this.bheight);
            break;
    }
}
// 改变矩阵
MapEditor.prototype.changeArray = function (blockType) {
    // 初始值为-1，越界
    if (this.row === -1) return;
    var str = "";
    if (this.bwidth === 32) {
        // 宽度为32时，行列row*col是13*13，一次改变格，因为MAP永远是26*26的
        str = this.MAP[this.row * 2].substring(0, this.col * 2) + blockType + blockType + this.MAP[this.row * 2].substring(this.col * 2 + 2);
        this.MAP[this.row * 2] = str;
        this.MAP[this.row * 2 + 1] = str;
    }

    if (this.bwidth === 16) {
        // 宽度为32时，行列row*col是26*26
        str = this.MAP[this.row].substring(0, this.col) + blockType + this.MAP[this.row].substring(this.col + 1);
        this.MAP[this.row] = str;
    }
}

MapEditor.prototype.saveState = function () {
    // 数组拷贝
    this.state.push(this.MAP.slice(0));
    // this.hisstate.push(this.state.shift());
}

// 撤消，两个数组之间来回倒
MapEditor.prototype.cancel = function () {
    if (this.state.length > 1) {
        var state = this.state.pop();
        this.hisstate.push(state);
        // 画出栈顶的图
        this.drawMap(this.state[this.state.length - 1]);
    } else {
        console.log("撤消到头了");
    }
}
// 恢复
MapEditor.prototype.restore = function () {
    if (this.hisstate.length > 0) {
        var state = this.hisstate.pop();
        this.state.push(state);
        // 画出栈顶的图
        this.drawMap(this.state[this.state.length - 1]);
    } else {
        console.log("恢复到头了");
    }
    console.log(this.state, this.hisstate)
}
// 根据map画图
MapEditor.prototype.drawMap = function (map) {
    // 最小单元格
    var width = 16;
    var height = 16;

    for (var j = 0; j < map.length; j++) {
        for (var i = 0; i < map[j].length; i++) {
            this.ctx.clearRect(i * width, j * height, width, height);
            switch (map[j][i]) {
                case "0":
                    break;
                case "1":
                    this.changeArray("1");
                    this.ctx.drawImage(this.image, 64, 0, width, height, i * width, j * height, width, height);
                    break;
                case "2":
                    this.changeArray("2");
                    this.ctx.drawImage(this.image, 96, 0, width, height, i * width, j * height, width, height);
                    break;
                case "3sm":
                    this.changeArray("3");
                    this.ctx.drawImage(this.image, 0, 0, width, height, i * width, j * height, width, height);

                    break;
                case "3":
                    this.changeArray("3");
                    this.ctx.drawImage(this.image, 0, 0, width, height, i * width, j * height, width, height);

                    break;
                case "4sm":
                    this.changeArray("4");
                    this.ctx.drawImage(this.image, 32, 0, width, height, i * width, j * height, width, height);

                    break;
                case "4":
                    this.changeArray("4");
                    this.ctx.drawImage(this.image, 32, 0, width, height, i * width, j * height, width, height);

                    break;
            }
        }
    }
    // 总部单独画
    this.ctx.drawImage(this.image, 160, 0, 32, 32, 6 * 32, 12 * 32, 32, 32);
}


var mapEditor = new MapEditor();