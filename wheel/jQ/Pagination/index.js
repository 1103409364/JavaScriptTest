/*
* @param0 分页导航容器，是一个jQ对象
* @param1 分页导航总页数
* @param2 回调函数
*/
function Pagination(container, totalPage, callback) {
    this.callback = callback;
    // 容器
    this.$container = container;
    // 总页数
    this.count = totalPage;
    // 从hash中读取状态,默认从第一页开始
    this.nowIdx = parseInt(location.hash.substring(1)) || 1;
    // this.getDataAndRender(this.nowIdx);
    this.init();
    this.render();
    this.addEvent();
}

// 初始化导航条
Pagination.prototype.init = function () {
    this.pStr = "<ol>";
    // 生成所有的格子
    for (var i = 1; i <= this.count + 2; i++) {
        if (i == 2 || i == this.count) {
            this.pStr += "<li class='ellipsis'>...</li>"
        }
        if (i == this.count + 1) {
            this.pStr += "<li class='prev'><a href='javascript:;'>&lt;</a></li>"
        }
        if (i == this.count + 2) {
            this.pStr += "<li class='next'><a href='javascript:;'>&gt;</a></li></ol>"
        }
        if (i <= this.count) {
            this.pStr += "<li class='p'><a href='javascript:;'>" + i + "</a></li>";
        }
    }
    // 当前导航条的DOM
    this.$DOM = $(this.pStr)
    this.$container.append(this.$DOM);
    // 保存当前所有页码对象
    this.$p = this.$container.find(".p");
    this.$p.eq(this.nowIdx - 1).addClass("current");
    // console.log(this.nowIdx)
    this.$ellipsis = $(".ellipsis");
    this.$prev = this.$container.find(".prev");
    this.$next = this.$container.find(".next");
}

// 渲染导航条，前中后分类讨论，隐藏不需要的格子
Pagination.prototype.render = function () {
    // 设置hash值
    location.hash = this.nowIdx;
    var _this = this;
    // 当前页对应的导航节点
    var $current = this.$p.eq(this.nowIdx - 1);
    // 当前页码加上class，改变样式
    $current.addClass("current").siblings().removeClass("current");
    // 去掉兄弟节点的class
    console.log(this.nowIdx);

    // 前面几项
    if (this.nowIdx < 5) {

        this.$p.each(function (i) {

            $(this).show();
            if (i >= 5) {
                $(this).hide();
                
            }
        });
        this.$ellipsis.eq(0).hide();
        this.$ellipsis.eq(1).show();
    }
    // 中间几项
    // i从0开始，页码从1开始
    if (this.nowIdx >= 5 && this.nowIdx <= this.count - 4) {
        this.$p.each(function (i) {
            if (i != 0) {
                $(this).hide();
            }
            if (i >= (_this.nowIdx - 3) && i <= (parseInt(_this.nowIdx) + 1)) {
                // console.log(_this.nowIdx + 2);
                $(this).show();
            }
            // 显示最后一页
            if (i == _this.count - 1) {
                $(this).show();
            }
        })
        this.$ellipsis.show();
    }
    // 尾巴几项
    if (this.nowIdx > this.count - 4) {
        this.$p.each(function (i) {

            $(this).show();
            if (i < _this.count - 5) {
                $(this).hide();
            }
            // 显示第一页
            if (i == 0) {
                $(this).show();
            }
        })
        this.$ellipsis.eq(1).hide();
    }
}

// 删掉自己
Pagination.prototype.deleteSelf = function () {
    this.$DOM.remove();
}
// 更新导航条
Pagination.prototype.update = function (totalPage) {
    this.deleteSelf();
    // 更新总的页数
    this.count = totalPage;
    // 重新渲染
    this.init();
    this.render();
    // 重新绑定事件
    this.addEvent();
}

Pagination.prototype.addEvent = function () {
    var _this = this;
    this.$p.click(function () {
        var $a = $(this).children("a")

        _this.nowIdx = $a.html();
        // 通知管理员渲染页面
        _this.callback(_this.nowIdx);
        // 渲染页码组件
        _this.render();
    });

    this.$prev.click(function () {
        var oldIdx = _this.nowIdx;
        _this.nowIdx--;
        if (_this.nowIdx < 1) {
            _this.nowIdx = 1;
        }

        if (_this.nowIdx != oldIdx) {
            _this.callback(_this.nowIdx);
            _this.render();
        }
    });

    this.$next.click(function () {
        var oldIdx = this.nowIdx;
        _this.nowIdx++;
        if (_this.nowIdx > _this.count) {
            _this.nowIdx = _this.count;
        }
        if (_this.nowIdx != oldIdx) {
            _this.callback(_this.nowIdx);
            _this.render();
        }
    });
}