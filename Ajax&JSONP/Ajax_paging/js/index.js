
// 列表行的构造函数-------------------------
function PostRow(dictionary, container) {
    this.$container = container;
    this.$DOM = $(this.compile(dictionary));
    
    this.$showDetailBtn = this.$DOM.find(".toogle");
    this.$detail = this.$DOM.find(".job_detail");

    this.render();
    this.addEvent();
}
// 拿到模板，返回数据绑定函数
PostRow.prototype.compile = _.template($("#template").html());
// 把自己渲染到页面上
PostRow.prototype.render = function () {
    this.$container.append(this.$DOM);
}

PostRow.prototype.addEvent = function () {
    // 备份this
    var _this = this;
    this.$showDetailBtn.click(function() {
            $(this).toggleClass("active");
            _this.$detail.slideToggle();
    })
}

PostRow.prototype.deleteSelf = function () {
    this.$DOM.remove();
}

// 分页导航---------------------------------
function Pagination(container, totalPage, admin) {
    this.admin = admin;
    // 容器
    this.$container = container;
    // 总页数
    this.count = totalPage;
    // 从hash中读取状态,默认从第一页开始
    this.nowIdx = parseInt(location.hash.substring(1)) || 1;
    // this.getDataAndRender(this.nowIdx);
    this.init();
    // this.render();
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
    $current.addClass("current");
    // 去掉兄弟节点的class
    $current.siblings().removeClass("current");

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
        _this.admin.toPage(_this.nowIdx);
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
            _this.admin.toPage(_this.nowIdx);
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
            _this.admin.toPage(_this.nowIdx);
            _this.render();
        }
    });
}

// 管理员-------------------------------------
function Administrator() {
    this.$DOM = $("#job_container");
    this.$rowContainer =this.$DOM.find("#job_ulli");
    this.$paginationContainer = this.$DOM.find("#pagination");
    this.$totalPost = this.$DOM.find(".row_count");
    this.postRowArr = [];
    // 总页数默认是0，当调用toPage时，totalPage立即更新
    this.totalPage = 0;
    // 默认在第一页
    this.toPage(1);
    // 创建分页导航条,第一个参数导航条容器，第二个参数总页数，第三个参数告诉导航条管理员是谁
    this.pagination = new Pagination(this.$paginationContainer, this.totalPage, this);

}
// 显示职位总数
Administrator.prototype.showTotalPost = function (totalPost) {
    this.$totalPost.html(totalPost);
}
// 添加列表的行
Administrator.prototype.addPostRow = function ($rowDOM) {
    this.postRowArr.push($rowDOM);
    // this.$rowContainer.append($rowDOM);
}

// 字典修正
Administrator.prototype.dictionaryFix = function (dictionary) {
    // postType岗位类别需要字典修正
    if (dictionary.postType.split("-")[1]) {
        dictionary.postType = dictionary.postType.split("-")[1];
    }
    dictionary.postType = dictionary.postType.replace(/^\w*/, "");

    dictionary.link = "http://talent.baidu.com/external/baidu/index.html#/jobDetail/2/" + dictionary.postId;
    this.dictionary = dictionary;
}
// 去某页
Administrator.prototype.toPage = function (pageNum) {
    var _this = this;
    $.get("JSON/getPostList" + pageNum, function (data) {
        // 得到数据转为JSON
        _this.postData = JSON.parse(data);
        // 职位总数
        _this.totalPost = _this.postData.rowCount;
        // 总页数发生变化的时候，更新分页导航条
        if(_this.totalPage != _this.postData.totalPage) {
            _this.totalPage = _this.postData.totalPage;
            _this.pagination.update(_this.totalPage);
        }
        // 显示总在招职位数
        _this.showTotalPost(_this.totalPost);
         // 清空旧的页
         _.each(_this.postRowArr, function(row) {
            row.deleteSelf();
        })
        // 清空数组，取消对象引用
        _this.postRowArr  = [];

        _.each(_this.postData.postList, function (dictionary) {
            _this.dictionaryFix(dictionary);
            // domStr += compile(dictionary);
            _this.addPostRow(new PostRow(_this.dictionary, _this.$rowContainer));
        });
    })
}

var admin = new Administrator();