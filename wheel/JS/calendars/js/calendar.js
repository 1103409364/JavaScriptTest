(function () {
    var Calendar = window.Calendar = function Calendar(containerId) {
        this.container = document.getElementById(containerId);
        this.domStr =
            '<p>' +
            '请选择日期' +
            '<input type="text" name="" class="ipt">' +
            '</p>' +
            '<div class="calender" id="calender">' +
            '<div id="main" class="main">' +
            '<div class="calender_header">' +
            '<a href="javascript:;" class="prevYear">&lt;&lt;</a>' +
            '<a href="javascript:;" class="prevMonth">&lt;</a>' +
            '<span class="year"></span>年<span class="month"></span>月<span class="date"></span>日' +
            '<a href="javascript:;" class="nextMonth">&gt;</a>' +
            '<a href="javascript:;" class="nextYear">&gt;&gt;</a>' +
            '</div>' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>日</th>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th>六</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '</tr>' +
            '<tr>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '</tr>' +
            '<tr>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '</tr>' +
            '<tr>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '</tr>' +
            '<tr>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '</tr>' +
            '<tr>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>' +
            '<div class="calender_footer">' +
            '<a href="javascript:;" class="today">今天</a>' +
            '<a href="javascript:;" class="close">关闭</a>' +
            '</div>' +
            '</div>' +
            '</div>'

        this.container.innerHTML += this.domStr;
        this.dom = this.container.getElementsByClassName("calender")[0];
        this.prevMonthBtn = this.container.getElementsByClassName("prevMonth")[0];
        this.nextMonthBtn = this.container.getElementsByClassName("nextMonth")[0];
        this.prevYearBtn = this.container.getElementsByClassName("prevYear")[0];
        this.nextYearBtn = this.container.getElementsByClassName("nextYear")[0];
        this.todayBtn = this.container.getElementsByClassName("today")[0];
        this.closeBtn = this.container.getElementsByClassName("close")[0];
        // 所有单元格
        this.allTd = this.container.getElementsByTagName("td");
        this.yearDom = this.container.getElementsByClassName("year")[0];
        this.monthDom = this.container.getElementsByClassName("month")[0];
        this.dateDom = this.container.getElementsByClassName("date")[0];
        // 输入框
        this.ipt = this.container.getElementsByClassName("ipt")[0];
        // 今天的date对象
        this.date = new Date();
        // 今天的年月日
        this.todayYear = this.date.getFullYear();
        this.todayMonth = this.date.getMonth() + 1;
        this.todayDate = this.date.getDate();

        // 初始化日历
        this.init();
        // 给日历相关按钮元素绑定事件
        this.bindEvent();
    }
    // 初始化日历
    Calendar.prototype.init = function () {
        // 当前选中的日期
        this.yearNow = this.todayYear;
        this.monthNow = this.todayMonth;
        this.dateNow = this.todayDate;

        this.renderHeader();
        this.renderBody(this.todayYear, this.todayMonth);
        this.renderIpt();
    }

    Calendar.prototype.renderHeader = function () {
        this.yearDom.innerHTML = this.numberFix(this.yearNow);
        this.monthDom.innerHTML = this.numberFix(this.monthNow);
        this.dateDom.innerHTML = this.numberFix(this.dateNow);
    }

    // 根据年和月渲染日历
    Calendar.prototype.renderBody = function (year, month) {
        this.clearClass();
        // 获得1号是周几
        var day = this.getDay(year, month, 1);
        // 获得当月天数
        var m = this.getNumOfMonth(year, month);
        // 根据1号是周几来填充日历
        for (var i = day; i < m + day; i++) {
            this.allTd[i].innerHTML = i - day + 1;
            // 当月的格子加上curM类
            this.allTd[i].className += " curMd";
            if (this.allTd[i].innerHTML == this.todayDate) {
                // 当天加上类current标记
                this.allTd[i].className += " current";
            }
        }

        // 根据当月填充头部剩下的格子
        var prvemonth = month - 1;
        var pyear = year;
        if (month == 1) {
            prvemonth = 12;
            pyear = year - 1;
        }
        // 上月天数
        var prevm = this.getNumOfMonth(pyear, prvemonth);
        for (var j = 0; j < day; j++) {
            this.allTd[j].innerHTML = prevm - day + j + 1;
            this.allTd[j].className += " prevMd";
        }

        if (month == 12) {
            nextmonth = 1;
            nyear = year + 1;
        }

        // 剩余格子数
        var empty = this.allTd.length - (day + m + 1);
        // var nextm = this.getNumOfMonth(nyear, nextmonth);
        for (var k = day + m; k < this.allTd.length; k++) {
            this.allTd[k].innerHTML = empty - (this.allTd.length - k) + 2;
            this.allTd[k].className += " nextMd";
        }
    }

    // 清空class
    Calendar.prototype.clearClass = function () {
        for (var i = 0; i < this.allTd.length; i++) {
            this.allTd[i].className = "";
        }
    }
    // 获取某个日期是周几
    Calendar.prototype.getDay = function (y, m, d) {
        var d = new Date(y, m - 1, d);
        return d.getDay();
    }
    // 获得某个月的天数,根据年和月可以确定一个月的天数
    Calendar.prototype.getNumOfMonth = function (year, month) {
        if (month > 12 || month < 1) {
            throw "month range error";
        }
        switch (parseInt(month)) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 2:
                if (this.isLeapYear(parseInt(year))) {
                    return 29;
                } else {
                    return 28;
                }
            default:
                return 30;
        }
    }
    // 判断闰年
    Calendar.prototype.isLeapYear = function (year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }

    Calendar.prototype.bindEvent = function () {
        var _this = this;
        // 日历头部按钮
        // 下个月
        this.nextMonthBtn.onclick = function () {
            _this.toNextMonth();
            _this.renderBody(_this.yearNow, _this.monthNow);
            _this.renderHeader();
        }
        // 上个月
        this.prevMonthBtn.onclick = function () {
            _this.toPrevMonth();
            _this.renderBody(_this.yearNow, _this.monthNow);
            _this.renderHeader();
        }
        // 下一年
        this.nextYearBtn.onclick = function () {
            _this.yearNow++;
            _this.renderBody(_this.yearNow, _this.monthNow);
            _this.renderHeader();
        }
        // 上一年
        this.prevYearBtn.onclick = function () {
            _this.yearNow--;
            _this.renderBody(_this.yearNow, _this.monthNow);
            _this.renderHeader();
        }
        // 日历格子点击事件
        this.dom.onclick = function (event) {
            var target = event.target;
            if (target.className.indexOf("curMd") != -1) {
                _this.dateNow = target.innerHTML;
                _this.renderHeader();
                _this.renderIpt();
                _this.hide();
            }
            // 点中的日期属于上个月
            if (target.className.indexOf("prevMd") != -1) {
                _this.toPrevMonth();
                _this.dateNow = target.innerHTML;
                _this.renderBody(_this.yearNow, _this.monthNow);
                _this.renderHeader();
                _this.renderIpt();
                _this.hide();
            }
            // 点中的日期属于下个月
            if (target.className.indexOf("nextMd") != -1) {
                _this.toNextMonth();
                _this.dateNow = target.innerHTML;
                _this.renderBody(_this.yearNow, _this.monthNow);
                _this.renderHeader();
                _this.renderIpt();
                _this.hide();
            }
        }
        // 日历footer
        // 今天按钮
        this.todayBtn.onclick = function () {
            _this.yearNow = _this.todayYear;
            _this.monthNow = _this.todayMonth;
            _this.dateNow = _this.todayDate;
            _this.renderBody(_this.yearNow, _this.monthNow);
            _this.renderHeader();
            _this.renderIpt();
            _this.hide();
        }

        this.closeBtn.onclick = function () {
            _this.hide();
        }

        this.ipt.onfocus = function () {
            _this.show();
        }
    }
    //  切换到下个月
    Calendar.prototype.toNextMonth = function () {
        this.monthNow++;
        if (this.monthNow > 12) {
            this.monthNow = 1;
            this.yearNow++;
        }
    }

    // 上个月
    Calendar.prototype.toPrevMonth = function () {
        this.monthNow--;
        if (this.monthNow < 1) {
            this.monthNow = 12;
            this.yearNow--;
        }
    }
    // 小于10的数字前面补0
    Calendar.prototype.numberFix = function (n) {
        if (n < 10) {
            return "0" + n;
        } else {
            return n;
        }
    }
    // 隐藏日历
    Calendar.prototype.hide = function () {
        this.dom.style.display = "none";
    }
    // 显示日历
    Calendar.prototype.show = function () {
        this.dom.style.display = "block";
    }

    Calendar.prototype.renderIpt = function () {
        this.ipt.value = this.yearNow + "-" + this.monthNow + "-" + this.dateNow;
    }
})()
