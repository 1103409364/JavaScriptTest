(function () {
    window.Waterfall = function (json) {
        this.heightArr = json.heightArr;
        this.wrap = json.wrap;

        this.renderimg(json.data);
        this.imgWeight = json.width;
    }

    Waterfall.prototype.renderimg = function (data) {
        var _this = this;
        var count = 0;
        for(i = 0; i < data.length; i++) {
            var img = new Image();
            img.index = i;
            img.src = data[i];
            // 竞速规则，先加载的先先显示
            img.onload = function() {
                count++;
                var a = document.createElement("a");
                a.href = this.src;
                a.target = "_blank";
                _this.wrap.appendChild(a);
                var minHeight = Math.min.apply(null, _this.heightArr);
                var index = _this.heightArr.indexOf(minHeight);
                // var height =a.clientHeight;
                a.style.left = (_this.imgWeight + 20) * index + "px";
                a.style.top = minHeight + "px";
                a.appendChild(this);
                // console.log(_this.imgWeight,this.clientHeight, index);
                // 图片加载之后才有高
                _this.heightArr[index] += this.clientHeight + 20;
                _this.wrap.style.height =  Math.max.apply(null,_this.heightArr) + "px";
                if(count == data.length) {
                    // 图片全部加载完了再开锁
                    lock = false;
                }
            }
        }
    }
})();
