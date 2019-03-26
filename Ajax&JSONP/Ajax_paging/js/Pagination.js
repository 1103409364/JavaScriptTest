(function () {
    /*需要参数
    @param1 回调函数
    @param2 容器id
    @param3 总页数
    */
    var Pagination = window.Pagination = function (json) {
        this.getDataAndRender = json.callback;
        this.$container = $("#" + json.containerId);
        this.count = json.countPages;
        // 从hash中读取状态,默认从第一页开始
        this.nowIdx = parseInt(location.hash.substring(1)) || 1;
        this.getDataAndRender(this.nowIdx);

        this.init();
        this.render();
        this.addEvent();
    }

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
        this.$container.append(this.pStr);
        // 保存当前所有页码对象
        this.$p = this.$container.find(".p");
        this.$p.eq(this.nowIdx - 1).addClass("current");
        // console.log(this.nowIdx)
        this.$ellipsis = $(".ellipsis");
        this.$prev = this.$container.find(".prev");
        this.$next = this.$container.find(".next");
    }
    // 渲染页码的逻辑，前中后分类讨论，隐藏不需要的格子
    Pagination.prototype.render = function () {
        location.hash = this.nowIdx;
        var _this = this;
        var $nowIdx = this.$p.eq(this.nowIdx - 1);
        // 当前页码加上class，改变样式
        $nowIdx.addClass("current");
        // 去掉兄弟节点的class
        $nowIdx.siblings().removeClass("current");

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

    Pagination.prototype.addEvent = function () {
        var _this = this;
        this.$p.click(function () {
            var $a = $(this).children("a")

            _this.nowIdx = $a.html();
            // 渲染页面列表
            _this.getDataAndRender(_this.nowIdx);
            // 渲染页码组件
            _this.render();
        });
        // this.$contaioner.(".p");

        this.$prev.click(function () {
            var oldIdx = _this.nowIdx;
            _this.nowIdx--;
            if (_this.nowIdx < 1) {
                _this.nowIdx = 1;
            }

            if (_this.nowIdx != oldIdx) {
                _this.getDataAndRender(_this.nowIdx);
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
                _this.getDataAndRender(_this.nowIdx);
                _this.render();
            }
        });
    }
})()