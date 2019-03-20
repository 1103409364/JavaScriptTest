(function () {
    // 轮播图构造函数
    var Carousel = window.Carousel = function (argsJSON) {
        //参数检验
        if (!argsJSON.ID) {
            throw new Error("没有传入ID");
            return;
        }
        // 轮播图容器
        this.carousel = document.getElementById(argsJSON.ID);
        //初始化创建DOM
        this.init();
        //获得DOM 按钮，图片列表等
        this.leftBtn = this._findMyElemsByClassName("leftBtn").length ? this._findMyElemsByClassName("leftBtn")[0] : null;
        this.rightBtn = this._findMyElemsByClassName("rightBtn").length ? this._findMyElemsByClassName("rightBtn")[0] : null;

        this.imageList = this._findMyElemsByClassName("imageList")[0];
        this.imageLis = this.imageList.getElementsByTagName("li");
        this.circles = this._findMyElemsByClassName("circles")[0];
        this.imageLength = this.imageLis.length;
        this.circleLis = this.circles.getElementsByTagName("li");

        //_animate里的定时器的间隔时间
        this.interval = argsJSON.interval || 20;
        //图片运动到目标位置的总时间
        this.animateTime = argsJSON.animateTime || 500;
        //自动轮播的事件
        this.autoplayinterval = argsJSON.autoplayinterval || 2000;

        //缓冲公式，可以传进来，也可以不传进来用默认的：
        this.tween = argsJSON.tween || function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }

        //信号量
        this.idx = 0;

        //绑定监听
        this._bindEvent();

        // //自动运行
        this._autoplay();
    }

    Carousel.prototype.init = function(){
        this.carousel.innerHTML = [
            "<div class='imageList'>",
            "   <ul>",
            "       <li class='first'><a href='#'><img src='img/0.jpg' alt='' /></a></li>",
            "       <li><a href='#'><img src='img/1.jpg' alt='' /></a></li>",
            "       <li><a href='#'><img src='img/2.jpg' alt='' /></a></li>",
            "       <li><a href='#'><img src='img/3.jpg' alt='' /></a></li>",
            "       <li><a href='#'><img src='img/4.jpg' alt='' /></a></li>",
            "   </ul>",
            "</div>",
            "<div class='btns'>",
            "   <a href='javascript:;' class='leftBtn'>L</a>",
            "   <a href='javascript:;' class='rightBtn'>R</a>",
            "</div>",
            "<div class='circles'>",
            "   <ol>",
            "       <li class='cur'></li>",
            "       <li></li>",
            "       <li></li>",
            "       <li></li>",
            "       <li></li>",
            "   </ol>",
            "</div>"
        ].join("");
    }
    
    //切换为下一张图片
    Carousel.prototype._next = function () {
        //函数截流，第三种函数截流的方式。定时器是对象自己的属性，如果这个属性已经有值了，比如1、2、3、4……那么就return
        if (this.animateTimer) {
            return;
        }
        //信号量的改变
        var oldidx = this.idx;
        this.idx++;
        if (this.idx > this.imageLength - 1) {
            this.idx = 0;
        }
        //这里不需要瞬移“就位”，缓冲公式计算的是下一帧的位置，设置好运动开始位置结束位置就行了。
        this._animate([
            {
                "obj": this.imageLis[oldidx],
                "start": 0,
                "target": -560
            },
            {
                "obj": this.imageLis[this.idx],
                "start": 560,
                "target": 0
            }
        ], this.animateTime);

        this._changeCircle();
    }
    //上一张
    Carousel.prototype._prev = function () {
        if (this.animateTimer) {
            return;
        }
        //信号量的改变
        var oldidx = this.idx;
        this.idx--;
        if (this.idx < 0) {
            this.idx = this.imageLength - 1;
        }
        //这里神奇的是，不需要瞬移“就位”，因为我们的内部_animate函数会在第0帧的时候，将元素瞬移就位。缓冲公式给出每一帧的具体位置
        this._animate([
            {
                "obj": this.imageLis[oldidx],
                "start": 0,
                "target": 560
            },
            {
                "obj": this.imageLis[this.idx],
                "start": -560,
                "target": 0
            }
        ], 1000);

        this._changeCircle();
    }
    //跳转到某个图片去
    Carousel.prototype._goto = function (num) {
        //信号量的改变
        var oldidx = this.idx;
        this.idx = num;

        if (this.idx > oldidx) {
            this._animate([
                {
                    "obj": this.imageLis[oldidx],
                    "start": 0,
                    "target": -560
                },
                {
                    "obj": this.imageLis[this.idx],
                    "start": 560,
                    "target": 0
                }
            ], 1000);
        } else if (this.idx < oldidx) {
            this._animate([
                {
                    "obj": this.imageLis[oldidx],
                    "start": 0,
                    "target": 560
                },
                {
                    "obj": this.imageLis[this.idx],
                    "start": -560,
                    "target": 0
                }
            ], 1000);
        }

        this._changeCircle();
    }
    //用缓冲公式封装一个专用运动框架
    Carousel.prototype._animate = function (arr, animateTime) {
        //备份一下this
        var self = this;
        //当前帧编号
        var currentFrame = 0;
        //总帧数,运动总时间/定时器间隔时间
        var maxFrame = parseInt(animateTime / this.interval);

        //设表先关
        clearInterval(this.animateTimer);
        //运动框架的定时器animateTimer
        this.animateTimer = setInterval(function () {
            //帧数加1
            currentFrame++;
            if (currentFrame >= maxFrame) {
                clearInterval(self.animateTimer);
                self.animateTimer = null;
            }
            //改变数组中的每个元素的位置
            for (var i = 0; i < arr.length; i++) {
                arr[i].obj.style.left = self.tween(currentFrame, arr[i].start, arr[i].target - arr[i].start, maxFrame) + "px";
            }
        }, this.interval);
    }
    //改变小圆点，让信号量那个小圆点有cur
    Carousel.prototype._changeCircle = function () {
        for (var i = 0; i < this.circleLis.length; i++) {
            this.circleLis[i].className = "";
        }

        this.circleLis[this.idx].className = "current";
    }

    Carousel.prototype._bindEvent = function () {
        //备份this
        var self = this;
        //按钮
        if(this.rightBtn != null){
            this.rightBtn.onclick = function () {
                self._next();
            }
        }

        if(this.leftBtn != null){
            this.leftBtn.onclick = function () {
                self._prev();
            }
        }
        //循环添加监听，小圆点的点击
        for (var i = 0; i < this.circleLis.length; i++) {
            this.circleLis[i].index = i;
            //点击事件
            this.circleLis[i].onclick = function () {
                self._goto(this.index);
            }
        }

        //鼠标进入的时候autoplayTimer应该清除，
        this.carousel.onmouseover = function () {
            clearInterval(self.autoplayTimer);
        }
        //鼠标离开的时候重新设置
        this.carousel.onmouseout = function () {
            self._autoplay();
        }
    }

    Carousel.prototype._autoplay = function () {
        var self = this;
        // 自动轮播的定时器autoplayTimer
        // 设表先关
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = setInterval(function () {
            self._next();
        }, this.autoplayinterval);
    }

    // 数私有方法。通过类名查找元素
    Carousel.prototype._findMyElemsByClassName = function (className) {
        var arr = [];
        //先得到这个元素的所有后代，然后筛选谁身上有className属性
        var elems = this.carousel.getElementsByTagName("*");
        //正则，百度来的，看看元素的类名是不是有这个className独立部分
        var reg = new RegExp("(^" + className + " | " + className + " | " + className + "$|^" + className + "$)", "g");

        //遍历所有的后代，看看谁有这个类名
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].nodeType == 1 && reg.test(elems[i].className) == true) {
                arr.push(elems[i]);
            }
        }
        //返回的数组。即使只有一个结果，也返回的是数组
        return arr;
    }
})()